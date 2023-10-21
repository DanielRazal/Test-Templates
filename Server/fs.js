const fs = require('fs');

const readFile = (path) => {
    const content = fs.readFileSync(path, 'utf-8');
    const json = JSON.parse(content);
    return json;
}

const saveFile = (path, content) => {
    fs.writeFileSync(path, JSON.stringify(content))
}

const addItem = (path, item) => {
    const json = readFile(path);
    json.push(item);
    saveFile(path, json);
}

const deleteItem = (path, id) => {

    const json = readFile(path);

    const removeItem = json.filter((x) => x.id != id)

    saveFile(path, removeItem)
}

const deleteAll = (path) => {
    const emptyArray = [];
    saveFile(path, emptyArray)
}

const updateItem = (path, id, content) => {
    const json = readFile(path);

    const index = json.findIndex(i => i.id === id);

    json[index] = { id: id, ...content };

    saveFile(path, json);
}


module.exports = {
    readFile,
    saveFile,
    addItem,
    deleteItem,
    deleteAll,
    updateItem
}