import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {CheckBox, useTheme} from '@rneui/themed';


export default function App() {
    const { theme, updateTheme } = useTheme();
    const [checked, setChecked] = React.useState(true);
    const toggleCheckbox = () => setChecked(!checked);
    return (
    <View style={{backgroundColor: theme.colors.primary,
        justifyContent: 'center',
                flex:1}}>
      <Text>Open up App.js to start working on your app! que hay</Text>
      <View>
      <CheckBox title="Label"
                iconType="material-community"
                uncheckedIcon="checkbox-blank-outline"
                checked={checked}
                checkedIcon="checkbox-marked"
                onPress={toggleCheckbox}
                checkedColor="blue"
                titleProps={{style: {color: 'blue'}}}

      />
      <CheckBox checked disabled title="Label" />
      </View>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
