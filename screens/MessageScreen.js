import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Fire from "../Fire";

export default class MessageScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Message Screen</Text>
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
        alignItems: "center",
        justifyContent: "center"
    }
});
