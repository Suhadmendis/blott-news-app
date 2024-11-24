import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDate } from "../utils/dateUtils";
import useNews from "../hook/useNews";
import { COLORS } from '../styles/theme';

const Dashboard = ({ route, navigation }) => {
  const firstName = route.params.firstName;


  const { newsData, isLoading, idFailed, error } = useNews();


  const showNews = (item) => {
    navigation.navigate("NewsScreen", { item });
  };



  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.newsItem}
      activeOpacity={0.9}
      onPress={() => {
        console.log(item);

        showNews(item)
      }}
    >
      <View style={styles.newsImageArea}>
        <Image
          source={{ uri: item.image }}
          style={styles.newsImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.newsTextArea}>
        <View style={styles.newsInfoPallet}>
          <Text style={styles.newsDomain}>{item.source}</Text>
          <Text style={styles.newsDate}>{formatDate(item.datetime)}</Text>
        </View>
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.newsTitle}>
          {item.headline}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topPallet}>
        <Text style={styles.headerText}>Hey {firstName}</Text>
        {idFailed ? (
          <Text style={styles.errorText}>
            Something went wrong. Please try again later.
          </Text>
        ) : null}
      </View>

      <View style={styles.listPallet}>
        {isLoading ? (
          <ActivityIndicator></ActivityIndicator>
        ) : idFailed ? null : (
          <FlatList
            style={styles.listStyle}
            data={newsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
        )}
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
    paddingBottom: 35,
    zIndex: -1,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    margin: 20,
    marginTop: 30,
  },
  listContent: {
    zIndex: 1000,
    paddingHorizontal: 20,
  },
  newsItem: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  listPallet: {
    justifyContent: "center",
    width: "100%",
    height: "100%",
    marginTop: -35,
  },
  newsImageArea: {},
  newsImage: {
    width: 95,
    height: 95,
    marginRight: 10,
  },
  newsTextArea: {
    flex: 1,
    padding: 10,
  },
  newsDomain: {
    fontSize: 10,
    color: "#A0A0A0",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  newsTitle: {
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 4,
  },
  newsDate: {
    fontSize: 10,
    color: "#A0A0A0",
  },
  newsInfoPallet: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorText: {
    color: "white",
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
    fontWeight: "500",
  },
});

export default Dashboard;
