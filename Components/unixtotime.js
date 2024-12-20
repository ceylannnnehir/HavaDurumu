import { getWeatherData } from '../Components/weatherApi';

const unixTimestampToDateTime = (unixTimestamp) => {
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);

    const hour = dateObject.getHours();
    const minute = dateObject.getMinutes();


    const formattedDateTime = ` ${hour}:${minute}`;
    return formattedDateTime;
};

const unixTimestampToDateDay = (unixTimestamp) => {
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // JavaScript'te ay değerleri 0'dan başlar, bu yüzden +1 ekliyoruz.
    const year = dateObject.getFullYear();

    const formattedDateTime = ` ${day}/${month}/${year}`;
    return formattedDateTime;
};

// Hava durumu verilerini al
getWeatherData('Ankara').then(weatherData => {
    if (weatherData) {
        // Gelen hava durumu verilerindeki sunrise ve sunset değerlerini al
        const sunriseTimestamp = weatherData.sys.sunrise;
        const sunsetTimestamp = weatherData.sys.sunset;

        // Unix zaman damgalarını tarih ve saat biçimine dönüştür ve konsola yazdır
        console.log("Sunrise:", unixTimestampToDateTime(sunriseTimestamp));
        console.log("Sunset:", unixTimestampToDateTime(sunsetTimestamp));
        console.log('Date:',unixTimestampToDateDay(sunriseTimestamp));
    } else {
        console.log("Hava durumu verileri alınamadı.");
    }
}).catch(error => {
    console.error("Hava durumu verileri alınırken bir hata oluştu:", error);
});

export {unixTimestampToDateTime, unixTimestampToDateDay };
