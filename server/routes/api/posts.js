const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


//Get Posts
router.get('/', async (req, res)=>{
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
})


//Add Posts
router.post('/', async (req, res)=>{
    const posts = await loadPostsCollection();

    await posts.insertOne({
        title: req.body.title,
        body: req.body.body,
        createdAt: new Date()
    });

    res.status(201).send({success:"Post created"});
})

//Delete posts
router.delete('/:id', async (req, res)=>{
    const posts = await loadPostsCollection();

    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id)})

    res.status(200).send({success: "Delete sucessfull"});
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb://ben4code:ben4code@ds125683.mlab.com:25683/expressvue',{
        useNewUrlParser: true
    });

    return client.db('expressvue').collection('posts');
}

module.exports = router;