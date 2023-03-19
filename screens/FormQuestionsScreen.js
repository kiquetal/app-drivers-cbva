import * as React from 'react';
import {ScrollView, View, StyleSheet} from "react-native";
import {Button, Dialog, Input, Overlay, Text} from "@rneui/themed";
import { useForm, Controller} from "react-hook-form";
import {useEffect, useState} from "react";
import Question from "../components/Question";
import {supabase} from "../lib/supabase";
import {manipulateSections} from "../lib/formLib";

export default FormQuestions = (props) => {

    const { control, handleSubmit, formState: { errors } } = useForm();

    const { navigation } = props;

    const [isLoading, setIsLoading] = useState(true)
    const [sections, setSections] = useState([])
    const [user, setUser] = useState(null)
    const [formId,setFormId] = useState(0)
    useEffect(() => {
        const readDatabase = async () => {
            const {data, error} = await supabase
                .from('sections')
                .select(`*, questions(question,id )`)
                .order('id', {ascending: true})
                .order('id',{foreignTable: 'questions', ascending: true})

            if (data) {
                setIsLoading(false)

                const onlySectionWithQuestions = data.filter((section) => section.questions.length > 0)
                console.log('first fitler',JSON.stringify(onlySectionWithQuestions))
                if (onlySectionWithQuestions.length > 0) {
                    setFormId(onlySectionWithQuestions[0].form_id)
                }
                setSections(onlySectionWithQuestions)

            }
            if (error) {
                console.log(error)
                setIsLoading(false)

            }
            if (user === null) {
                const {data, error} = await supabase.auth.getUser()
                if (data) {
                    setUser(data)
                }
                if (error) {
                    console.log(error)

                }
            }
        }
        readDatabase()

    }, [navigation])


    async function onSubmit(data) {

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
        let quetionsBySections = manipulateSections(sectionsObject)
        console.log(JSON.stringify(quetionsBySections))
        const rowToBeInserted = []
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

                const section = key;
                const questionId = question.split("-")[1];
                const answer = answers;
                const note = notes;

                console.log(`${section}, ${questionId}, ${answer}, ${note}, ${user.user.id}, ${formId}}`);

                rowToBeInserted.push({section_id:section, question_id:questionId, answer:answer, notes:note, user_id:user.user.id, form_id:formId})
            })

        });
        let questionaryId = 0;
        if (rowToBeInserted.length > 0) {
            const {data, error} = await supabase
                .from('questionaries')
                .insert([
                    {user_id: user.user.id, form_id: formId}
                ]).select('id')
            if (data) {
                console.log(data)
                questionaryId = data[0].id;

            }
            if (error) {
                console.log(error)
            }
        }

       const rowsWithQuestionaryId = rowToBeInserted.map((row) => {
           return {
               ...row,
               questionary_id: questionaryId
           }
        });
        const {data: dataInserted, error:errorInserted} = await supabase
            .from('ans')
            .insert(rowsWithQuestionaryId)
        if (dataInserted) {
            console.log(dataInserted)
        }
        if (errorInserted) {
            console.log(errorInserted)
        }
        navigation.navigate("Home")
    }

    let index = 0;
    return (
        <ScrollView>
            <View>
                <Dialog visible={isLoading}><Dialog.Loading></Dialog.Loading></Dialog>
                 {sections.map((section) => {
                    return (<React.Fragment key={`${index++}_section`}>
                        <Text key={`${section.id}_${index++}_title`} style={styles.section}>{section.id}-{section.name_section}</Text>
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
        backgroundColor: '#7f5af0',
        color: 'white',
        padding: 10,
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    section: {
        backgroundColor: '#437ec2',
        color: 'white',
        padding: 10,
    }
})

