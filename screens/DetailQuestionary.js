import * as React from 'react';
import {View,  StyleSheet, ScrollView} from "react-native";
import  {useEffect, useState} from "react";
import {supabase} from "../lib/supabase";
import {Cell, Col, Row, Rows, Table, TableWrapper} from "react-native-table-component";
import {Dialog, Text} from "@rneui/themed";

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
        ['Personal Information', 'What is your name?','si'],
        ['Personal Information', 'What is your favorite color?','no'],
        ['Personal Information', 'What is your favorite food?', 'si'],
        ['Employment Information', 'What is your job title?', 'no'],
        ['Employment Information', 'How many years of experience do you have? asdasd asdasdsadas asdsadsadadsa adasdsadasdas adsadasdassdas', 'si'],
        ['Education Information', 'What is your highest level of education?', 'no'],
        ['Education Information', 'What is your highest level of education?', 'no'],
        ['COm', 'What is your graduation year?','na'],
    ];

    const sections = Array.from(new Set(tableData.slice(1).map(row => row[0])));

    const tableHead = ['', 'Head1', 'Head2', 'Head3']
    const tableTitle = ['Esta usted seguro de saber el reglamento de transito?', 'Title2', 'Title3', 'Title4','Title', 'Title2', 'Title3', 'Title4','Title', 'Title2', 'Title3', 'Title4','Title', 'Title2', 'Title3', 'Title4']
    const tableData2 = [
        ['1', '2', '3'],
        ['a', 'b', 'c'],
        ['1', '2', '3'],
        ['a', 'b', 'c'],
            ['1', '2', '3'],
        ['a', 'b', 'c'],
            ['1', '2', '3'],
        ['a', 'b', 'c'],
        ['a', 'b', 'c'],
        ['1', '2', '3'],
        ['a', 'b', 'c'],
        ['1', '2', '3'],
        ['a', 'b', 'c'],
        ['1', '2', '3'],
            ['1', '2', '3'],
        ['a', 'b', 'c'],
       ['1', '2', '3'],
        ['a', 'b', 'c']
            ['1', '2', '3'],
        ['a', 'b', 'c'],
        ['1', '2', '3'],
        ['a', 'b', 'c'],
        ['1', '2', '3'],
        ['a', 'b', 'c'],
        ['1', '2', '3'],
        ['a', 'b', 'c']
    ]
    const large = false
    return (
        <ScrollView>
        <Dialog visible={isLoading}><Dialog.Loading></Dialog.Loading></Dialog>
            <Table borderStyle={{borderWidth: 1}} style={{borderColor: 'black'}}>
                {sections.map((section, index) => {

                    const filteredRows = tableData.slice(1).filter(row => row[0] === section);
                    return (
                        <React.Fragment>
                        <Row key={index} data={[section]} style={styles.head} textStyle={styles.headTile} />
                            {filteredRows.map((row, index) => {
                            return (
                                <React.Fragment>
                                    <Row key={`${index}_i`} data={[row[1]]} textStyle={styles.question}  style={styles.questionHeader} />
                                    <Row key={`${index}_m`} data={[row[2]]} style={styles.row} textStyle={styles.text} />
                                   {index % 2 === 1 && <Row key={`${index}_odd`} data={['Additional row']} textStyle={styles.text}/>}
                                </React.Fragment>
                            )
                         })}
                        </React.Fragment>
                    )
                })}


            </Table>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {    backgroundColor: '#4347c2' , flex:1  },
    headTile: { textAlign: 'center', color:'white' },
    wrapper: { flexDirection: 'row' , borderStyle: 'solid', borderWidth: 1, borderColor: 'black'},
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 48 ,color:'red' },
    text: { textAlign: 'center', color:'black' },
    question: { textAlign: 'left', color:'black' },
    questionHeader: { textAlign: 'left', color:'black', backgroundColor: '#0288D1' },
});
