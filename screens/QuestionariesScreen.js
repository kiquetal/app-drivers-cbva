import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Dimensions, View, StyleSheet, ScrollView} from "react-native";
import {Button, Dialog, Text} from "@rneui/themed";
import {supabase} from "../lib/supabase";
import {Row, Rows, Table} from "react-native-table-component";

const { width } = Dimensions.get("window");
export default function QuestionariesScreen(props) {

    const { navigation } = props;

    const [isLoading, setIsLoading] = useState(true);

    const [questionaries, setQuestionaries] = useState([])

    const [headerData, setHeaderData] = useState(['ID', 'Fecha', 'Form','Action'])
    useEffect(() => {

        const loadQuestionaries = async () => {
            try {
                const { data, error } = await supabase
                    .from('questionaries')

                    .select(`*, forms(form_name)`)
                if (error) {
                    console.log(error);
                    throw error;
                }
                console.log(data);
                setQuestionaries(data);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        loadQuestionaries();

    },[navigation]);

   return (
       <View>
        <Dialog isVisible={isLoading==true}><Dialog.Loading/></Dialog>

           <ScrollView>
               {!isLoading && <Text style={{color: 'black'}}>History...</Text>}
               {isLoading !=null ? <Table>
                   <Row data={headerData} style={styles.HeadStyle} textStyle={{color:'#fff'}} ></Row>
                   <Rows data={questionaries.map((questionary) => [questionary.id, questionary.created_at.split("T")[0], questionary.forms.form_name,<Button onPress={()=>navigation.navigate('DetailQuestionary',{
                          id: questionary.id
                   })}>Ver detalle</Button>])} style={styles.TableText}></Rows>
               </Table>: null  }
               </ScrollView>
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
    HeadStyle: {
        height: 50,
        alignContent: "center",
        backgroundColor: '#4347c2',
        color: '#fff'

    },
    TableText: {
        margin: 10
    }

});
