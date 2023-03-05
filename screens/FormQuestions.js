import * as React from 'react';
import {ScrollView, View} from "react-native";
import {Button, Input, Overlay, Text} from "@rneui/base";
import { useForm, Controller} from "react-hook-form";
import {CheckBox} from "@rneui/themed";
import {useState} from "react";

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
            <View >
            <Text>Question 1</Text>
                <View >
                    <View style={{backgroundColor:'white', flex:1, flexDirection:'row', justifyContent:'center' }}>
         <Controller render={({field: {onChange,onBlur,value},fieldState}) => (
                <CheckBox title={"Yes"}
                 checked={value}
                          height={50}

                  style={{backgroundColor: 'blue'}}

                 onPress={()=> onChange(!value)}
                          checkedColor={"#000"}
                          style={{marginBottom: 0}}
                />
             )
         } name={"section1_question1_answer_yes"} control={control} defaultValue={""}
         />
            <Controller render={({field: {onChange,onBlur,value},fieldState}) => (
                <CheckBox title={"No"}
                          checked={value}
                          onPress={()=> onChange(!value)}
                          height={50}
                          checkedColor={"#000"} style={{marginTop: 0}}
                />
            )
            } name={"section1_question1_answer_no"} control={control} defaultValue={""}

            />
                <Controller render={({field: {onChange,onBlur,value},fieldState}) => (
                    <CheckBox title={"N/A"}
                              height={50}
                              checked={value}
                              onPress={()=> onChange(!value)}
                              checkedColor={"#000"} style={{marginTop: 0}}
                    />
                )
                } name={"section1_question1_answer_na"} control={control} defaultValue={""}

                />
                    </View>
            <Controller render={({field:{onChange,value}})=>(
                <Input
                multiline={true}
                    numberOfLines={1}
                    placeholder={"Notas"}
                 onChangeText={value => onChange(value)}
                />
            )} name={"section1_question1_answer_notes"} control={control} defaultValue={""} />
                </View>
                <Text>Question 2</Text>

                <Controller render={({field: {onChange,onBlur,value},fieldState}) => (
                    <CheckBox title={"Yes"}
                              checked={value}
                              onPress={()=> onChange(!value)}
                              checkedColor={"#000"}
                              style={{marginBottom: 0}}
                    />
                )
                } name={"section1_question2_answer_yes"} control={control} defaultValue={""}
                />
                <Controller render={({field: {onChange,onBlur,value},fieldState}) => (
                    <CheckBox title={"No"}
                              checked={value}
                              onPress={()=> onChange(!value)}
                              checkedColor={"#000"} style={{marginTop: 0}}
                    />
                )
                } name={"section1_question2_answer_no"} control={control} defaultValue={""}

                />
                <Controller render={({field: {onChange,onBlur,value},fieldState}) => (
                    <CheckBox title={"N/A"}
                              checked={value}
                              onPress={()=> onChange(!value)}
                              checkedColor={"#000"} style={{marginTop: 0}}
                    />
                )
                } name={"section1_question2_answer_na"} control={control} defaultValue={""}

                />

                <Controller render={({field:{onChange,value}})=>(
                    <Input
                        multiline={true}
                        numberOfLines={4}
                        placeholder={"Notas"}
                        onChangeText={value => onChange(value)}
                    />
                )} name={"section1_question2_answer_notes"} control={control} defaultValue={""} />

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
            </View>
        </ScrollView>

    )
}
