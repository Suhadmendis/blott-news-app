import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDate } from "../utils/dateUtils";
import { COLORS } from '../styles/theme';

const NewsScreen = ({ route, navigation }) => {
  const news = route.params.item;


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.topPallet}>
          <Image source={{ uri: news.image }} style={styles.image} />
          <Text style={styles.headline}>{news.headline}</Text>
          <View style={styles.newInfoArea}>
            <Text style={styles.category}>{news.category}</Text>
            <Text style={styles.date}>{formatDate(news.datetime)}</Text>
          </View>
        </View>

        <Text style={styles.summary}>{news.summary}</Text>

      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(news.url)}
        >
          <Text style={styles.buttonText}>Read Full Article</Text>
        </TouchableOpacity>
        <Text style={styles.source}>Source: {news.source}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  topPallet: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingBottom: 15,
    zIndex: -1,
    paddingHorizontal: 10,
  },
  category: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
    color: "#666",

  },
  headline: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
  },
  newInfoArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
  },
  summary: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#cccccc20',
    padding: 16,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  source: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});

export default NewsScreen;
