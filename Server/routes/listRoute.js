const { readFile, addItem, deleteItem, deleteAll, updateItem } = require("../fs");
const express = require("express");
const router = express.Router();
const { v4 } = require('uuid');

router.get("/", (req, res) => {
    const lists = readFile("./data/list.json");
    res.send(lists);
});

router.get("/:id", (req, res) => {
    const { id } = req.params;

    const lists = readFile("./data/list.json")
    const list = lists.find((l) => l.id === Number(id));

    if (!list) {
        res.status(404).json({ mesg: "list not found" })
    }

    res.send(list)
})

router.post('/', (req, res) => {

    const { name, user } = req.body

    const listId = v4();

    const item = {
        id: listId,
        name: name,
        user: user
    }

    if (!name) {
        res.status(400).json({ msg: "name not defiend" })
    }

    if (name.length > 4) {
        res.status(400).json({ msg: "name not defiend" })
    }

    if (!user || !user.id || !user.userName || !user.password) {
        res.status(400).json({ msg: "user not defiend" })
    }


    addItem("./data/list.json", item)

    res.send({ mgs: "list is added" })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    deleteItem("./data/list.json", id);

    res.send({ mgs: "List is deleted" });
});

router.delete('/', (req, res) => {
    deleteAll("./data/list.json")

    res.send({ mgs: "all lists are deleted" })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;

    const item = {
        id: id,
        name: req.body.name,
        user: req.body.user
    }

    updateItem("./data/list.json", id, item)

    res.send({ msg: "list is updated" })
})


module.exports = router;