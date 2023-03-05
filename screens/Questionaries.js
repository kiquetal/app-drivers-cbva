import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Dimensions, Modal, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {CheckBox, useTheme} from '@rneui/themed';
import {Button, Divider} from "@rneui/base";
import { REACT_APP_DEV_MODE , REACT_APP_PROD_MODE} from '@env';
const { width } = Dimensions.get("window");
import {supabase} from "../lib/supabase";
export default function App() {
    const { theme, updateTheme } = useTheme();
    const [checked, setChecked] = React.useState(true);
    const toggleCheckbox = () => setChecked(!checked);
    const [isModalVisible, setModalVisible] = useState(false);
    console.log(REACT_APP_PROD_MODE);
    // This is to manage TextInput State
    const [inputValue, setInputValue] = useState("");

    const [ user, setUser ] = useState(null);
    useEffect( () => {

        const trySigUp = async () => {
            let {data, error} = await supabase.auth.signInWithPassword({
                email: 'kiquetal+invite2@gmail.com',
                //      email:'kiquetal+2@gmail.com',
                password:"12345678"
            })

            setUser(data.user.email)
            console.log(data.session.access_token)
            let{ data: questions,  error: e } = await
                supabase
                    .from('sections')
                    .select(`name_section,questions(question)` );
            console.log(JSON.stringify(questions))

            /*   let { data: q, error: er } =   await  supabase.
               from('questionaries').insert({
                   'user_id': data.user.id,
                   'form_id': 1
               }).select('user_id,form_id');
            */
            // console.log(JSON.stringify(q));

            let { data: all_questionares, error: err } = await supabase
                .from('questionaries')
                .select(`id`);


            //  console.log(JSON.stringify(er));
            console.log(JSON.stringify(all_questionares));

        }
        trySigUp();
    }, []);


    // Create toggleModalVisibility function that will
    // Open and close modal upon button clicks.
    const toggleModalVisibility = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <ScrollView>
            <Text style={styles.subHeader}>OPERADOR {user}</Text>
            <View style={styles.horizontal}>
                <Text style={styles.horizontalText}>Dispone de EPI</Text>
                <Divider />

                <View style={
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }
                }>
                    <CheckBox title="SI" />
                    <CheckBox title="NO"/>
                    <CheckBox title="N/A"/>
                    <Button title="Comentarios" onPress={toggleModalVisibility} />
                    <Modal animationType="slide"
                           transparent visible={isModalVisible}
                           presentationStyle="overFullScreen"
                           onDismiss={toggleModalVisibility}>
                        <View style={styles.viewWrapper}>
                            <View style={styles.modalView}>
                                <TextInput placeholder="Comentarios.."
                                           multiline={true}
                                           numberOfLines={4}
                                           value={inputValue} style={styles.textInput}
                                           onChangeText={(value) =>  setInputValue(value)} />

                                {/** This button is responsible to close the modal */}
                                <Button title="Close" onPress={toggleModalVisibility} />

                            </View>
                        </View>
                    </Modal>
                </View>
                <Divider />
                <Text style={styles.horizontalText}>
                    Cuenta con Registro adecuado y vigente fancy o no
                </Text>
                <Divider width={5} color={theme?.colors?.primary} />
            </View>
            <Text style={styles.subHeader}>Horizontal Divider with Inset</Text>
            <View style={styles.horizontal}>
                <Text style={styles.horizontalText}>
                    Horizontal Divider with left inset
                </Text>
                <Divider inset={true} />
                <Text style={styles.horizontalText}>
                    Horizontal Divider with right inset
                </Text>
                <Divider inset={true} insetType="right" />
                <Text style={styles.horizontalText}>
                    Horizontal Divider with middle inset
                </Text>
                <Divider inset={true} insetType="middle" />
                <Text style={styles.horizontalText}>Welcome to RNE App</Text>
            </View>
            <Text style={styles.subHeader}>Vertical Dividers</Text>
            <View style={styles.vertical}>
                <Text>Left text</Text>
                <Divider orientation="vertical" />
                <Text>Right text</Text>
            </View>
            <View style={styles.vertical}>
                <Text>Left text</Text>
                <Divider orientation="vertical" width={5} />
                <Text>Right text</Text>
            </View>
            <Text style={styles.subHeader}>Dividers with SubHeader</Text>
            <View style={styles.horizontal}>
                <Text style={styles.horizontalText}>Left text</Text>
                <Divider
                    subHeader="Divider"
                    inset={true}
                    subHeaderStyle={{ color: theme?.colors?.primary }}
                />
                <Text style={styles.horizontalText}>Right text</Text>
            </View>
            <Text style={styles.subHeader}>Dividers with SubHeader</Text>
            <View style={styles.horizontal}>
                <Text style={styles.horizontalText}>Left text</Text>
                <Divider
                    subHeader="Divider"
                    inset={true}
                    subHeaderStyle={{ color: theme?.colors?.primary }}
                />
                <Text style={styles.horizontalText}>Right text</Text>
            </View>
            <Text style={styles.subHeader}>Dividers with SubHeader</Text>
            <View style={styles.horizontal}>
                <Text style={styles.horizontalText}>Left text</Text>
                <Divider
                    subHeader="Divider"
                    inset={true}
                    subHeaderStyle={{ color: theme?.colors?.primary }}
                />
                <Text style={styles.horizontalText}>Right text</Text>
            </View>
            <Text style={styles.subHeader}>Dividers with SubHeader</Text>
            <View style={styles.horizontal}>
                <Text style={styles.horizontalText}>Left text</Text>
                <Divider
                    subHeader="Divider"
                    inset={true}
                    subHeaderStyle={{ color: theme?.colors?.primary }}
                />
                <Text style={styles.horizontalText}>Right text</Text>
            </View>
            <Text style={styles.subHeader}>Dividers with SubHeader</Text>
            <View style={styles.horizontal}>
                <Text style={styles.horizontalText}>Left text</Text>
                <Divider
                    subHeader="Divider"
                    inset={true}
                    subHeaderStyle={{ color: theme?.colors?.primary }}
                />
                <Text style={styles.horizontalText}>Right text</Text>
            </View>
            <Text style={styles.subHeader}>Dividers with SubHeader</Text>
            <View style={styles.horizontal}>
                <Text style={styles.horizontalText}>Left text</Text>
                <Divider
                    subHeader="Divider"
                    inset={true}
                    subHeaderStyle={{ color: theme?.colors?.primary }}
                />
                <Text style={styles.horizontalText}>Right text</Text>
            </View>

        </ScrollView>
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
