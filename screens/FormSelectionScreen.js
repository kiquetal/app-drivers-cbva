import * as React from 'react';
import {Button} from "@rneui/themed";
import {View,Text} from "react-native";
import Icon from "react-native-vector-icons";
import {useState} from "react";

export default function FormSelectionScreen(props) {
    const { navigation } = props;
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOption1Press = () => setSelectedOption('option1');
    const handleOption2Press = () => setSelectedOption('option2');

    return (
        <View style={{ flexDirection: 'column', justifyContent: 'center', margin: 10 , alignItems:'flex-start',flexGrow:1}}>
            <Button
                style={{
                    backgroundColor: selectedOption === 'option1' ? '#437ec2' : 'white',
                    borderColor: '#437ec2',
                    borderWidth: 1,
                    width: 200,
                    marginBottom:20
                }}
                onPress={handleOption1Press}
            >
                <Icon name="gear" size={100} color={ 'white'} style={{marginBottom:10}} />
            </Button>
            <Button
                style={{
                    backgroundColor: selectedOption === 'option2' ? '#437ec2' : 'white',
                    borderColor: '#437ec2',
                    borderWidth: 1,
                }}
                onPress={handleOption2Press}
                title={'Option 2'}
                titleStyle={'black'}
                buttonStyle={{width: 200,color:'black'}}
            >
                <Icon name="car" size={100} color={'white'} />
            </Button>
        </View>
    );

}
