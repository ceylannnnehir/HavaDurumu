import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('users.db');

// Veritabanını oluştur
const setupDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        password TEXT NOT NULL
      );`,
      [],
      () => {
        console.log('Users tablosu başarıyla oluşturuldu');
      },
      error => {
        console.log('Users tablosu oluşturulurken hata oluştu: ', error);
      }
    );
  });
};

// Kullanıcıyı veritabanına ekle
const addUser = (email, password, callback) => {
  db.transaction(tx => {
    // İlk olarak aynı email ile bir kullanıcı olup olmadığını kontrol et
    tx.executeSql(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (_, results) => {
        if (results.rows.length > 0) {
          // Kullanıcı zaten var
          if (callback) callback(false, 'Kullanıcı zaten mevcut');
        } else {
          // Kullanıcı yoksa ekle
          tx.executeSql(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, password],
            (_, results) => {
              if (results.rowsAffected > 0) {
                if (callback) callback(true);
                getAllUsers();  // Kullanıcılar tablosunu anında güncelle
              } else {
                if (callback) callback(false, 'Kullanıcı kaydedilemedi. Lütfen tekrar deneyin.');
              }
            },
            (_, error) => {
              if (callback) callback(false, 'Veritabanı hatası: ' + error.message);
            }
          );
        }
      },
      (_, error) => {
        if (callback) callback(false, 'Veritabanı hatası: ' + error.message);
      }
    );
  });
};

// Kullanıcıyı veritabanından kontrol et
const checkUser = (email, password, callback) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (_, results) => {
          if (results.rows.length > 0) {
            callback(true);
          } else {
            callback(false);
          }
        },
        (_, error) => {
          console.error('Veritabanı hatası:', error);
        }
      );
    },
    null,
    null
  );
};

// Tüm kullanıcıları getir ve konsolda yazdır
const getAllUsers = () => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT DISTINCT id, email, password FROM users',
      [],
      (_, results) => {
        const rows = results.rows;
        for (let i = 0; i < rows.length; i++) {
          console.log(rows.item(i));
        }
      },
      (_, error) => {
        console.error('Veritabanı hatası:', error);
      }
    );
  });
};

export { setupDatabase, addUser, checkUser, getAllUsers };
