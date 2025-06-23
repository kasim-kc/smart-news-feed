import { Image, StyleSheet, Text, View } from "react-native";

export default function ArticleItem({ item }) {
  return (
    <View style={styles.card}>
      {item.urlToImage && (
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1e1e1e",
    marginBottom: 6,
  },
  desc: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
});

