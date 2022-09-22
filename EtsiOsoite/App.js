import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, Button, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [text, setText] = useState('');
  const [location, setLocation] = useState(null); // State where location is saved
  const [coordinates, setCoordinates] = useState({latitude: 60.200692, longitude: 24.934302, latitudeDelta: 0.0322, longitudeDelta: 0.0221});

  const apikey = '9CZ5yt0C4TcCgBMqY6HffGPrdansAJrG';

  
  const getLocation = () => {  
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${apikey}Y&location${text}`)  
    .then(response => response.json())  
    .then(data => {data})  
    let coordinate = 
    {latitude: data.results[0].locations[0].latLng.lat,
    longitude: data.results[0].locations[0].latLng.lng, 
    latitudeDelta: 0.0322, 
    longitudeDelta: 0.0221}
    setCoordinates(coordinate)
    .catch(error => {         
          Alert.alert('Error', error);   
    });
  }

  useEffect(() => { getLocation(); }, [])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={coordinates}
      >
        <Marker
          coordinate={coordinates}
          title='Haaga-Helia'
        />
      </MapView>
      <TextInput 
          style={styles.input} 
          placeholder="enter a location"
          onChangeText={text => setText(text)} value={text}
        />
      <Button onPress={getLocation}title="Show"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  input : {
    
    fontSize: 20,
  },
});
