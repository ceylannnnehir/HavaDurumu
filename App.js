import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CityProvider } from './Components/cityContext';
import Anasayfa from './Screens/Anasayfa';
import MenuScreen from './Screens/MenuScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import React from 'react';

// App.js veya index.js gibi ana giriş dosyanız
import { setupDatabase, getAllUsers } from './Screens/database';
import { useEffect } from 'react';


const Stack = createStackNavigator();

export default function App() {
  
  useEffect(() => {
    // Veritabanını kur ve kullanıcıları kontrol et
    setupDatabase();
    getAllUsers(); // Tüm kullanıcıları konsolda görüntülemek için çağırın
      
  }, []);
  return (
   
      <CityProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Anasayfa" component={Anasayfa} options={{ headerShown: false }} />
            <Stack.Screen name="MenuScreen" component={MenuScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </CityProvider>
    
  );
}

