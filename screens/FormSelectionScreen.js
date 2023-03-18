import * as React from 'react';
import {Button} from "@rneui/themed";
import {View,Text, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function FormSelectionScreen(props) {
    const { navigation } = props;


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                buttonStyle={styles.screenButtonContainer}
                onPress={() => navigation.navigate('FormQuestionsOpeartors')}
            >
                <View style={styles.screenIcon}>
                    <Icon name="wrench" size={20} color="#7f5af0" />
                </View>
                <Text style={styles.screenButtonText}>Operadores de móviles</Text>
            </Button>

            <Button
                buttonStyle={styles.screenButtonContainer}
                onPress={() => navigation.navigate('Screen2')}
            >
                <View style={styles.screenIcon}>
                    <Icon name="gear" size={20} color="#7f5af0" />
                </View>
                <Text style={styles.screenButtonText}>Material Menor</Text>
            </Button>

            <Button
                buttonStyle={styles.screenButtonContainer}
                onPress={() => navigation.navigate('Screen3')}
            >
                <View style={styles.screenIcon}>
                    <Icon name="car" size={20} color="#7f5af0" />
                </View>
                <Text style={styles.screenButtonText}>Material Mayor</Text>
            </Button>
        </View>
    );

}

const styles = StyleSheet.create({
    screenButtonContainer: {

        padding: 10,
        borderRadius: 30,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    screenButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10,
    },
    screenIcon: {
        backgroundColor: '#fff',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
    },
    screenIconText: {
        color: '#7f5af0',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
