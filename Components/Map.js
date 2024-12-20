import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text} from 'react-native'; // StyleSheet ekledik
import MapView, { Marker } from 'react-native-maps';
import Colors from './Colors';

const Map = ({ location, city }) => {
 if (!location) {
    return null;
}
const [selectedLocation, setSelectedLocation] = useState(null);

const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
};

  useEffect(() => {
    if (location) {
      setSelectedLocation(location);
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        onPress={handleMapPress}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.4922,
          longitudeDelta: 0.5421,
        }}
        
      >
           {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            title={city}
            
            />
        )}
      </MapView>
    </View>
  );
};
   


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250,
    position: 'absolute',
    top: 556,
    left:22,
    borderColor: Colors.blue,
    borderWidth: 2,
    marginBottom: 20, // Yeni ekledik, haritanın altındaki boşluk için
  },
});

export default Map;
