const express = require('express');
const app = express();
const listRoute = require('./routes/listRoute');
const userRoute = require('./routes/userRoute');
const todosRoute = require('./routes/todosRoute');
const serverPort = 3001;
const cors = require('cors');

//add params
app.get('/hello/:userName', (req, res) => {

    const { userName } = req.params;

    res.send(`hello ${userName}!`)
})

app.use(cors())
app.use(express.json());
app.use('/List', listRoute)
app.use('/User', userRoute)
app.use('/Todos', todosRoute)



app.listen(serverPort, () => {
    console.log(`server is running on port ${serverPort}`);
})