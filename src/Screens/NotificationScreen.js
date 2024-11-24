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
} from "react-native";
import * as Notifications from 'expo-notifications';


const notification_icon = require("../images/icons/notification_icon.png");

const NotificationScreen = ({ route, navigation }) => {

  const firstName = route.params.firstName;

  const handleContinue = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      navigation.navigate('DashboardScreen', { firstName } );
    } else {
      alert('Notifications permission denied!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageArea}>
          <Image
            source={notification_icon}
            style={styles.notificationImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.titleText}>Get the most out of Blott ✅</Text>
        <Text style={styles.desText}>
          Allow notifications to stay in the loop with your payments, requests
          and groups.
        </Text>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 29,
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
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
  buttonText: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
  },
  imageArea: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  notificationImage: {
    width: 100,
    height: 100,
  },
  titleText: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 8,
  },
  desText: {
    textAlign: "center",
    fontSize: 15,
    color: "#737373",
  },
  nextButton: {
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#523AE4',
    borderRadius: '100%',
    marginRight: 15,
    marginLeft: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotificationScreen;
