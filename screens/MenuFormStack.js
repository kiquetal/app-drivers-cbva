import * as React from 'react';
import FormQuestionsScreen from "./FormQuestionsScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import FormSelectionScreen from "./FormSelectionScreen";
import FormOperatorStack from "./FormOperatorStack";
import FormMovimientoMovilScreen from "./FormMovimientoMovilScreen";


export default MenuForm = (props) => {
    const { navigation } = props;
    const Stack = createNativeStackNavigator();

    return (
      <Stack.Navigator>
            <Stack.Screen name="FormSelection" component={FormSelectionScreen}   options={({route})=>( {title:'Formularios '})} />
            <Stack.Screen name="FormQuestionsOpeartors" component={FormQuestionsScreen} options={({route})=>( {title: `Operadores de móviles `})}/>
            <Stack.Screen name="FormOperatorStack" component={FormOperatorStack} options={{headerShown:false}}/>
            <Stack.Screen name="MovimientoMovil" component={FormMovimientoMovilScreen} options={({route})=>( {title: `Movimiento de móviles `})}/>
      </Stack.Navigator>
    )
}
