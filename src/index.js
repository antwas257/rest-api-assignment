const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
let data = [];
let response;
let id,name,email;

function getData(params,body){

    return [params.id,body.email,body.name]
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/users',(req,res) => {

    ({email,name} = req.body);

    if (!email|| !name)
        return res.status(400).send("Bad Request");

    id =  uuidv4();

    req.body["id"] = id;
    data.push(req.body);

    return res.status(201).json(req.body);

});

app.get('/users/:id', (req, res) => {

    [id,email,name] = getData(req.params,req.body);

    response = data.find(key => key.id === id);

    if (!response) // can't find id
        return res.status(404).send("Not Found");

    return res.status(200).json(response);
});



app.put('/users/:id', (req, res) => {

    [id,email,name] = getData(req.params,req.body);

    response = data.find(key => key.id === id);

    if (!response)
        return res.status(404).send("Not Found");

    if (!email || !name)
        return res.status(400).send("Bad Request");

    response.email = email;
    response.name = name;

     return res.status(200).json(response);


});

app.delete('/users/:id', (req, res) => {

    [id,email,name] = getData(req.params,req.body);

    response = data.find(key => key.id === id);

    if (!response)
        return res.status(404).send("Not Found");

    data = data.filter(key => key.id !== id);

    return res.status(204).send(); 


});


// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing