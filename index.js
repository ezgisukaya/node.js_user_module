const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kivi22', // MySQL şifrem
    database: 'mydatabase'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL bağlantı hatası: ', err);
        return;
    }
    console.log('MySQL veritabanına bağlanıldı.');
});

app.use(express.static('public'));

app.post('/adduser', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    
    db.query(query, [name, email], (err, results) => {
        if (err) {
            console.error('Veri ekleme hatası: ', err);
            res.status(500).send('Veri ekleme hatası');
            return;
        }
        console.log('Kullanıcı eklendi: ', results.insertId);
        res.send('Kullanıcı başarıyla eklendi');
    });
});

app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Veri çekme hatası: ', err);
            res.status(500).send('Veri çekme hatası');
            return;
        }
        console.log('Kullanıcılar: ', results);
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${port}`);
});


