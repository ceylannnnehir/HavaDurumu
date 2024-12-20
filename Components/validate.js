import { Alert } from 'react-native';
  

// Giriş bilgilerinin doğruluğunu kontrol eden fonksiyon
export const validate = (email,password) => {
    
  
    // E-posta ve şifre boşlukları temizleniyor
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // E-posta ve şifre doğrulama işlemleri yapılıyor
    const emailIsValid = trimmedEmail.includes("@") && /.\.com$/.test(trimmedEmail);
    const passwordIsValid = trimmedPassword.length >= 6;

    // Geçersiz giriş varsa kullanıcıya uyarı gösteriliyor
    if (!emailIsValid || !passwordIsValid) {
      Alert.alert("Geçersiz giriş", "Lütfen e-posta adresinizi ve şifrenizi kontrol edin.");
      return false;
    }

    return true;
  };
 export default validate;