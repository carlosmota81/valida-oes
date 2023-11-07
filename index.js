const bodyParser = require("body-parser");
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser")

const app = express();


app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cookieParser("gfhjfhjsfgh"))
app.use(session({
    secret: 'Keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))

app.use(flash())

//-----------------------------------------------------------------------------------------------------------------------


app.get("/",(req,res)=>{

    var emailError = req.flash("emailError")
    var pontosError = req.flash("pontosError")
    var nomeError = req.flash("nomeError")
    var email = req.flash("email")

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
    email = (email == undefined || email.length==0) ? "" : email;

    res.render("index", {emailError, pontosError, nomeError, email:email })
})

app.post("/form",(req,res)=>{
    var {email, nome, pontos} = req.body;

    var emailError;
    var pontosError;
    var nomeError;

    if( email == undefined || email == ""){
        emailError = "O email não pode ser vazio"
    }
    if(nome == undefined || nome == ""){
        nomeError = "Nome não pode ser vazio"
    }
    if(pontos == undefined || pontos == ""){
        pontosError = " Pontos não posem ser vazio"
    }

    if(emailError != undefined || nomeError != undefined || pontosError != undefined){
        req.flash("emailError", emailError)
        req.flash("nomeError", nomeError)
        req.flash("pontosError", pontosError)
        res.redirect("/")

        res.flash("email", email)

    }else{
        res.send("Perfeito")
    }

})





app.listen(5000,(req,res)=>{
    console.log("Servidor redando :)");
})