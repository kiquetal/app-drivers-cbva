import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View,Text} from "react-native";
import {Button, Card, CheckBox} from "@rneui/themed";
import {Dropdown} from "react-native-element-dropdown";

export default FormSelectionMobile = (props) => {
    const { navigation } = props;
    const Stack = createNativeStackNavigator();
    const [mobile, setMobile] = React.useState("F2");


    const  allMoviles = [{ label: "F1",
        value: "F1"},
        {label: "F2",
            value: "F2"},
        {
            label: "F3",
            value: "F3"
        },
        {
            label:"AT-F4",
            value: "AT-F4"
        },
        {
            label:"AR-F7",
            value: "AR-F7"
        },
        {
            label:"AR-F8",
            value: "AR-F8"
        },
        {
            label:"F9",
            value: "F9"
        },
        {
            label:"AT-F10",
            value: "AT-F10"
        }]

    return (
    <View>

        <Card containerStyle={{backgroundColor:"white"}}>
            <Card.Title style={{color:"black"}} >Moviles</Card.Title>
            <Card.Divider/>
            <Text style={{marginBottom: 10}}>
                Seleccione el movil
            </Text>
        <Dropdown data={allMoviles} labelField="label" valueField="value" onChange={
            (value) => {
                setMobile(value.value)
        }   }
        placeholder="Seleccione movil"
                  containerStyle={{backgroundColor: 'white', borderWidth: 0, height:250, marginTop:3}}
        value={mobile}
        />
        </Card>

<Button
    buttonStyle={{backgroundColor: '#3e81d7', borderWidth: 0, height:40, marginLeft: 50, marginTop:3, width:300}}
    title="Llenar formulario para moviles"
    onPress={() => { navigation.navigate("FormQuestionsOpeartors", {mobile: mobile});
    console.log("mobile", mobile)}}
/>
    </View>

    )
}
