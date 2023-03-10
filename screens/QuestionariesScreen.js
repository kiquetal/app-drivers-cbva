import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Dimensions, View, StyleSheet} from "react-native";
import { Text} from "@rneui/themed";

const { width } = Dimensions.get("window");
export default function QuestionariesScreen(props) {

    const { navigation } = props;




   return (
       <View >
           <Text style={{color:'black'}}>History of Questionaries</Text>
       </View>
    );
}
const styles = StyleSheet.create({
    subHeader: {
        backgroundColor : "#2089dc",
        color : "white",
        textAlign : "center",
        paddingVertical : 7,
        marginBottom : 10
    },
    horizontal: {
        marginBottom: 6,
    },
    horizontalText: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 10,
    },
    vertical: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
            { translateY: -90 }],
        height: 180,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    textInput: {
        width: "80%",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
    },
});
