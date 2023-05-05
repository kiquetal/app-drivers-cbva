import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Dropdown} from "react-native-element-dropdown";
import {Button, Card, Dialog, Overlay} from "@rneui/themed";
import {supabase} from "../lib/supabase";
import {Row, Rows, Table} from "react-native-table-component";
import {Controller, useForm} from "react-hook-form";
const { width } = Dimensions.get("window");

export default StatisticsScreen = (props) => {


    const { navigation } = props;
    const [form_id, setFormId] = useState(3);
    const [year, setYear] = useState(2023);
    const [month, setMonth] = useState(1);

    const { control, handleSubmit, formState: { errors }, getValues } = useForm();

    const [km, setKm] = useState(0);
    const [datTable, setDataTable] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
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

    useEffect( ()=>{

        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear()
        setMonth(month)
        setYear(year)


        }

    ,[])

    const generateTable = async () => {

        try {

            console.log("form_id",form_id)
            console.log("year",year)
            console.log("month",month)

            setIsLoading(true )
            setDataTable([])
            const { data, error} = await supabase.rpc('obtain_quantity_by_service',{
                f_id:form_id,
                q_id:75,
                in_year:year,
                in_month:month,
            })
            console.log("data",data)

            if (!error)
                setDataTable(data)


            let { data: datakm, error:errorkm } = await supabase
                .rpc('get_km_for_year_month', {
                    in_month:month,
                    in_year:year,
                })

            if (error) console.error(errorkm)
            else {
                console.log("datakm",datakm)
                if (datakm)
                setKm(datakm)
                else
                setKm(0)
            }

            setIsLoading(false)
        }
        catch (e) {
            console.log("error")
            console.log(e);
            setIsLoading(false)
        }

    }
    const types_services = [
        {
            label:"10.40",
            value:"10.40"
        },
        {
            label: "10.41",
            value:"10.41"
        },
        {
            label: "10.43",
            value:"10.43"
        },
        {
            label: "10.51"
            ,value:"10.51"
        },
        {
            label: "10.34",
            value:"10.34"
        }
        ]

    const obtenerDetalles = async () => {
            try {

                const { data, error} = await supabase.rpc('obtain_quantity_by_service',{


            }
            catch (e) {
                console.log("error, no se pudo obtener detalles")
                console.log(e);
            }


    }
    return (
        <View style={{ flex: 1 }}>
            <Card containerStyle={{backgroundColor:'white'}}>
            <Text>Formulario</Text>
                <Controller
                render={({field: {onChange, onBlur, value}}) => (

                    <Dropdown data={form_ids}
                              labelField="label"
                              valueField="value"
                              placeholder={"Seleccione un formulario"}
                              onChange={item => {
                                  console.log(item);
                                  setFormId(item.value);
                              }}
                              value={form_id}


                    />
                )}
                name="form_id"
                control={control}
                defaultValue={3}
                />

            <Text>Año</Text>
            <Dropdown data={years} labelField="label" valueField="value"
                      onChange={item => {
                          console.log(item);
                          setYear(item.value);

                      }}
            value={year}
            />
            <Text>Mes</Text>
            <Dropdown data={months} labelField="label" valueField="value"
                        onChange={item => {
                            console.log(item);
                            setMonth(item.value);
                        }
                        }
            value={month}
            />
                <Button style={{marginTop:10, height:50}}
                         title={"Generar"}
                        onPress={generateTable}
                />


            </Card>

            {             <Dialog isVisible={isLoading}><Dialog.Loading /></Dialog>}
            { datTable && datTable.length >0 &&
                <ScrollView>
            <View>
                <Card containerStyle={{backgroundColor:'white'}}>
                { datTable &&
                    <Table>
                        <Row data={["Cantidad","Servicio"]} style={styles.HeadStyle} textStyle={{color:'#fff'}} ></Row>
                        <Rows data={datTable.map((record) => [record.cantidad, record.servicio])}
                              style={styles.TableText}></Rows>
                    </Table>}

                <Text style={styles.horizontalText}>Total de kilometros: {km} </Text>
                    </Card>
                <Card
                    containerStyle={{backgroundColor:'white'}}>
                    <Card.Title style={{color:'black'}}>Detalle del Tipo de Servicio</Card.Title>
                    <Text >Seleccion el servicio</Text>
            <Controller  name="type_service"
                            control={control}
                         render={({field: {onChange, onBlur, value}}) => (
                    <Dropdown data={types_services} labelField="label" valueField="value" onChange={item => {
                        console.log(item);
                        onChange(item.value);

                    }
                    }
                    value={value}
                    />
                )}
                defaultValue={types_services[0].value}
                />
                    <Button style={{marginTop:10, height:50}}
                            title={"Obtener detalles"}
                            onPress={obtenerDetalles}

                    />
                    <Card.Divider/>
                </Card>
           </View>
                </ScrollView>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    subHeader: {
        backgroundColor : "#7f5af0",
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
    HeadStyle: {
        height: 50,
        alignContent: "center",
        backgroundColor: '#7f5af0',
        color: '#fff'

    },
    TableText: {
        margin: 10
    }

});
