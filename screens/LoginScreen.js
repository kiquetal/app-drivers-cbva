import * as React from 'react';

import { AuthContext } from '../contexts/AuthContext';
import {View, Text} from "react-native";
import {Button, Input} from "@rneui/themed";
import {useTheme} from "@rneui/themed";

export default LoginScreen = (props) => {

   const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
  const { authContext , state} = React.useContext(AuthContext);


  const { theme, updateTheme } = useTheme();



  return (
    <View>
        { state.error && <><Text style={{color:'red',
                                    alignContent:'center'}} >{state.error}</Text>
            <Text>some</Text>
        </>}
      <Input style={{color:'black'}} placeholder={'Email'} onChangeText={(text)=> setEmail(text)}   />
      <Input  style={{color:'black'}} placeholder={'Password'}  onChangeText={(text)=>setPassword(text)} secureTextEntry={true}/>
      <Button
        title={'Sign in'}
        onPress={() => authContext.signIn({
            email: email,
            password: password
        })}
      />
    </View>
  );

}
