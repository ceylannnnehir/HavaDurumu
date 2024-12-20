import { Text, StyleSheet } from 'react-native';
import Colors from '../Components/Colors';

function Title({children}){
  return (
    <Text style={styles.title}>{children}</Text>
    
  );
};
export default Title;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginTop: 20, // Başlık metni ile üst boşluk
        marginLeft: 20, // Başlık metni ile sol boşluk
        color: Colors.white,
        marginTop: -30,
        marginBottom: 20,
        marginLeft: -150,
      }
});