import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import UserPermissions from "../utilities/UserPermissions";
import * as ImagePicker from "expo-image-picker";
import Fire from "../Fire";

import { TouchableOpacity } from "react-native-gesture-handler";

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    user: {},
    errorMessage: null,
  };

  unsubscribe = null;

  componentDidMount() {
    this._isMounted = true;
    UserPermissions.getCameraPermission;
    const user = this.props.uid || Fire.shared.uid;

    this.unsubscribe = Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot((doc) => {
        this.setState({ user: doc.data() });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handlePickAvatar = async () => {
    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ user: { ...this.state.user, avatar: result.uri } });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 64, alignItems: "center" }}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                this.state.user.avatar
                  ? { uri: this.state.user.avatar }
                  : require("../assets/tempAvatar.jpg")
              }
              style={styles.avatar}
            />
            <View style={styles.add}>
              <TouchableOpacity onPress={this.handlePickAvatar}>
                <Ionicons
                  name="ios-add"
                  size={48}
                  color="#01040a"
                  style={{ marginTop: 6, marginLeft: 2 }}
                ></Ionicons>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.name}>{this.state.user.name}</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>21</Text>
            <Text style={styles.statTitle}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>981</Text>
            <Text style={styles.statTitle}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>63</Text>
            <Text style={styles.statTitle}>Following</Text>
          </View>
        </View>
        <View style={{ marginTop: 32 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require("../assets/media1.jpg")}
                style={styles.image}
                resizeMode="cover"
              ></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require("../assets/media2.jpg")}
                style={styles.image}
                resizeMode="cover"
              ></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require("../assets/media3.jpg")}
                style={styles.image}
                resizeMode="cover"
              ></Image>
            </View>
          </ScrollView>
          <View style={styles.mediaCount}>
            <Text
              style={[
                styles.text,
                { fontSize: 24, color: "#DFD8C8", fontWeight: "300" },
              ]}
            >
              70
            </Text>
            <Text
              style={[
                styles.text,
                { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" },
              ]}
            >
              Media
            </Text>
          </View>
        </View>

        <Button
          onPress={() => {
            Fire.shared.signOut();
          }}
          title="Log out"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    marginTop: 64,
    alignItems: "center",
  },
  add: {
    // backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: "0.1%",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    shadowColor: "#151734",
    shadowRadius: 30,
    shadowOpacity: 0.4,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "600",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 32,
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statAmount: {
    color: "#4F566D",
    fontSize: 18,
    fontWeight: "300",
  },
  statTitle: {
    color: "#C3C5CD",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
});
