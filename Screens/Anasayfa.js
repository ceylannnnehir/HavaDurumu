import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Colors from '../Components/Colors';
import Title from '../Components/title';
import { getWeatherData } from '../Components/weatherApi';
import { unixTimestampToDateTime, unixTimestampToDateDay } from '../Components/unixtotime';
import { showWeatherIcon } from '../Components/weatherIcon';
import { useCity } from '../Components/cityContext';


const Anasayfa = () => {
  const { selectedCity } = useCity(); /*// anasayfaya gidince seçili olan sehir bilgileri gösterir.....*/
  const navigation = useNavigation();
  const route = useRoute();
  const cityFromMenu = route.params?.city;

  const [city, setCity] = useState(cityFromMenu || '');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);


  const navigateToMenu = () => {
    navigation.navigate('MenuScreen');
  };

const navigateToLogin = () => {
  navigation.navigate('LoginScreen');
  };

  useEffect(() => {
    if (cityFromMenu) {
      fetchWeatherData(cityFromMenu);
    } else {
      fetchWeatherData('Ankara'); // İlk açıldığında Ankara'nın bilgilerini al
    }
  }, [cityFromMenu]);

 

  const fetchWeatherData = async (city) => {
    try {
      const data = await getWeatherData(city);
      setWeather(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Veri alınırken bir hata oluştu.');
    }
  };

  const handleCitySubmit = () => {
    if (city) {
      fetchWeatherData(city);
      setCity(''); // textinput ara tuşuna basıldıktan sonra temizle..
    } else {
      setError('Lütfen bir şehir adı girin.');
    }
  };

  const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
  
  // Rastgele yüzde değeri oluşturma fonksiyonu
  const randomPercentage = () => {
    return Math.floor(Math.random() * (100 - 10) + 10); // 10 ile 100 arasında rastgele bir değer üretir
  };

  // Her gün için bir resim eşleştirmesi
  const dayImages = {
    'Pazartesi': require('../resim/01d.png'),
    'Salı': require('../resim/03d.png'),
    'Çarşamba': require('../resim/09n.png'),
    'Perşembe': require('../resim/01d.png'),
    'Cuma': require('../resim/09n.png'),
    'Cumartesi': require('../resim/01d.png'),
    'Pazar': require('../resim/03d.png'),
  };

const randomTemperature = (index) => {
  let temperature;
  if (index >= 0 && index <= 5) {
    // Gece saatleri
    temperature = 5 - Math.abs(index - 3);
  } else if (index >= 6 && index <= 12) {
    // Sabah saatleri
    temperature = 6 + Math.abs(index - 3);
  } else if (index >= 13 && index <= 16) {
    // Öğleden sonra saatleri
    temperature = 20 - (index - 13);
  } else if (index >= 17 && index <= 21) {
    // Akşam saatleri
    temperature = 15 - (index - 17);
  } else {
    // Gece saatleri (tekrar)
    temperature = 8 - Math.abs(index - 22);
  }

  return temperature;
};

const kutuno = () => {
  const boxes = [];
  const boxSize = 5;
  const columns = 23;
  const rows = 1;
  for (let i = 1; i <= rows; i++) {
    for (let j = 0; j <= columns; j++) {
      const index = j;
      boxes.push(
        <View key={index} style={[
          styles.kutu1,
          {
            left: j - boxSize,
            alignItems: "center",
            justifyContent: "center",
          },
          styles.img,
          {
            left: 1,
            
          }
        ]}>
          <Text style={styles.saatler}>
            {index === 24 ? '00:00' : (index < 10 ? `0${index}:00` : `${index}:00`)}
          </Text>
          <Image
            style={styles.img}
            source={
              index >= 0 && index <= 5 ? require('../resim/09n.png') :
              index >= 12 && index <= 16 ? require('../resim/04d.png') :
              index >= 22 && index < 24 ? require('../resim/01d.png') :
              require('../resim/01d.png')
            }
          />
          <Text style={styles.boxText}>
            {randomTemperature(index)}°
          </Text>
        </View>
      );
    }
  }
  return boxes;
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
      <Text>{selectedCity}</Text>
      <TouchableOpacity style={styles.menuIcon} >
        <Icon name="bars" size={25} color={Colors.white} title="Menu'ye Git" onPress={navigateToMenu}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileIcon} >
        <Icon name="sign-out" size={40} color={Colors.white} title="Giriş Sayfasına Git" onPress={navigateToLogin}/>
      </TouchableOpacity>
      

      <Title style={styles.title}>Hava Durumu</Title>
      <View style = {{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"center",
      }}>
         <TextInput
        style={styles.input}
        placeholder="Şehir adı giriniz..."
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <TouchableOpacity 
        onPress={handleCitySubmit} 
        style={{
          marginLeft: 10,
          marginTop: -17,
          padding: 10,
          color:Colors.blue, // Buton rengi
          borderRadius: 5, // Buton köşe yuvarlama
        }}>
        <Text style={{ color: 'white' }}>ARA</Text>
      </TouchableOpacity>
      </View>
     
      
      <TouchableOpacity style={styles.locationIcon} >
        <Icon name="map-marker" size={30} color={Colors.red} />
      </TouchableOpacity>
      {weather && (
        <View>
          <Text style={styles.locationText}>{weather.name}</Text>
          <Text style={styles.weatherType}>{weather.weather[0].description}</Text>
          <Icon name="tint" size={20} color={Colors.white} style={styles.tintIcon}> % {weather.main.humidity}</Icon>
          <MaterialIcon name="weather-windy" size={50} color={Colors.black} style={styles.windIcon}> {weather.wind.speed} km/h</MaterialIcon>
          {/* resim eklenecek .......................................................*/}
          <Image source={showWeatherIcon(weather.weather[0].icon)} style={styles.sunIcon} />
          <Text style={styles.temperatureText}>{Math.round(weather.main.temp)} °C</Text>
          <Text style={styles.feltTemperature}>Hissedilen:{(weather.main.feels_like).toFixed(1)} °C</Text>
          <Text style={styles.date}>Tarih:{unixTimestampToDateDay(weather.sys.sunrise)} </Text>
        </View>
      )}     
   
      <Text style={styles.text}>Saatlik Hava Durumu Tahmini</Text>
      
      <View style={styles.transparentBox}>
       <ScrollView horizontal={true} style={styles.scrollView}>
          {kutuno()}
       </ScrollView>
      </View> 
      
      <Text style={styles.text3}>Haftalık Hava Durumu</Text>
      <View style={styles.transparentBox2}>
      {days.map((day, index) => {
        const minDegree = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
        const maxDegree = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
        return(
            <View key={index} style={styles.dayContainer}>
              <Text style={styles.weeklyText}>{day}</Text>
              <View style={styles.iconTextContainer}>
                <Icon name="tint" size={20} color={Colors.white} style={styles.weeklyText} />
                <Text style={styles.weeklyText}>%{randomPercentage()}</Text>
                <Image source={dayImages[day]} style={styles.weeklyImage} />

              </View>
                          
              <View style={styles.degreesContainer}>
                <Text style={styles.maxWeeklyDegrees}>{maxDegree}°   </Text>
                <Text style={styles.minWeeklyDegrees}>{minDegree}°</Text>
              </View>
            </View>
            );
        })} 
      </View>
      {weather && (
        <View>
           <View style={styles.transparentBox3}>
            <Text style={styles.sunriseText}>Gün Doğumu</Text>
            <Image source={require('../resim/sunrise.png')} style={styles.sunrise}></Image>
            <Text style={styles.sunriseTime}>{unixTimestampToDateTime(weather.sys.sunrise)}</Text>
      
          <View style={styles.transparentBox4}>
            <Text style={styles.sunsetText}>Gün Batımı</Text>
            <Image source={require('../resim/sunset.png')} style={styles.sunset}></Image>
            <Text style={styles.sunsetTime}>{unixTimestampToDateTime(weather.sys.sunset)}</Text>
          </View>
      </View>
        </View>
      )}
     

      <View style={styles.transparentBox5}>
        <Text style={styles.weathText}>UV endeksi</Text> 
        <Text style={styles.weathText1}>Düşük</Text>
        <Image source={require('../resim/weather.png')} style={styles.weath}></Image>
      </View>

      <View style={styles.transparentBox6}>
      <Text style={styles.moonText}>Dolunay</Text>
        <Image source={require('../resim/full-moon.png')} style={styles.moon}></Image>
        <Text style={styles.moonTime1}>Ay batımı</Text>
        <Text style={styles.moonTime1_1}>06:03</Text>
        <Text style={styles.moonTime2}>Ay doğumu</Text>
        <Text style={styles.moonTime2_1}>17:55</Text>
      </View>

      <Text style={styles.end}>The Weather App ®</Text>
      </View>

    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop:-155,
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  content:{
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow:1,
  },
  
  title: {
    fontSize: 24,
    marginTop: 20, // Başlık metni ile üst boşluk
    marginLeft: 20, // Başlık metni ile sol boşluk
    color: Colors.white,
    marginTop: -30,
    marginBottom: 20,
    marginLeft: -150,
  },
  input: {
  
    width: 320,
    height: 40,
    marginLeft: 5,
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 30,
    marginBottom: 20,
    backgroundColor: Colors.white,
  },
  
  animation: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  sunIcon: {
    marginTop: -140,
    marginRight: -200,
    width:160,
    height:160,
  },
  menuIcon: {
    marginTop: 55,
    marginLeft: -350,
    
  },
  locationIcon: {
    
    marginTop: 20,
    marginLeft: -305,
  },
  locationText: {
    marginTop:-30,
    marginBottom: 20,
    marginLeft:-130,
    fontSize: 22,
    color: Colors.white,
  },
 
  temperatureText:{
    
    marginTop: -15,
    marginRight: -205,
    marginLeft: 50,
    fontWeight:'bold',
    color: Colors.white,
    fontSize:20,
  },
  feltTemperature:{
    
    marginTop: -30,
    marginLeft: -160,
    marginBottom:40,
    color: Colors.white,
    fontSize:15,
  },
  date:{
    
    marginTop: -40,
    marginLeft: -160,
    marginBottom:40,
    color: Colors.white,
    fontSize:15,
  },
  weatherType:{
   
    marginTop: -10,
    marginLeft: -160,
    marginBottom:10,
    color: Colors.white,
    fontSize:20,
  },
  tintIcon: {
  
    marginBottom:10,
    marginLeft: -160,
  },
  
  windIcon:{

  marginLeft: -160,
  marginBottom:10,
  fontSize:22,
  color:Colors.white,
  },
  transparentBox: {
    flex:1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // R, G, B, Alpha (şeffaflık)
    width: 380,
    height: 100,
    borderRadius:15,
   
  },
  text: {
   
    marginBottom:20,
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
    alignItems:"center",
    justifyContent:"center",
  },
  scrollView: {
    flex: 1,
    marginVertical: 2,
    flexGrow:1,
    
  },
  
  transparentBox2:{
    marginTop: 20,
    width:380,
    height:380,
    backgroundColor:'rgba(255, 255, 255, 0.3)',
    borderRadius:15,
  },
  text3:{
    marginTop: 20,
    fontWeight:"bold",
    fontSize:18,
    color:Colors.white,
   
  },
  weeklyText:{
    fontSize:16,
    color:Colors.white,
    lineHeight:50,
    marginLeft:30,
    top:15,
    fontWeight:"bold",
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconTextContainer: {
    flexDirection:"row",
    alignItems: 'center',
    marginRight:170,
  },
  degreesContainer: {
    position:"absolute",
    flexDirection: 'row',
    alignItems: 'center',
    top:30,
    right:20,
  },
  minWeeklyDegrees: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  maxWeeklyDegrees: {
    position:"absolute",
    right:40,
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  weeklyImage:{
    position:"absolute",
    top:20,
    right:-60,
    width:40,
    height:40,
  },
  kutu1: {
    height: 80,
    alignContent:"flex-start",
    justifyContent:"center",

  },
  boxText:{
    marginTop:-8,
    alignItems:"center",
    justifyContent:"center",
    color: Colors.white,
    fontSize:16,
    fontWeight:"bold",
  },
  saatler:{
    color:Colors.white,
    fontSize:15,
    fontWeight:"bold",
 },
 transparentBox3:{
    marginTop: 20,
    width:180,
    height:185,
    backgroundColor:'rgba(255, 255, 255, 0.3)',
    borderRadius:15,
    right:97,
 },
 sunrise:{
  height:100,
  width:100,
  top:20,
  left:40,
 },
 sunriseText:{
  fontSize:18,
  color:Colors.white,
  fontWeight:"bold",
  top:10,
  left:40,
 },
 sunriseTime:{
  fontSize:18,
  color:Colors.white,
  fontWeight:"bold",
  top:30,
  left:68,
 },
 transparentBox4:{
  marginTop: 20,
  width:180,
  height:185,
  backgroundColor:'rgba(255, 255, 255, 0.3)',
  borderRadius:15,
  right:-194,
  bottom:168,
},
sunset:{
  height:100,
  width:100,
  top:20,
  left:40,
},
sunsetText:{
  fontSize:18,
  color:Colors.white,
  fontWeight:"bold",
  top:10,
  left:45,
},
sunsetTime:{
  fontSize:18,
  color:Colors.white,
  fontWeight:"bold",
  top:30,
  left:68,
},
transparentBox5:{
  marginTop: 20,
  width:380,
  height:100,
  backgroundColor:'rgba(255, 255, 255, 0.3)',
  borderRadius:15,
  right:1,
  alignItems:"center",
},
weath:{
  height:80,
  width:80,
  top: -48 ,
  right: -95,
},
weathText:{
  fontSize:25,
  color:Colors.white,
  fontWeight:"bold",
  top:20,
  left:-85,
},
weathText1:{
  fontSize:20,
  color:Colors.white,
  top:20,
  left:-85,
},
transparentBox6:{
  marginTop: 15,
  width:380,
  height:140,
  backgroundColor:'rgba(255, 255, 255, 0.3)',
  borderRadius:15,
  right:1,
  alignItems:"center",
},
moon:{
  height:80,
  width:80,
  top: -10 ,
  right: 5,
},
moonText:{
   top:100,
   color:Colors.white,
   fontSize:18,
},
moonTime1:{
  top: -58,
  left: -115,
  color:Colors.white,
  fontSize:14,
},
moonTime1_1:{
  top: -62,
  left: -115,
  fontSize:20,
  fontWeight:"bold",
  color:Colors.white,
},

moonTime2:{
  top: -100,
  right: -115,
  color:Colors.white,
  fontSize:14,
},

moonTime2_1:{
  top: -105,
  right: -115,
  fontSize:20,
  fontWeight:"bold",
  color:Colors.white,
},
end:{
  position:"relative",
  color:Colors.white,
  fontSize:15,
  marginBottom:50,
  top:35,
  textAlign:"center",
},
profileIcon:{
  position:"absolute",
  top:70,
  right:15,
}
});

export default Anasayfa;
