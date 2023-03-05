import * as React from 'react';

import { AuthContext } from '../contexts/AuthContext';
import {View, Text} from "react-native";
import {Button, Input} from "@rneui/base";
import {useTheme} from "@rneui/themed";
import {useEffect} from "react";

export default LoginScreen = (props) => {

   const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
  const { authContext , state} = React.useContext(AuthContext);


  const { theme, updateTheme } = useTheme();
  return (
    <View>
        {console.log(`my message ${state.error}`)}
      <Input theme={theme} placeholder={'Email'} onChangeText={(text)=> setEmail(text)}  />
      <Input theme={theme} placeholder={'Password'}  onChangeText={(text)=>setPassword(text)} secureTextEntry={true}/>
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
