import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { checkUser } from '../Screens/database'; // Doğru yolu kontrol edin
import validate from '../Components/validate'; // validate fonksiyonunu import edin
import {Colors}  from '../Components/Colors';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useFocusEffect(
    useCallback(() => {
      // Ekran odaklandığında giriş alanlarını temizle
      setEmail('');
      setPassword('');
    }, [])
  );

  const handleLogin = () => {
    if (!validate(email, password)) {
      Alert.alert("Geçersiz giriş", "Lütfen e-posta adresinizi ve şifrenizi kontrol edin.");
      setEmail('');
      setPassword('');
      return;
    }

    checkUser(email, password, loggedIn => {
      if (loggedIn) {
        Alert.alert('Başarılı', 'Giriş başarıyla gerçekleştirildi.');
        navigation.navigate('Anasayfa');
      } else {
        Alert.alert('Hata', 'E-posta veya şifre yanlış.');
        setEmail('');
        setPassword('');
        return;
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.linkText}>Hesabınız yok mu? Kayıt Olun</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: Colors.gray,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: Colors.blue,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color:Colors.white,
    fontSize: 16,
  },
  linkText: {
    color: Colors.darkblue,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
