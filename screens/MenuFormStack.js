import * as React from 'react';
import FormQuestionsScreen from "./FormQuestionsScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import FormSelectionScreen from "./FormSelectionScreen";


export default MenuForm = (props) => {
    const { navigation } = props;
    const Stack = createNativeStackNavigator();

    return (
      <Stack.Navigator>
            <Stack.Screen name="FormSelection" component={FormSelectionScreen}   options={({route})=>( {title:'FormSelection'})} />
            <Stack.Screen name="FormQuestionsOpeartors" component={FormQuestionsScreen} options={({route})=>( {title: `Operadores de móviles `})}/>
      </Stack.Navigator>
    )
}
