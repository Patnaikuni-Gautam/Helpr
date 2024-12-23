import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setUserToken } from './Backend/authSlice';
import { auth } from './Backend/FirebaseInitialization';
import { store } from './Backend/store';

import SplashScreen from './components/SplashScreenView';
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';
import LoginScreen from './components/LoginScreen';
import NewUserScreen from './components/NewUserScreen';
import PersonalDetails from './components/PersonalDetails';
import PrivacyAndPolicy from './components/PrivacyAndPolicy';
import ParentalControls from './components/ParentalControls';
import PaymentsAndSubscription from './components/PaymentsAndSubscription';
import EmergencyContactDetails from './components/EmergencyContactDetails';
import VolunteerDetails from './components/VolunteerDetails';
import ExistingUser from './components/ExistingUser';
import VolunteerConsent from './components/VolunteerConsent';
import suppressWarnings from './WarningConfig'; // Import the config
import PhoneVerificationScreen from './components/PhoneVerificationScreen';

// Initialize warning suppression
suppressWarnings();
import ReportZone from './components/ReportZone';
import SelectZone from './components/SelectZone';


function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [loading, setLoading] = useState(true);
  const userToken = useSelector((state) => state.auth.userToken); // Redux state
  const dispatch = useDispatch();

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const initializeAuth = async () => {
      // Check for a stored token
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        dispatch(setUserToken(storedToken));
      }
      setLoading(false);

      // Set up Firebase auth listener
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setUserToken(user.uid));
        } else {
          dispatch(setUserToken(null));
        }
      });

      return () => unsubscribe();
    };

    const hideSplashScreen = setTimeout(() => setShowSplash(false), 250);

    initializeAuth();

    return () => clearTimeout(hideSplashScreen);
  }, [dispatch]);

  if (loading) return null; // Render nothing while determining auth state

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken ? (
          // Authenticated stack
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          // Unauthenticated stack
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ExistingUser" component={ExistingUser} />
            <Stack.Screen name="NewUser" component={NewUserScreen} />
            <Stack.Screen name="PhoneVerification" component={PhoneVerificationScreen} />
          </>
        )}
        {/* Shared screens */}
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
        <Stack.Screen name="VolunteerDetails" component={VolunteerDetails} />
        <Stack.Screen name="EmergencyContactDetails" component={EmergencyContactDetails} />
        <Stack.Screen name="PaymentsAndSubscription" component={PaymentsAndSubscription} />
        <Stack.Screen name="ParentalControls" component={ParentalControls} />
        <Stack.Screen name="PrivacyAndPolicy" component={PrivacyAndPolicy} />
        <Stack.Screen name="VolunteerConsent" component={VolunteerConsent} />
        <Stack.Screen name="ReportZone" component={ReportZone} />
        <Stack.Screen name="SelectZone" component={SelectZone} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
