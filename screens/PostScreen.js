import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default class PostScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> post </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});
