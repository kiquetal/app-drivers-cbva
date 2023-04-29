import React from 'react';
import {View, Text, ScrollView} from "react-native";
import { useForm, Controller} from "react-hook-form";
import { Dropdown} from "react-native-element-dropdown";
import {Card, Text as TextRNE, Input, Button} from "@rneui/themed";

export default FormMovimientoMovilScreen = (props) => {

    const [tipoDeServicio, setTipoDeServicio] = React.useState("");
    const [movil, setMovil] = React.useState("");
    const [conductor, setConductor] = React.useState("");
    const { navigation } = props;
    const { control, handleSubmit, formState: { errors } } = useForm();

    const movil_data = [
        { label: "F1",
        value: "F1"},
        {label: "F2",
        value: "F2"},
    ]
    const conductores_data=[{
        label:"M1-TTE GILL",value:"M1-TTE GILL"
    },{
        label:"M2-JOSE MONTORFANO", value: "M2-JOSE MONTORFANO"
    },{
        label:"--", value: "--"
    }]

    const sercivicio_tipos = [{
        label:"10.40", value: "10.40",
    }, {
        label: "10.41", value: "10.41",
    },{
        label: "10.42", value: "10.42",
    }];

    return (
        <ScrollView>
            <Card containerStyle={{backgroundColor:"white"}}>
                <Card.Title style={{color:"black"}}>Movimiento de móviles</Card.Title>
        <TextRNE style={{color:"black"}}  >Movil</TextRNE>
                <Controller  name="movil"
                             control={control}
                             render={({field: {onChange, onBlur,value},fieldState}) => (
        <Dropdown data={movil_data}
                  placeholder={"Seleccione un movil"}
                  labelField="label" valueField="value"
                  onChange={item => {
                       onChange(item.value)
                  }
                  }
                  key="movil"
                  value={value}
        />
    )} defaultValue={""} />

         <TextRNE style={{color:"black"}}  >KM DE LLEGADA</TextRNE>
         <Input placeholder="Ingrese Km" inputStyle={{color:"black"}}   ></Input>
            </Card>

            <Card containerStyle={{backgroundColor:"white"}}>
                <Card.Title style={{color:"black"}}>Conductor</Card.Title>
                <TextRNE style={{color:"black"}}  >10.30</TextRNE>
                <Dropdown data={conductores_data}
                          placeholder={"Seleccione 10.30"}
                          labelField="label" valueField="value" onChange={item => setConductor(item.value)}
                          value={conductor}
                key="conductor"
                />

                <TextRNE style={{color:"black"}}  >10.30 OTRO (BA)</TextRNE>
                <Input placeholder="Ingrese BA" inputStyle={{color:"black"}}   ></Input>
            </Card>
            <Card containerStyle={{backgroundColor:"white"}}>
                <Card.Title style={{color:"black"}}>Tipo de Servicio</Card.Title>
                <TextRNE style={{color:"black"}}  >Seleccione el servicio</TextRNE>
                <Dropdown data={sercivicio_tipos}
                          placeholder={"seleccione"}
                          labelField="label" valueField="value"
                          onChange={item => {
                              console.log(item)
                              setTipoDeServicio(item.value)
                              return item.value
                            }

                          }
                          value={tipoDeServicio}
                key="servicio"/>

                { tipoDeServicio === "10.40" &&
                <View>
                    <TextRNE style={{color:"black"}}  >10.40 OTRO (BA)</TextRNE>
                    <Input placeholder="Ingrese BA" inputStyle={{color:"black"}}   ></Input>
                </View>
                }


            </Card>
            <Button buttonStyle={{marginTop:10}} onPress={handleSubmit(data => console.log(data))}>Guardar</Button>
        </ScrollView>
    )

}
