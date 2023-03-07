import * as React from 'react';
import {ScrollView, View, StyleSheet} from "react-native";
import {Button, Dialog, Input, Overlay, Text} from "@rneui/themed";
import { useForm, Controller} from "react-hook-form";
import {useEffect, useState} from "react";
import Question from "./Question";
import {supabase} from "../lib/supabase";
import {manipulateSections} from "../lib/formLib";

export default FormQuestions = (props) => {

    const { control, handleSubmit, formState: { errors } } = useForm();

    const { navigation } = props;

    const [isLoading, setIsLoading] = useState(true)
    const [sections, setSections] = useState([])

    useEffect(() => {
        const readDatabase = async () => {
            const {data, error} = await supabase
                .from('sections')
                .select(`*, questions(question,id )`)
                .order('id', {ascending: true})
                .order('id',{foreignTable: 'questions', ascending: true})

            if (data) {
                const onlySectionWithQuestions = data.filter((section) => section.questions.length > 0)
                setSections(onlySectionWithQuestions)
            }
            if (error) {
                console.log(error)
            }
            setIsLoading(false)
        }
        readDatabase()

    }, [navigation])


    function onSubmit(data) {

        let sectionsObject = {}
        Object.keys(data).forEach((key) => {
            let section = key.split("_")[0];
            section = section.split("section")[1];
            let question = key.split("_")[1];
            question = question.split("question")[1];
            let answer = key.split("_")[3];

            if (sectionsObject[section] === undefined) {
                sectionsObject[section] = {"questions":[],"notes":[]}
            }

           if ( data[key] !== false && data[key] !== "" ) {

               if (answer != "notes")
               sectionsObject[section]["questions"].push({question:question, answer:answer})
               else
               sectionsObject[section]["notes"].push({question:question, notes:data[key]});
           }

        });
        console.log(JSON.stringify(sectionsObject))
        console.log("-------")
        let quetionsBySections = manipulateSections(sectionsObject
        )
        console.log(JSON.stringify(quetionsBySections))

        Object.keys(quetionsBySections).forEach((key) => {
            Object.keys(quetionsBySections[key]).forEach((question) => {
              console.log(`section-${key} ${question}`)
                let answers = '';
                let notes = '';
                Object.keys(quetionsBySections[key][question]).forEach((answer) => {
                  if (answer != "notes") {
                      console.log(`section-${key} ${question} ${answer}`)
                      answers += `${answer} `
                  }
                  else {
                      console.log(`section-${key} ${question} ${answer} ${quetionsBySections[key][question][answer]}`)
                        notes = quetionsBySections[key][question][answer]
                  }
                })
                //insert question,note,section,user,form,quesionary
                console.log(answers)
                console.log(notes)
            })

        });

    }

    let index = 0;
    return (
        <ScrollView>
            <View>
                <Dialog visible={isLoading}><Dialog.Loading></Dialog.Loading></Dialog>
                 {sections.map((section) => {
                    return (<React.Fragment key={`${index++}_section`}>
                        <Text key={`${section.id}_${index++}_title`} style={styles.section}>{section.name_section}</Text>
                          {section.questions.map((question) => {
                             return(
                                 <React.Fragment key={`${section}_${question.id}_question`}>
                                      <Text key={`${question.id}_${section.id}_title`} style={styles.question}>{question.question}</Text>
                                      <Question key={`${question.id}_${section.id}`} control={control} section={`section${section.id}`} question={`question${question.id}`}  />
                                    </React.Fragment>
                             )
                          })}
                    </React.Fragment>)
                })
                }


                {isLoading != true?  <Button  title="Submit" onPress={handleSubmit(onSubmit)}/>:null}
            </View>
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

     question: {
        backgroundColor: 'indigo',
        color: 'white',
        padding: 10,
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    section: {
        backgroundColor: 'blue',
        color: 'white',
        padding: 10,
    }
})

