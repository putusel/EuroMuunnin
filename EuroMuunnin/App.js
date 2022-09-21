import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Dimensions } from 'react-native';
import { Picker } from '@react-native-community/picker';

export default function App() {

const [text, setText] = useState('');
const [amount, setAmount] = useState('');
const [selectedCur, setSelectedValue] = useState('');
const [repositories, setRepositories] = useState([]);
const [result, setData] = useState('');

const myHeaders = new Headers ();
  myHeaders.append('apikey', 'muF343IbJw68a5rHGbyIikEVfOEcMtaU');

{getRepositories} 

const requestOptions = {
  
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

  const getRepositories = () => {  
    fetch(`https://api.apilayer.com/currency_data/list`, requestOptions)  
    .then(response => response.json())  
    .then(data => setRepositories(data.currencies)) 
    .catch(error => {         
      Alert.alert('Error', error);   
});
  }
  const getAmount = () => {  
    const request = `https://api.apilayer.com/currency_data/live?source=EUR&currencies=`+{selectedCur}
    fetch(request, requestOptions)  
    .then(response => response.json())  
    .then(data => setAmount(amount))
    const result = Number(amount) * Number(text)
    setData(result)
    .catch(error => {         
      Alert.alert('Error', error);
    });
};
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: 'https://thumbs.dreamstime.com/z/two-euro-coin-white-background-standing-some-other-coins-56309229.jpg'}} />
      <Text style={styles.text}> {result} € </Text>
      
      <TextInput 
        style={{ fontSize:16, width:60}} 
        keyboardType={'numeric'}
        onChangeText={text => setText(text) } />
      <Picker
        selectedValue={selectedCur}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        {Object.keys(repositories).map((key) =>
        <Picker.Item 
          label={key}
          value={key}
          key={key}
        />)}
      </Picker> 
      <View style={{ flexDirection: 'row', width:Dimensions.get("window").width * 0.9,  justifyContent: 'center', marginTop: 5}}>
        <Button title="CONVERT"onPress= {getAmount} />
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
