const express = require('express');
const router = express.Router();

const routerDebug = require('debug')('Routermodule');
const getAllNews = require('./lib/getAllnews.js')
const postNews = require('./lib/postNews.js')
const putNews = require('./lib/putNews.js')
const deleteNews = require('./lib/deleteNews.js')

// router.get('/', (req, res) => {  
//     res.send('Success :Connection successful');
//     routerDebug(`Response with status code ${res.status}`);
// });
// router.post('/', (req, res) => {
//     res.send('Success :Connection successful');
//     routerDebug(`Response with status code ${res.status}`);
// });
router.get('/news', async (req, res) => {
    await getAllNews(req, res)
});

router.post('/news', async (req, res) => {
    await postNews(req, res)
});

router.put('/news/:id/', async (req, res) => {
    await putNews(req, res)
});

router.delete('/news/:id/', async (req, res) => {
    await deleteNews(req, res)
});
module.exports.news = router;
