import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
const { width } = Dimensions.get("window");
import { AuthContext} from "./contexts/AuthContext";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "./screens/Home";
import * as SecureStore from "expo-secure-store";
import LoginScreen from "./screens/LoginScreen";
import {supabase} from "./lib/supabase";
import FormQuestions from "./screens/FormQuestionsScreen";
import QuestionariesScreen from "./screens/QuestionariesScreen";
import QuestionaryScreenStack from "./screens/QuestionaryStack";
const Stack = createNativeStackNavigator();

export default function App() {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                        error:null
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                        error:null,
                        user:action.user
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                        error:null
                    };
               case 'ERROR_LOGIN':
                    return {
                        ...prevState,
                        error: action.error,
                        isLoading: false,

                    }
                case 'IDENTITY':
                    return {
                        ...state,
                        userToken: action.userToken,

                    }
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
            error:null,
            user:''
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;


            try {
                userToken = await SecureStore.getItemAsync('userToken');
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
         //   dispatch({"type":"IDENTITY", userToken:"a"})
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                console.log("signIn called")
                 let {data: user, error} = await supabase.auth.signInWithPassword({
                    email: data.email,
                    password: data.password
                });
                if (error) {
                    console.log(`error credentials`,error);
                    dispatch({type:'ERROR_LOGIN', error:error.message.toString()});
                }
                else
                    dispatch({ type: 'SIGN_IN', token: user.session.access_token ,  user: user.user.email});
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async (data) => {
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },

        }),
        []
    );



    return (
        <AuthContext.Provider value={ {authContext, state} } >
              <NavigationContainer>
                <Stack.Navigator id={"Parent"}>
                    { console.log(`state-navigator`,state.userToken)}
                    { state.userToken == null ? (
                         <Stack.Screen name={"Login"} component={LoginScreen}   options={{ headerShown: true }} />

                    ):( <>
                        <Stack.Screen name={"Home"} component={HomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name={"QuestionariesStack"} component={QuestionaryScreenStack} options={{ headerShown: false }} />
                         <Stack.Screen name={"FormQuestions"} component={FormQuestions} options={{ headerShown: true }} />
                        </>
                        )}

                </Stack.Navigator>
              </NavigationContainer>
            </AuthContext.Provider>

  );
}
const styles = StyleSheet.create({
    subHeader: {
        backgroundColor : "#2089dc",
        color : "white",
        textAlign : "center",
        paddingVertical : 7,
        marginBottom : 10
    },
    horizontal: {
        marginBottom: 6,
    },
    horizontalText: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 10,
    },
    vertical: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
            { translateY: -90 }],
        height: 180,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    textInput: {
        width: "80%",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
    },
});
