import * as React from 'react';
import {ScrollView, View, StyleSheet} from "react-native";
import {Button, Input, Overlay, Text} from "@rneui/base";
import { useForm, Controller} from "react-hook-form";
import {CheckBox} from "@rneui/themed";
import {useState} from "react";
import Question from "./Question";

export default FormQuestions = (props) => {

    const { control, handleSubmit, formState: { errors } } = useForm();

    const { navigation } = props;




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
               console.log(key)
               console.log(section, question, data[key])
               console.log(`answer-for`, answer)
               if (answer != "notes")
               sectionsObject[section]["questions"].push({question:question, answer:answer})
               else
               sectionsObject[section]["notes"].push({question:question, notes:data[key]});
           }

        });
        console.log(JSON.stringify(sectionsObject))

        let quetionsBySections = {}

        Object.keys(sectionsObject).forEach((key) => {
            let section = key;
            let questions = sectionsObject[key]["questions"];
            let notes = sectionsObject[key]["notes"];
            quetionsBySections[section] = {}
            questions.forEach((question) => {
                if (quetionsBySections[section][`question-${question.question}`] == undefined) {
                    quetionsBySections[section][`question-${question.question}`] = {}
                }
                if (quetionsBySections[section][`question-${question.question}`]==undefined) {
                    quetionsBySections[section][`question-${question.question}`] = {}
                }
                quetionsBySections[section][`question-${question.question}`][question.answer] = true;
                if (notes.length > 0) {
                    notes.forEach((note) => {
                        if (note.question == question.question) {
                            quetionsBySections[section][`question-${question.question}`]["notes"] = note.notes
                        }
                    })
                }


            })

        });

        console.log(JSON.stringify(quetionsBySections))

        Object.keys(quetionsBySections).forEach((key) => {
            console.log(`section-${key}`)
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
                console.log(answers)
                console.log(notes)
            })

        });

    }

    return (
        <ScrollView>
            <View>
                <Text style={styles.section}>Section 1</Text>
                 <Text style={styles.question}>Question 1</Text>
                <Question control={control} section={"section1"} question="question1"  />
                <Text style={styles.question}>Question 2</Text>
               <Question control={control} section={"section1"} question="question2"  />
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
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
        backgroundColor: 'purple',
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

