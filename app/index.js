import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  Text,
  TextInput,
  View,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";

import ArticleItem from "../components/ArticleItem";
import SkeletonLoader from "../components/SkeletonLoader";
import { fetchArticles } from "../utils/api";
import { saveArticles, loadArticles } from "../utils/storage";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [intialLoading, setInitialLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [search, setSearch] = useState("");

  const loadData = async (reset = false, searchQuery = "") => {
    try {
      const state = await NetInfo.fetch();
      if (!state.isConnected) throw new Error("Offline");

      const newArticles = await fetchArticles(reset ? 1 : page, searchQuery);
      const updated = reset ? newArticles : [...articles, ...newArticles];
      setArticles(updated);
      saveArticles(updated);
      setPage(reset ? 2 : page + 1);
      setIsOffline(false);
    } catch {
      setIsOffline(true);
      const cached = await loadArticles();
      setArticles(cached);
    }
  };

  useEffect(() => {
    loadData(true).finally(() => setInitialLoading(false));
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await loadData(true, search);
    setRefreshing(false);
  };

  const handleLoadMore = async () => {
    if (!loadingMore && !isOffline) {
      setLoadingMore(true);
      await loadData(false, search);
      setLoadingMore(false);
    }
  };

  const handleSearch = async (text) => {
    setSearch(text);
    setPage(1);
    await loadData(true, text);
  };

  const renderSkeleton = () => (
    <View>
      {Array(5)
        .fill()
        .map((_, index) => (
          <SkeletonLoader key={`skeleton-${index}`} />
        ))}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, marginTop: "25", marginBottom: "30" }}>
      <TextInput
        placeholder="Search articles..."
        value={search}
        onChangeText={handleSearch}
        style={{
          padding: 10,
          margin: 10,
          backgroundColor: "#eee",
          borderRadius: 8,
        }}
      />
      {intialLoading ? (
        renderSkeleton()
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => item.title + index}
          renderItem={({ item }) => <ArticleItem item={item} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
          ListEmptyComponent={
            <Text style={{ padding: 20, textAlign: "center" }}>
              No articles found.
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
