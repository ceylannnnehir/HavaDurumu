import axios from "axios";

const BACKEND_URL = 'https://hava-durumu-de61a-default-rtdb.firebaseio.com/';

export async function storeCity(cityName) {
  try {
    const response = await axios.post(BACKEND_URL + "/cities.json", { name: cityName });
    const id = response.data.name;
    console.log("Şehir başarıyla eklendi. Şehir ID:", id);
    return id;
  } catch (error) {
    console.error("Şehir eklenirken hata oluştu:", error);
    throw error;
  }
}

export async function fetchCities() {
  try {
    const response = await axios.get(BACKEND_URL + "/cities.json");
    const cities = [];
    for (const key in response.data) {
      cities.push({ id: key, name: response.data[key].name });
    }
    return cities;
  } catch (error) {
    console.error("Şehirler getirilirken hata oluştu:", error);
    throw error;
  }
}

export async function deleteCity(id) {
  try {
    await axios.delete(BACKEND_URL + '/cities/' + id + '.json');
    console.log("Şehir başarıyla silindi. Şehir ID:", id);
  } catch (error) {
    console.error("Şehir silinirken hata oluştu:", error);
    throw error;
  }
}
