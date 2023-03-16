import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../contexts/AuthContext';

const Home = (props) => {
    const { navigation } = props;

    const { state, authContext } = React.useContext(AuthContext);
    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center' ,marginBottom:10}}>
            <Icon name={'cloud'}  size={60} color={'#437ec2'}  />
                <Text style={styles.title}>Welcome, {state.user}!</Text>

            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title={'Ver Cuestionarios completados'}
                    onPress={() =>
                        navigation.navigate('QuestionariesStack', {
                            screen: 'Questionaries',
                        })
                    }
                    icon={
                        <Icon
                            name="file-text-o"
                            color="#FFFFFF"
                            size={18}
                            style={styles.icon}
                        />
                    }
                    style={[styles.button]}
                />

                <Button
                    title={'Completar Cuestionario'}
                    onPress={() => navigation.navigate('FormQuestions')}
                    icon={
                        <Icon
                            name="edit"
                            color="#FFFFFF"
                            size={18}
                            style={styles.icon}
                        />
                    }
                    style={[styles.button]}
                />
                <Button
                    title={'Salir'}
                    onPress={() => authContext.signOut()}
                    icon={
                        <Icon
                            name="sign-out"
                            color="#FFFFFF"
                            size={18}
                            style={styles.icon}
                        />
                    }
                    style={[styles.button, styles.signOutButton]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems:'stretch',

    },
    button: {
        marginHorizontal: 10,
        marginVertical: 5,
        paddingHorizontal: 40,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',


    },

    signOutButton: {
        backgroundColor: '#FF0000',
    },

    icon: {
        marginRight: 8,
    },
});

export default Home;
