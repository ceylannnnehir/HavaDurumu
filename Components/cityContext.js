import React, { createContext, useContext, useState } from 'react';
/*// menuscreende flatlisteki git tıklandığında anasayfaya gidip secili olan sehir bilgilerini gösterir..*/


const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <CityContext.Provider value={{ cityList, setCityList, selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => useContext(CityContext);
