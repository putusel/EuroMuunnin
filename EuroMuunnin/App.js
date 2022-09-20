import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Dimensions } from 'react-native';
import { Picker } from '@react-native-community/picker';

export default function App() {

const [amount, setAmount] = useState('');
const [selectedValue, setSelectedValue] = useState('');

const [repositories, setRepositories] = useState([]);

const myHeaders = new Headers ();
myHeaders.append('apikey', 'bIUfEIuOL4Io2x2Ide0FsjIBOMkzEAor');

const requestOptions = {
  
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

  const getRepositories = () => {  
    fetch(`https://api.apilayer.com/currency_data/list`)  
    .then(response => response.json())  
    .then(data => setRepositories(data.currencies))  
    .catch(error => {         
        Alert.alert('Error', error);   
  });
  }
  const getAmount = () => {  
    fetch(`https://api.apilayer.com/currency_data/list`, requestOptions)  
    .then(response => response.json())  
    .then(data => setRepositories(data.currencies))  
    .catch(error => {         
        Alert.alert('Error', error);   
    });
}
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: 'https://thumbs.dreamstime.com/z/two-euro-coin-white-background-standing-some-other-coins-56309229.jpg'}} />
      <Text style={styles.text}> € </Text>
      {getRepositories}
      
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>

        { repositories.map((item, key)=>(
        <Picker.Item label={item} value={item} key={key} />)
        )}
        
      </Picker>
      <TextInput 
        style={{fontSize:16, width:60, borderColor: 'gray', borderWidth: 1.0, justifyContent: 'center', marginLeft:5}} 
        onChangeText={text => setKeyword(text) } />
      <View style={{ width:Dimensions.get("window").width * 0.9, flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
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
