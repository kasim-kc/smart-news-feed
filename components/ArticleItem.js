import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function ArticleItem({ item }) {
  return (
    <View style={styles.card}>
      {item.urlToImage && (
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
      )}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  image: { height: 150, borderRadius: 10 },
  title: { fontWeight: "bold", marginVertical: 5 },
  desc: { color: "#444" },
});
