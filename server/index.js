const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('App listening on port 3000!');
});