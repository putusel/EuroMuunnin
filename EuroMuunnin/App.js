import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Dimensions } from 'react-native';
import { Picker } from '@react-native-community/picker';

export default function App() {

const [amount, setAmount] = useState('');
const [apiKey, setApiKey] = useState('bIUfEIuOL4Io2x2Ide0FsjIBOMkzEAor');
const [selectedValue, setSelectedValue] = useState('');
const [repositories, setRepositories] = useState([]);

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: apiKey
};

const getRepositories = () => {  
  fetch(`"https://api.apilayer.com/currency_data/list`)  
  .then(response => response.json())  
  .then(data => setRepositories(data.meals))  
  .catch(error => {         
        Alert.alert('Error', error);   
  });
}
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: 'https://thumbs.dreamstime.com/z/two-euro-coin-white-background-standing-some-other-coins-56309229.jpg'}} />
      <Text style={styles.text}> € </Text>
      
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
      
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      <View style={{ width:Dimensions.get("window").width * 0.9, flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
      <Button title="CONVERT"onPress= {getRepositories} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image : {
    width: 250,
    height: 100,
    marginTop: 10,
    marginBottom: 10,
  },
  text : {
    fontSize: 20,
  },
});
