import React from 'react';
import { Image, StyleSheet, View } from 'react-native';



export const showWeatherIcon = (iconId) => {
    switch (iconId) {
      case '01d':
        return require('../resim/01d.png');
      case '01n':
        return require('../resim/01n.png');
      case '02d':
        return require('../resim/02d.png');
      case '02n':
        return require('../resim/02n.png');
      case '03d':
        return require('../resim/03d.png');
      case '03n':
        return require('../resim/03n.png');
      case '04d':
        return require('../resim/04d.png');
      case '04n':
        return require('../resim/04n.png');
      case '09d':
        return require('../resim/09d.png');
      case '09n':
        return require('../resim/09n.png');
      case '10d':
        return require('../resim/10d.png');
      case '10n':
        return require('../resim/10n.png');
      case '11d':
        return require('../resim/11d.png');
      case '11n':
        return require('../resim/11n.png');
      case '13d':
        return require('../resim/13d.png');
      case '13n':
        return require('../resim/13n.png');
      case '50d':
        return require('../resim/50d.png');
      case '50n':
        return require('../resim/50n.png');
            
      default:
        return require('../resim/full-moon.png'); // Varsayılan bir ikon
    }
};





export default showWeatherIcon;
