import * as React from 'react';
import {View,  StyleSheet, ScrollView} from "react-native";
import  {useEffect, useState} from "react";
import {supabase} from "../lib/supabase";
import {Cell, Col, Row, Rows, Table, TableWrapper} from "react-native-table-component";
import {Button, Dialog, Text} from "@rneui/themed";

export default DetailQuestionaryScreen = (props) =>  {

    const { navigation } = props;
    const { id } = props.route.params;
    console.log(id)

    const [isLoading, setIsLoading] = useState(true);
    const [questionaries, setQuestionaries] = useState([])
    useEffect( () => {

        const loadDetailQuestionary = async () => {
            setIsLoading(true);
        const { data, error } = await    supabase.from('ans')
                .select(`*, questions(question),sections(name_section),
                questionaries(id)`)
            .eq('questionary_id',id)
        if (error)
        {
            console.log("Error en detail",error);
        }
        console.log(JSON.stringify(data))
            setIsLoading(false);
            setQuestionaries(data)
        }

        loadDetailQuestionary();
        }, [navigation]

    )
    const tableData = [
        ['Section', 'Question'],
        ['Personal Information', 'What is your name?','si'],
        ['Personal Information', 'What is your favorite color?','no'],
        ['Personal Information', 'What is your favorite food?', 'si'],
        ['Employment Information', 'What is your job title?', 'no'],
        ['Employment Information', 'How many years of experience do you have? asdasd asdasdsadas asdsadsadadsa adasdsadasdas adsadasdassdas', 'si'],
        ['Education Information', 'What is your highest level of education?', 'no'],
        ['Education Information', 'What is your highest level of education?', 'no'],
        ['COm', 'What is your graduation year?','na'],
        ['COm', 'Are you good??','na'],
    ];

    const sections = Array.from(new Set(tableData.slice(1).map(row => row[0])));
    const sectionsFromQuestionaries = Array.from(new Set(questionaries.map(row => row.sections.name_section)));
    return (
        <ScrollView style={{ backgroundColor: '#f0f0f0' }}>
            <Dialog visible={isLoading}>
                <Dialog.Loading />
            </Dialog>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#4347c2' }} style={{ margin: 10 }}>
                {sectionsFromQuestionaries.map((section, index) => {
                    const filteredRows = questionaries.filter(row => row.sections.name_section === section);
                    console.log(filteredRows)
                    return (
                        <React.Fragment key={index}>
                            <Row data={[section]} style={styles.head} textStyle={styles.headTitle} />
                            {filteredRows.map((row, index) => (
                                <React.Fragment key={`${index}_f`}>
                                    <Row data={[row.questions.question]} textStyle={styles.question} style={styles.questionHeader} />
                                    <Row data={[row.answer]} style={styles.row} textStyle={styles.text} />
                                    {row.notes > "" && <Row data={[row.notes]} textStyle={styles.text} key={`${index}_odd`} />}
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    );
                })}
            </Table>
            <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
                <Button buttonStyle={{marginLeft:2}} onPress={() => navigation.navigate('Questionaries')}>Regresar</Button>
                <Button  buttonStyle={{marginLeft:5}} onPress={() => navigation.navigate('Questionary')}>Exportar csv</Button>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    head: {
        backgroundColor: '#4347c2',
        flex: 1
    },
    headTitle: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    wrapper: {
        flexDirection: 'row',
        borderStyle: 'solid',
    },
    questionHeader: {
        backgroundColor: '#437ec2',
        color: 'white',
        fontWeight: 'bold'
    },
    question: {
        marginLeft: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    row: {
        backgroundColor: '#f5f5f5'
    },
    text: {
        marginLeft: 10
    }
});
