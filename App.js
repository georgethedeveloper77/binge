import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";

import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyB5WCTAlZnM3ARrejR6v8MFJIyA5U1ajfo",
  authDomain: "binge-5fe63.firebaseapp.com",
  databaseURL: "https://binge-5fe63.firebaseio.com",
  projectId: "binge-5fe63",
  storageBucket: "binge-5fe63.appspot.com",
  messagingSenderId: "385686415497",
  appId: "1:385686415497:web:bc4d90b75fa88ed3437e58",
  measurementId: "G-EKX0HX4HFH",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home: HomeScreen,
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
