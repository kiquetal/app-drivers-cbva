import * as React from 'react';
import {View, Text, StyleSheet, ScrollView} from "react-native";
import {useEffect, useState} from "react";
import {supabase} from "../lib/supabase";
import {Col, Row, Rows, Table, TableWrapper} from "react-native-table-component";
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
            <Table borderStyle={{borderWidth: 1}} style={{flexGrow:1}}>
                <Row data={['SECTION1']} style={styles.head}/>
                      <React.Fragment>
                <Row data={['Posee usted los conocmientos minimos de PA, manejo y también curso de manejo defensivo, \n ocasionó una pérdida al cuartel']} style={styles.head}/>
                          <TableWrapper style={styles.wrapper}>

                    <Rows data={[["no yes"],[" nota larga"]]} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
                          </TableWrapper>
                          </React.Fragment>

                <Row data={['tiene usted experiencia en manejar?']}/>
                <TableWrapper style={styles.wrapper} >
                    <Rows data={[["no yes"],[" nota larga"]]} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
                </TableWrapper>

                <Row data={['tiene usted experiencia en manejar?']}/>
                <TableWrapper style={styles.wrapper} >
                    <Rows data={[["no yes"],[" nota larga"]]} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
                </TableWrapper>

                <Row data={['tiene usted experiencia en manejar?']}/>
                <TableWrapper style={styles.wrapper} >
                    <Rows data={[["no yes"],[" nota larga"]]} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
                </TableWrapper>
                <Row data={['tiene usted experiencia en manejar?']}/>
                <TableWrapper style={styles.wrapper} >
                    <Rows data={[["no yes"],[" nota larga"]]} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
                </TableWrapper>
                <Row data={['tiene usted experiencia en manejar?']}/>
                <TableWrapper style={styles.wrapper} >
                    <Rows data={[["no yes"],[" nota larga"]]} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
                </TableWrapper>
                <Row data={['tiene usted experiencia en manejar?']}/>
                <TableWrapper style={styles.wrapper} >
                    <Rows data={[["no yes"],large?[" nota larga"]:null]} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
                </TableWrapper>
                <Row data={['tiene usted experiencia en manejar?']}/>
                <TableWrapper style={styles.wrapper} >
                    <Rows data={[["no yes"],[" nota larga"]]} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
                </TableWrapper>


            </Table>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {    backgroundColor: '#f1f8ff' , flex:1  },
    wrapper: { flexDirection: 'row' , borderStyle: 'solid', borderWidth: 1, borderColor: 'black'},
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 48  },
    text: { textAlign: 'center' }
});
