import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FormQuestionsScreen from "./FormQuestionsScreen";
import FormSelectionMobile from "./FormSelectionMobile";
export default FormOperatorStack = (props) => {
    const { navigation } = props;
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="FormSelectionMobile" component={FormSelectionMobile}   options={({route})=>( {title:'Formularios '})} />
            <Stack.Screen name="FormQuestionsOpeartors" component={FormQuestionsScreen} options={({route})=>( {title: `Operadores de móviles `})}/>
        </Stack.Navigator>
    )
}
