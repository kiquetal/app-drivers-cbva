import * as React from 'react';
import { Text, View } from 'react-native';
import {Controller} from "react-hook-form";
import {CheckBox} from "@rneui/base";
import {Input} from "@rneui/base";


export default Question = (props) =>  {

        const { navigation } = props;

        return (
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
                    } name={`${props.section}_${props.question}_answer_yes`} control={props.control} defaultValue={""}
                    />
                    <Controller render={({field: {onChange,onBlur,value},fieldState}) => (
                        <CheckBox title={"No"}
                                  checked={value}
                                  onPress={()=> onChange(!value)}
                                  height={50}
                                  checkedColor={"#000"} style={{marginTop: 0}}
                        />
                    )
                    } name={`${props.section}_${props.question}_answer_no`}  control={props.control} defaultValue={""}

                    />
                    <Controller render={({field: {onChange,onBlur,value},fieldState}) => (
                        <CheckBox title={"N/A"}
                                  height={50}
                                  checked={value}
                                  onPress={()=> onChange(!value)}
                                  checkedColor={"#000"} style={{marginTop: 0}}
                        />
                    )
                    } name={`${props.section}_${props.question}_answer_na`} control={props.control} defaultValue={""}

                    />
                </View>
                <Controller render={({field:{onChange,value}})=>(
                    <Input
                        multiline={true}
                        numberOfLines={1}
                        placeholder={"Notas"}
                        onChangeText={value => onChange(value)}
                    />
                )} name={`${props.section}_${props.question}_answer_notes`} control={props.control} defaultValue={""} />
            </View>
        );
}
