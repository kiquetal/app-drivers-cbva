import React from 'react';
import {View,Text} from "react-native";
import { useForm, Controller} from "react-hook-form";
import { Dropdown} from "react-native-element-dropdown";
import { Text as TextRNE } from "@rneui/themed";
export default FormMovimientoMovilScreen = (props) => {


    const { navigation } = props;
    const { control, handleSubmit, formState: { errors } } = useForm();

    const movil_data = [
        { label: "F1",
        value: "F1"},
        {label: "F2",
        value: "F2"},
    ]

    return (
        <View>
        <TextRNE style={{color:"black"}}  >Movil</TextRNE>
        <Dropdown data={movil_data}
                  placeholder={"Seleccione un movil"}
                  labelField="label" valueField="value" onChange={item => console.log(item)} />

        </View>
    )

}
