import React from "react";
import { StatusBar, ScrollView, StyleSheet, Text, View } from "react-native";

export default function PrivacyAndPolicy() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacy And Policy</Text>
      <ScrollView>
        <Text style={styles.sectionTitle}>Effective Date: 1 Jan, 2025</Text>
        <Text style={styles.paragraph}>
          Helpr (referred to as "we," "our," or "us") is dedicated to protecting your privacy. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our safety app ("App"). By using Helpr, you agree to the terms outlined in this Privacy Policy.
        </Text>

        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.subSection}>1.1 Personal Information</Text>
        <Text style={styles.bulletPoint}>• Your name, phone number, and email address (provided during registration).</Text>
        <Text style={styles.bulletPoint}>• Emergency contact details (optional).</Text>
        <Text style={styles.subSection}>1.2 Location Data</Text>
        <Text style={styles.bulletPoint}>• Real-time geographic location when the SOS feature is activated or when location-based services are used within the App.</Text>
        <Text style={styles.subSection}>1.3 Multimedia Data</Text>
        <Text style={styles.bulletPoint}>• Photos, videos, or audio recordings captured and shared via the App during emergencies.</Text>
        <Text style={styles.subSection}>1.4 Device Information</Text>
        <Text style={styles.bulletPoint}>• Information about your device, such as IP address, device type, operating system, and App usage patterns.</Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.bulletPoint}>• Provide and improve the App's features and services.</Text>
        <Text style={styles.bulletPoint}>• Notify local authorities (e.g., police) and nearby verified volunteers during emergencies.</Text>
        <Text style={styles.bulletPoint}>• Enhance user safety and ensure swift response times.</Text>
        <Text style={styles.bulletPoint}>• Communicate with you about updates, changes, or issues related to Helpr.</Text>
        <Text style={styles.bulletPoint}>• Analyze App performance to improve functionality.</Text>

        <Text style={styles.sectionTitle}>3. How We Share Your Information</Text>
        <Text style={styles.subSection}>3.1 During Emergencies</Text>
        <Text style={styles.bulletPoint}>• When the SOS feature is activated, your location, multimedia data, and relevant details are shared with law enforcement agencies and nearby verified volunteers (individuals or organizations) for a quick response.</Text>
        <Text style={styles.subSection}>3.2 Service Providers</Text>
        <Text style={styles.bulletPoint}>• We may share data with trusted third-party providers who assist us in operating the App, such as hosting services, database management, and technical support.</Text>
        <Text style={styles.subSection}>3.3 Legal Obligations</Text>
        <Text style={styles.bulletPoint}>• If required by law or to protect the rights, property, or safety of our users or others, we may share your data with law enforcement or other authorities.</Text>

        <Text style={styles.sectionTitle}>4. Data Security</Text>
        <Text style={styles.bulletPoint}>• We use industry-standard measures to secure your data. However, no method of electronic transmission or storage is entirely secure. While we work to protect your information, we cannot guarantee its absolute security.</Text>

        <Text style={styles.sectionTitle}>5. Your Rights and Choices</Text>
        <Text style={styles.subSection}>5.1 Access and Update</Text>
        <Text style={styles.bulletPoint}>• You can access and update your personal information through the App's settings.</Text>
        <Text style={styles.subSection}>5.2 Location Permissions</Text>
        <Text style={styles.bulletPoint}>• You can control location tracking through your device settings. Note that disabling location access may limit certain App features, such as the SOS function.</Text>
        <Text style={styles.subSection}>5.3 Data Retention</Text>
        <Text style={styles.bulletPoint}>• We retain your information only for as long as necessary to provide our services or as required by law.</Text>

        <Text style={styles.sectionTitle}>6. Children’s Privacy</Text>
        <Text style={styles.bulletPoint}>• Helpr is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13 without parental consent.</Text>

        <Text style={styles.sectionTitle}>7. Third-Party Links</Text>
        <Text style={styles.bulletPoint}>• The App may contain links to third-party websites or services. We are not responsible for their privacy practices. Please review their privacy policies before interacting with them.</Text>

        <Text style={styles.sectionTitle}>8. Changes to This Privacy Policy</Text>
        <Text style={styles.bulletPoint}>• We may update this Privacy Policy occasionally. Changes will be effective when posted within the App. Continued use of Helpr after changes are made signifies your acceptance of the revised policy.</Text>

        <Text style={styles.sectionTitle}>9. Contact Us</Text>
        <Text style={styles.bulletPoint}>• If you have questions or concerns about this Privacy Policy, please contact us:</Text>
        <Text style={styles.bulletPoint}>• Email: support@helpr.com</Text>
        <Text style={styles.bulletPoint}>• Address: Bangalore, India</Text>

        <Text style={styles.sectionTitle}>10. Consent</Text>
        <Text style={styles.bulletPoint}>• By using Helpr, you consent to the collection, use, and sharing of your information as described in this Privacy Policy.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 25,
    paddingTop: StatusBar.currentHeight || 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    marginTop: 20,
  },
  subSection: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 14,
    color: "#eee",
    lineHeight: 22,
    marginLeft: 10,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 14,
    color: "#eee",
    lineHeight: 22,
    marginBottom: 10,
  },
});
