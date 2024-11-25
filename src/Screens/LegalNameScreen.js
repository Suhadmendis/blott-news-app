import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Alert,
} from "react-native";

import { saveUserName, initializeDatabase } from "../dbOperation/dbUser";

import * as SQLite from "expo-sqlite";

const arrow_icon = require("../images/icons/arrow_icon.png");

const LegalNameScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");




  const saveData = async () => {
    try {
      await saveUserName(firstName, lastName);
      // Alert.alert("Success", "Your name has been saved.");
      setFirstName("");
      setLastName("");
      navigation.navigate("NotificationScreen", { firstName });
    } catch (error) {
      Alert.alert("Error", "Failed to save data.");
    }
  };

  const isValidInput = firstName.trim() != "" && lastName.trim() != "";

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <View style={styles.content}>
            <Text style={styles.title}>Your legal name</Text>
            <Text style={styles.subtitle}>
              We need to know a bit about you so that we can create your
              account.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="First name"
              placeholderTextColor="#A9A9A9"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last name"
              placeholderTextColor="#A9A9A9"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </ScrollView>
        <View style={styles.nextButtonArea}>
          <TouchableOpacity
            onPress={saveData}
            style={[
              styles.button,
              isValidInput ? styles.buttonActive : styles.buttonInactive,
            ]}
            activeOpacity={0.9}
            disabled={!isValidInput}
          >
            <Image
              source={arrow_icon}
              style={styles.arrowImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    color: "#737373",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 20,
    fontSize: 16,
    color: "#000",
  },
  nextButtonArea: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  button: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    backgroundColor: "#523Ae4",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  buttonActive: {
    opacity: 1,
  },
  buttonInactive: {
    opacity: 0.4,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
  },
  arrowImage: {
    width: 17,
    height: 17,
  },
});

export default LegalNameScreen;
