import React from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";

const { width } = Dimensions.get("window");

const SkeletonLoader = () => {
  const shimmerAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animate = () => {
      shimmerAnimation.setValue(0);
      Animated.timing(shimmerAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => animate());
    };
    animate();
  }, [shimmerAnimation]);

  const translateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.imagePlaceholder}>
          <Animated.View
            style={[
              styles.shimmer,
              {
                transform: [{ translateX }],
              },
            ]}
          />
        </View>

        <View style={styles.textContainer}>
          <View style={[styles.textPlaceholder, styles.titlePlaceholder]}>
            <Animated.View
              style={[
                styles.shimmer,
                {
                  transform: [{ translateX }],
                },
              ]}
            />
          </View>
          <View style={[styles.textPlaceholder, styles.descPlaceholder]}>
            <Animated.View
              style={[
                styles.shimmer,
                {
                  transform: [{ translateX }],
                },
              ]}
            />
          </View>
          <View style={[styles.textPlaceholder, styles.metadataPlaceholder]}>
            <Animated.View
              style={[
                styles.shimmer,
                {
                  transform: [{ translateX }],
                },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  textPlaceholder: {
    backgroundColor: "#e0e0e0",
    height: 16,
    marginBottom: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  titlePlaceholder: {
    width: "80%",
    height: 20,
  },
  descPlaceholder: {
    width: "90%",
  },
  metadataPlaceholder: {
    width: "60%",
  },
  shimmer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
});

export default SkeletonLoader;
