import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {Dimensions, Modal, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {CheckBox, useTheme} from '@rneui/themed';
import {Button, Divider} from "@rneui/base";

const { width } = Dimensions.get("window");

export default function App() {
    const { theme, updateTheme } = useTheme();
    const [checked, setChecked] = React.useState(true);
    const toggleCheckbox = () => setChecked(!checked);
    const [isModalVisible, setModalVisible] = useState(false);

    // This is to manage TextInput State
    const [inputValue, setInputValue] = useState("");

    // Create toggleModalVisibility function that will
    // Open and close modal upon button clicks.
    const toggleModalVisibility = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <ScrollView>
            <Text style={styles.subHeader}>OPERADOR</Text>
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
