const express = require('express');
const { readFile, addItem } = require('../fs');
const route = express.Router();
const { v4 } = require('uuid');
const generateToken = require('../jwtToken');

const path = "./data/user.json"

route.post('/login', (req, res) => {

    const { userName, password } = req.body;

    if (!userName || !password) {
        res.status(400).json({ msg: "need to enter userName and password" })
    }

    const users = readFile(path);

    const findUser = users.find((x) => x.userName === userName && x.password === password);


    if (!findUser) {
        res.status(404).json({ msg: "userName or password are wrong" })
    }

    const token = generateToken(findUser)

    res.send({ user: findUser, token: token })
})


route.post('/register', (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        res.status(400).json({ msg: "need to enter userName and password" })
    }

    const userId = v4();

    const user = {
        id: userId,
        userName: userName,
        password: password
    }

    const users = readFile(path)

    const userExists = users.find((x) => x.userName === userName)

    if (userExists) {
        res.status(400).json({ msg: "user is exists" })
    }
    else {
        addItem(path, user)
    }

    res.send({ msg: "registration successful" })
})

route.get("/", (req, res) => {

    const users = readFile("./data/user.json");
    const lists = readFile("./data/list.json");

    users.forEach((data) => {
        data.lists = lists.filter((list) => list.userId === data.id);
    });

    res.send(users)
})


route.get("/:id", (req, res) => {
    const users = readFile("./data/user.json");
    const lists = readFile("./data/list.json");

    const { id } = req.params;

    users.forEach((data) => {
        data.lists = lists.filter((x) => x.userId === data.id);
    })

    const user = users.find((x) => x.id === id);

    res.send(user);
})




module.exports = route;
