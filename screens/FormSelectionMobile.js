import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View,Text} from "react-native";
import {Button, CheckBox} from "@rneui/themed";

export default FormSelectionMobile = (props) => {
    const { navigation } = props;
    const Stack = createNativeStackNavigator();
    const [mobile, setMobile] = React.useState("");
    return (
    <View>
        <CheckBox
            containerStyle={{backgroundColor: '#3e81d7', borderWidth: 0}}
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checked={mobile === "F9"}
        title='Movil F9'
        onPress={() => setMobile("F9")}
            checkedColor='white'
            uncheckedColor='white'

            textStyle={{color: 'white'}}


        />
        <CheckBox
            containerStyle={{backgroundColor: '#3e81d7', borderWidth: 0}}
            checkedIcon='dot-circle-o'
            titleProps={{color: 'white'}}
             uncheckedIcon='circle-o'
            checkedColor='white'
            uncheckedColor='white'
            textStyle={{color: 'white'}}
        checked={mobile === "F10" || mobile === ""}
        title='Movil F10'
        onPress={() => setMobile("F10")}
        />
        <CheckBox
            containerStyle={{backgroundColor: '#3e81d7', borderWidth: 0}}
            checkedColor='white'
            textStyle={{color: 'white'}}
            uncheckedColor='white'

        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        title='Movil F3'
        checked={mobile === "F3"}
        onPress={() => setMobile("F3")}
        />
<Button
    buttonStyle={{backgroundColor: '#3e81d7', borderWidth: 0, height:40, marginLeft: 50, marginTop:3, width:300}}
    title="Llenar formulario para moviles"
    onPress={() => navigation.navigate("FormQuestionsOpeartors", {mobile: mobile})}
/>
    </View>

    )
}
