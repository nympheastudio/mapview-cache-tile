import React, { useState } from 'react';
//import MapView, {UrlTile,  Marker } from 'react-native-maps';
import MapView from 'react-native-map-markerclustering';
import {UrlTile,  Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function App() {

  const [urlTemplate, setUrlTemplate] = useState('https://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png');
  const [region, setRegion]= useState({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    const [mapRegion, setmapRegion] = useState({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  
    function renderRandomMarkers(n) {
      const { latitude, longitude, latitudeDelta, longitudeDelta } = mapRegion;
      return new Array(n).fill().map((x, i) => (
        <Marker
          key={i}
          coordinate={{
            latitude: latitude + (Math.random() - 0.5) * latitudeDelta,
            longitude: longitude + (Math.random() - 0.5) * longitudeDelta
          }}
        />
      ));
    }


  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
    //  mapType={Platform.OS == "android" ? "none" : "standard"}
      region={region}
     // onRegionChange={setRegion(region)}
    
      >
        <Marker coordinate={mapRegion} title='Marker' />
        {renderRandomMarkers(14)}
     <UrlTile
            urlTemplate={urlTemplate}
           //maximumZ={19}
             tileCachePath={`${FileSystem.documentDirectory}tiles/5dem_grid/`}
          /></MapView>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});