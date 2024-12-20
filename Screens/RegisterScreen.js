import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { addUser } from '../Screens/database'; // Doğru yolu kontrol edin
import validate from '../Components/validate'; // validate fonksiyonunu import edin
import { Colors } from '../Components/Colors';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      if (!validate(email, password)) {
        Alert.alert("Geçersiz giriş", "Lütfen e-posta adresinizi ve şifrenizi kontrol edin.");
        setEmail('');
        setPassword('');
        return;
      }
  
      addUser(email, password, (success, message) => {
        if (success) {
          Alert.alert('Başarılı', 'Kullanıcı başarıyla kaydedildi.');
          navigation.navigate('LoginScreen');
        } else {
          Alert.alert('Hata', message || 'Kullanıcı kaydedilemedi. Lütfen tekrar deneyin.');
          setEmail('');
          setPassword('');
        }
      });
    } catch (error) {
      console.error('Kayıt işlemi hatası:', error);
      Alert.alert('Hata', 'Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.linkText}>Zaten bir hesabınız var mı? Giriş Yapın</Text>
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
    color: Colors.white,
    fontSize: 16,
  },
  linkText: {
    color: Colors.darkblue,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default RegisterScreen;
