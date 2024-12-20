import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Components/Colors';
import { getWeatherData } from '../Components/weatherApi';
import { useCity } from '../Components/cityContext';
import Map from '../Components/Map';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { storeCity, deleteCity } from '../Components/http';

const MenuScreen = () => {
  const navigation = useNavigation();
  const [city, setCity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [location, setLocation] = useState(null);
  const { cityList, setCityList } = useCity();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getCitiesFromStorage();
    }
  }, [isFocused]);

  const getCitiesFromStorage = async () => {
    try {
      const citiesJSON = await AsyncStorage.getItem('cities');
      if (citiesJSON !== null) {
        const cities = JSON.parse(citiesJSON);
        setCityList(cities);
      }
    } catch (error) {
      console.error('Error fetching cities from storage:', error);
    }
  };

  const saveCitiesToStorage = async (cities) => {
    try {
      const citiesJSON = JSON.stringify(cities);
      await AsyncStorage.setItem('cities', citiesJSON);
    } catch (error) {
      console.error('Error saving cities to storage:', error);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const addCity = async () => {
    if (city.trim() !== '') {
      const lowercaseCity = city.toLowerCase();
      const isValid = await isValidCity(lowercaseCity);
      if (isValid && !cityList.some(item => item.name.toLowerCase() === lowercaseCity)) {
        try {
          const id = await storeCity(lowercaseCity);
          const updatedCityList = [...cityList, { id, name: city }];
          setCityList(updatedCityList);
          setCity('');
          setErrorMessage('');
          await saveCitiesToStorage(updatedCityList);
        } catch (error) {
          console.error('Error adding city:', error);
        }
      } else {
        if (!isValid) {
          setErrorMessage('Geçerli bir şehir girin.');
        } else {
          setErrorMessage('Bu şehir zaten listeye eklenmiş.');
        }
      }
    }
  };

  const isValidCity = async (city) => {
    const data = await getWeatherData(city);
    if (data) {
      const { coord } = data;
      setLocation({ latitude: coord.lat, longitude: coord.lon });
    }
    return data !== null;
  };

  const removeCity = async (index, city) => {
    const newCityList = cityList.filter((item, idx) => idx !== index);
    setCityList(newCityList);
    try {
      await deleteCity(city.id);
      await saveCitiesToStorage(newCityList);
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  const renderCityItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleCityPress(item.name)}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: Colors.secondary }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>{item.name}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Anasayfa', { city: item.name })}>
            <Text style={{ color: 'blue', textDecorationLine: 'none', marginRight: 10 }}>Git</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeCity(index, item)}>
            <Text style={{ color: 'red', textDecorationLine: 'none' }}>Sil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleCityPress = async (cityName) => {
    const lowercaseCity = cityName.toLowerCase();
    const data = await getWeatherData(lowercaseCity);
    if (data) {
      const { coord } = data;
      setLocation({ latitude: coord.lat, longitude: coord.lon });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <Image source={require('../resim/arkaplan.jpeg')} style={{ position: 'absolute', width: '100%', height: '100%', resizeMode: 'cover' }} />
      <View style={{ flex: 1, padding: 20, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        <Text style={{ fontSize: 30, marginBottom: 20, marginTop: 150, fontWeight: 'bold' }}>Şehir Ekleme</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder="Şehir adını girin..."
            value={city}
            onChangeText={(text) => setCity(text)}
            style={{ borderWidth: 1, borderColor: Colors.secondary, padding: 10, flex: 1 }}
          />
          <Button title="Ekle" onPress={addCity} />
        </View>
        {errorMessage !== '' && <Text style={{ color: 'red', marginTop: 10 }}>{errorMessage}</Text>}

        <FlatList
          data={cityList}
          renderItem={renderCityItem}
          keyExtractor={(item, index) => index.toString()}
          style={{ marginTop: 20 }}
        />

        <Map location={location} city={city} />

        <Button title="Geri Dön" onPress={goBack} style={{ marginTop: 20 }} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default MenuScreen;
