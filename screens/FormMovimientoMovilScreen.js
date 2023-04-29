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
        }
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
        label: "10.43", value: "10.43",
    },{
        label: "10.51", value: "10.51",
    },{
        label: "10.33", value: "10.33",
    },
        {
            label: "10.34", value: "10.34",
        }];

    const ten_forty = [{
        label: "Vehicular", value: "Incendio-Vehicular",
    },{
        label:"Estructural" ,value: "Incendio-Estructural",
    },{
        label:"Basura", value: "Incendio-Basura",

    },{
        label:"Pastizal", value: "Incendio-Pastizal",
    },{
        label:"Electrico", value: "Incendio-Eléctrico",
    }
    ];

    const ten_forty_one = [{
        label:"Vehicular", value: "Rescate-Vehicular",
    },{
        label:"Vehicular con lesionados", value: "Rescate-Vehicular-1042"
    },{
        label:"Motocicleta", value: "Rescate-Motocicleta" },
        {
        label:"Ciclista", value: "Rescate-Ciclista" },
        {
            label:"Arrollamiento", value: "Rescate-Arrollamiento" }

    ]
    const ten_forty_three = [{
        label:"Administrativo", value: "Administrativo",
    },{
        label:"Cobertura", value: "Cobertura",
    },
        {label: "Rescate de animal", value: "Rescate de animal"},
        {
            label:"Taller", value: "Taller"
        },{
        label:"Presupuesto", value: "Presupuesto"
        },{
        label:"Rescate de ascensor", value: "Rescate de ascensor"
        },
        {
            label: "Retiro de maateriales", value: "Retiro de materiales"
        },{
        label:"Retiro de comida", value: "Retiro de comida"

        },
        {
            label:"--", value: "--"
        }]

    const ten_fifty_one = [
        {
        label:"PCR", value: "PCR"
    },
        {
        label: "ACV", value: "ACV"
        },
        {
            label:"Caida de altura", value: "Caida de altura"
        },
        {
            label:"Probl. Clinico", value: "Probl. Clinico"
        }]
    const mySubmit = async (data) => {




    };
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

                <Controller  name="km" render={({field: {onChange, onBlur,value},fieldState}) => (
                                 <View>
         <TextRNE style={{color:"black"}}  >KM DE LLEGADA</TextRNE>
                <Input placeholder="Ingrese Km" inputStyle={{color:"black"}}  onChangeText={onChange} value={value}  ></Input>
                                    </View>
    )} defaultValue={""} control={control} />
            </Card>

            <Card containerStyle={{backgroundColor:"white"}}>
                <Card.Title style={{color:"black"}}>Conductor</Card.Title>
                <TextRNE style={{color:"black"}}  >10.30</TextRNE>
                <Controller  name="10_30"
                                control={control}
                                render={({field: {onChange, onBlur,value},fieldState}) => (
                <Dropdown data={conductores_data}

                          placeholder={"Seleccione 10.30"}
                          labelField="label" valueField="value" onChange={item => onChange(item.value)} value={value}

                key="conductor"
                    defaultValue={conductores_data[0].value}
                />
            )}/>

                <TextRNE style={{color:"black"}}  >10.30 OTRO (BA)</TextRNE>
                <Input placeholder="Ingrese BA" inputStyle={{color:"black"}}   ></Input>
            </Card>
            <Card containerStyle={{backgroundColor:"white"}}>
                <Card.Title style={{color:"black"}}>Tipo de Servicio</Card.Title>
                <Card.Divider/>
                <TextRNE style={{color:"black"}}  >Seleccione el servicio</TextRNE>
                <Controller  name="servicio" control={control} defaultValue=""
                render={({field: {onChange, onBlur,value},fieldState}) => (
                    <Dropdown data={sercivicio_tipos}
                              placeholder={"seleccione"}
                              labelField="label" valueField="value"
                              onChange={ item => {
                                  onChange(item.value)
                                  setTipoDeServicio(item.value)

                              }}
                              value={value}
                              key="servicio"/>
                )}
                />
                <Card.Title style={{color:"black"}}>Tipo de Servicio</Card.Title>

                <TextRNE style={{color:"black"}}  >Dirección del servicio</TextRNE>
               <Controller  name="direccion" control={control} defaultValue=""
                            render={({field: {onChange, onBlur,value},fieldState}) => (
                <Input placeholder="Dirección" inputStyle={{color:"black"}}
                onChangeText={text => onChange(text)} value={value}
                ></Input>
            )}/>

                { tipoDeServicio === "10.40" &&
                <View>
                    <TextRNE style={{color:"black"}}  >Tipo de incendio</TextRNE>
                    <Controller  name="10_40"
                                    control={control}
                                    render={({field: {onChange, onBlur,value},fieldState}) => (
                    <Dropdown data={ten_forty} labelField="label"
                              placeholder={"Seleccione el tipo de incendio"}
                              valueField="value" onChange={item => onChange(item.value)} value={value} />
                )} defaultValue={ten_forty[0].value} />
                  <Controller  name="10_40_pump"
                                    control={control}
                                    render={({field: {onChange, onBlur,value},fieldState}) => (
                                     <View>
                                         <TextRNE style={{color:"black"}}  >Lleva bomba</TextRNE>
                                        <Dropdown data={[{label: "SI",value:"SI"},{label:"NO",value:"NO"}]} labelField="label" valueField="value"
                                                  placeholder={"Seleccione si lleva bomba"}
                                                  onChange={item => onChange(item.value)} value={value} />
                                     </View>

                                    )}
                                         />

                </View>
                }

                {
                    tipoDeServicio === "10.41" &&
                    <View>
                        <TextRNE style={{color:"black"}}  >Tipo de rescate</TextRNE>
                        <Controller  name="10_41"
                                        control={control}
                                        render={({field: {onChange, onBlur,value},fieldState}) => (
                        <Dropdown data={ten_forty_one} labelField="label"
                                    placeholder={"Seleccione el tipo de rescate"}
                                    valueField="value" onChange={item => onChange(item.value)} value={value} />
                    )} defaultValue={ten_forty_one[0].value} />
                    </View>

                }
                {
                    tipoDeServicio === "10.43" &&
                    <View>
                        <TextRNE style={{color:"black"}}  >Tipo de servicio</TextRNE>
                        <Controller  name="10_43"
                                        control={control}
                                        render={({field: {onChange, onBlur,value},fieldState}) => (
                        <Dropdown data={ten_forty_three} labelField="label"
                                    placeholder={"Seleccione el tipo de servicio"}
                                    valueField="value" onChange={item => onChange(item.value)} value={value} />
                    )} defaultValue={ten_forty_three[0].value} />
                    </View>

                }
                {
                    tipoDeServicio === "10.51" &&
                    <View>
                        <TextRNE style={{color:"black"}}  >Tipo de servicio</TextRNE>
                        <Controller  name="10_51"
                                        control={control}
                                        render={({field: {onChange, onBlur,value},fieldState}) => (
                        <Dropdown data={ten_fifty_one} labelField="label"
                                    placeholder={"Seleccione el tipo de servicio"}
                                    valueField="value" onChange={item => onChange(item.value)} value={value} />
                    )} defaultValue={ten_fifty_one[0].value} />
                    </View>

                }
            </Card>
            <Card
                containerStyle={{backgroundColor:"white"}}
            >
                <Card.Title style={{color:"black"}}>Observaciones</Card.Title>
                <Card.Divider/>
                <Controller  name="observaciones"
                                control={control}
                                render={({field: {onChange, onBlur,value},fieldState}) => (
                <Input placeholder="Observaciones" inputStyle={{color:"black"}} onChangeText={onChange} value={value} />
            )} defaultValue={""} />
            </Card>
            <Button buttonStyle={{marginTop:10}} onPress={handleSubmit(mySubmit)}>Guardar</Button>
        </ScrollView>
    )

}
