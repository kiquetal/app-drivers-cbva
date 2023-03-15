import * as React from 'react';
import {View, Text, StyleSheet, ScrollView} from "react-native";
import {useEffect, useState} from "react";
import {supabase} from "../lib/supabase";
import {Row, Table} from "react-native-table-component";
import {Dialog} from "@rneui/themed";

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
        }

        loadDetailQuestionary();
        }, [navigation]

    )
    const tableData = [
        ['Section', 'Question'],
        ['Personal Information', 'What is your name?'],
        ['Personal Information', 'What is your favorite color?'],
        ['Personal Information', 'What is your favorite food?'],
        ['Employment Information', 'What is your job title?'],
        ['Employment Information', 'How many years of experience do you have?'],
        ['Education Information', 'What is your highest level of education?'],
        ['Education Information', 'What is your graduation year?'],
    ];

    const sections = Array.from(new Set(tableData.slice(1).map(row => row[0])));

    return (
        <ScrollView>
        <Dialog visible={isLoading}><Dialog.Loading></Dialog.Loading></Dialog>
        <Table>
            {sections.map((section) => (
                <React.Fragment key={section}>
                    <Row data={[section]} key={`{section}_s`} style={styles.sectionRow} textStyle={styles.sectionText} />
                    {tableData
                        .filter(row => row[0] === section)
                        .map((rowData) => (
                            <Row data={[rowData[1],null]} style={styles.questionRow} textStyle={styles.questionText} />
                        ))}
                </React.Fragment>
            ))}
        </Table>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    sectionRow: {
        height: 30,
        backgroundColor: 'red',

    },
    sectionText: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 6,
    },
    questionRow: {
        height: 40,
    },
    questionText: {
        marginBottom: 3,

        fontSize: 14,
        textAlign: 'left',
        color: '#555555',
        fontWeight: 'bold',
    },
});
