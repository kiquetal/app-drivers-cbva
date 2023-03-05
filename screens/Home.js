import * as React from 'react';
import { Text, View } from 'react-native';
import {Button} from "@rneui/base";
import {AuthContext} from "../contexts/AuthContext";
const Home = (props) =>  {

    const { navigation } = props;

    const { state, authContext } = React.useContext(AuthContext);
    return (
        <View>
            <Text>Welcome {state.user} </Text>
            <Button title={'Questionaries'}
             onPress={()=> navigation.navigate('Questionaries')}></Button>
            <Button title={'Sign out'}
                    onPress={()=> authContext.signOut()}></Button>
            <Button title={'FormQuestions'}
                    onPress={()=> navigation.navigate('FormQuestions')}></Button>
        </View>


    )
}

export default Home
