import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Contants from "expo-constants";
import * as Permissions from "expo-permissions";
import Fire from "../Fire";

export default class PostScreen extends React.Component {
  state = {
    text: ""
    Image: null
  }

  getPhotoPermission = async() => {
    if ('Contants.platform.android') { //.ios
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)

      if (status != "granted") {
        alert("we need permissinonn to access your camera roll")
      }

    }
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="md-arrow-back" size={24} color="#D8D9D8"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ fontWeight: "500" }}>Post</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/tempAvatar.jpg")}
            style={styles.avatar}
          ></Image>
          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={4}
            style={{ flex: 1 }}
            placeholder="Want to share Something"
          ></TextInput>
        </View>
        <TouchableOpacity style={styles.photo}>
          <Ionicons name="hd-camera" size={32} color="#D8D9DZB"></Ionicons>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32,
  },
});
