import axios from 'axios';

const API_KEY = 'e27e26c4f11ffff41266186afa3cc999';

const getWeatherData = async (city) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=tr&units=metric`);
    console.log(response.data);
    return response.data;
    
  } catch (error) {
    console.log(error);
    return null;
  }
};
 
export { getWeatherData };



