const express = require('express');
const route = express.Router();
require('dotenv').config()

const fake_api_todos = process.env.FAKE_API_TODOS;


route.get("/", (req, res) => {
    fetch(fake_api_todos)
        .then(response => response.json())
        .then(json => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(json));
        })
        .catch(error => {
            console.error(error);
            res.status(500).send("Internal Server Error");
        });
});

route.get("/:id", (req, res) => {
    const { id } = req.params;
    fetch(`${fake_api_todos}/${id}`)
        .then((res) => res.json())
        .then((json) => {
            res.setHeader('Content-type', 'application/json');
            res.send(JSON.stringify(json));
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error")
        })
})

route.get("/search/:keyword", (req, res) => {
    const { keyword } = req.params;
    fetch(fake_api_todos)
        .then(response => response.json())
        .then(json => {
            const filteredTodos = json.filter(todo => todo.title.includes(keyword));
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(filteredTodos));
        })
        .catch(error => {
            console.error(error);
            res.status(500).send("Internal Server Error");
        });
});



module.exports = route;