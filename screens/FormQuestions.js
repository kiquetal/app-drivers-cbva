import * as React from 'react';
import {ScrollView, View} from "react-native";
import {Button, Input, Text} from "@rneui/base";
import { useForm, Controller} from "react-hook-form";
import {CheckBox} from "@rneui/themed";

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
    }

    return (
        <ScrollView>
            <View >
            <Text>Question 1</Text>
         <Controller render={({field: {onChange,onBlur,value},fieldState}) => (
                <CheckBox title={"Yes"}
                 checked={value}
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
                          checkedColor={"#000"} style={{marginTop: 0}}
                />
            )
            } name={"section1_question1_answer_no"} control={control} defaultValue={""}

            />
                <Controller render={({field: {onChange,onBlur,value},fieldState}) => (
                    <CheckBox title={"N/A"}
                              checked={value}
                              onPress={()=> onChange(!value)}
                              checkedColor={"#000"} style={{marginTop: 0}}
                    />
                )
                } name={"section1_question1_answer_na"} control={control} defaultValue={""}

                />
            <Controller render={({field:{onChange,value}})=>(
                <Input
                multiline={true}
                    numberOfLines={4}
                    placeholder={"Notas"}
                 onChangeText={value => onChange(value)}
                />
            )} name={"section1_question1_answer_notes"} control={control} defaultValue={""} />

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
