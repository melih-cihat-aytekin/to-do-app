const express = require('express')
const app = express();
const mysql = require("mysql")
const bodyParser = require("body-parser")
const PORT = 3000;


app.set("view engine", "ejs")
app.use("/assets" , express.static("assets"));
app.use(bodyParser.urlencoded({ extended: false }))

var baglanti = mysql.createConnection({
    host: "localhost",
    user: "root",
    pass:"",
    database : "mern_project2"
});


app.get('/', (req, res) => {
    baglanti.query("SELECT * FROM gorev" , (err , result) => {
        if(err) throw err;
        console.log(result)
        res.render('todoapp', { veriler: result });
    })
})

app.post('/', (req, res) => {
    baglanti.query("INSERT INTO gorev (yapilacak_gorev) VALUES (?)" , [req.body.gorev], (err , result) => {
        if(err) throw err;
        console.log(result)
        res.render('todoapp', { veriler: result });
        res.end()
    })
})


baglanti.connect(err => {
    if(err) throw err;
    console.log("Bağlantı Gerçekleşti")
    console.log("")
})

app.listen(PORT, () => {
    console.log(`Server ${PORT} portta çalışıyor...`)
})