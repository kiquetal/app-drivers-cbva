import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import QuestionariesScreen from "./QuestionariesScreen";
import DetailQuestionary from "./DetailQuestionary";

export default QuestionaryStack = (props) =>  {
    const { navigation } = props;
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Questionaries" component={QuestionariesScreen} />
            <Stack.Screen name="DetailQuestionary" component={DetailQuestionary} />
        </Stack.Navigator>

    )
}
