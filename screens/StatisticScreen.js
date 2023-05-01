import React, {useState} from 'react';
import { View, Text } from 'react-native';
import {Dropdown} from "react-native-element-dropdown";
export default StatisticsScreen = (props) => {

    const { navigation } = props;
    const [form_id, setFormId] = useState(1);
    const [year, setYear] = useState(2023);
    const [month, setMonth] = useState(1);
    const form_ids = [{
        label:"Movimiento de movil",
        value:3
    }]
    const years = [{
        label:"2023",
        value:2023
    }]
    const months = [{
        label:"Enero",
        value:1
    },
        {
            label:"Febrero",
            value:2
        },
        {
            label:"Marzo",
            value:3
        },
        {
            label:"Abril",
            value:4
        },
        {
            label:"Mayo",
            value: 5
        },
        {
            label: "Junio",
            value:6
        },
        {
            label: "Julio",
            value:7
        },
        {
            label: "Agosto",
            value:8
        },
        {
            label:"Septiembre",
            value:9
        },
        {
            label: "Octubre",
            value:10
        },
        {
            label: "Noviembre",
            value:11

        },
        {
            label: "Diciembre",
            value:12
        }]

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Dropdown data={form_ids} labelField="label" valueField="value"
                   onChange={item => {
                       console.log(item);
                      setFormId(item.value);
                      }} />

            <Dropdown data={years} labelField="label" valueField="value"
                      onChange={item => {
                          console.log(item);
                          setYear(item.value);
                      }} />

            <Dropdown data={months} labelField="label" valueField="value"
                        onChange={item => {
                            console.log(item);
                            setMonth(item.value);
                        }
                        } />


        </View>
    );
}
