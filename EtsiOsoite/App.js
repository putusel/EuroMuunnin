import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Button, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {

  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ latitude: 60.200692, longitude: 24.934302, latitudeDelta: 0.0322, longitudeDelta: 0.0221});

  const apikey = '9CZ5yt0C4TcCgBMqY6HffGPrdansAJrG';
  const url = 'http://www.mapquestapi.com/geocoding/v1/address?'
 
  const getLocation = async () => {
    try{
      const response = await fetch(`${url}key=${apikey}&location=${location}`);
      const data = await response.json();

      let coordinate = {
        latitude: data.results[0].locations[0].latLng.lat,
        longitude: data.results[0].locations[0].latLng.lng,
        latitudeDelta: 0.0322, /*starting point Haaga-Helia*/
        longitudeDelta: 0.0221} /*starting point Haaga-Helia*/
  
      setCoordinates(coordinate)


    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <MapView  style={styles.map}   
        region={coordinates}>
        <Marker
          coordinate={coordinates}
          title={location} />
        </MapView>
      <View>
        <TextInput placeholder="enter a location" style={styles.input} onChangeText={text => setLocation(location)}/>
        <View style={{ width:Dimensions.get("window").width * 1.0, flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
          <Button onPress={getLocation}title="Show"></Button>
        </View>
      </View>
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
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  input: {
    borderWidth: 1,
    height: 40,
    
    justifyContent: 'center'
  }
});
