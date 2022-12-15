const express = require('express');
const app = express();
const cors = require('cors');
const nanoid = require("nanoid");
let cookies = require("cookie-parser");
app.use(cookies());
app.use(express.json());
app.use(
    cors({
        credentials: true, // чтобы работали secured куки
        origin: true // автоматом подставляется текущий сервер в Origin
    })
);
const users = [
    {
        id: nanoid(),
        login: "123",
        password: "123"
    }
];
const tokens = [
    {
        userId: "123",
        token: "123",
        createdAt: Date()
    }
];
app.get("/", (req,res) => {
    res.status(200).json({ok: true});
});
app.get("/user", (req , res ) => {
    console.log(req.cookies)
    const token = req.cookies.token;
    const foundToken = tokens.find(tokenItem => tokenItem.token === token);
    if(!foundToken){
        res.status(401).json({
            message: "Пользователь не авторизован"
        });
    }
    const user = users.find(user => user.id === foundToken.userId);
    res.status(200).json(user);
});
app.post('/user', function (req, res) {

    if(users.find(user => user.login === req.body.login)){
        res.status(400).json({
            message: "Такой пользователь уже есть"
        });
    }
    else {
        const newUser = {
            id: nanoid(),
            login : req.body.login,
            password: req.body.password,
        };
        users.push(newUser);
        res.status(200).json(newUser)
    }


    console.log(users);

});
app.post('/auth', function (req, res) {
    const user = users.find(user => user.login === req.body.login);

    if(!user){
        res.status(404).json({
            message: "Пользователь не найден!"
        });
    }
    if(user.password === req.body.password){
        const token = nanoid();
        tokens.push(
            {
                userId: user.id,
                token,
                createdAt: Date()
            }
        );
        res.cookie("token", token,{
            maxAge: 24*60*60*1000,
            httpOnly: true,
            sameSite: 'none',
            secure: process.env.NODE_ENV === 'production'
        });
        res.status(200).json({tokens});
    }
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});