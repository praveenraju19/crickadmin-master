const express = require('express');
const router = express.Router();

const routerDebug = require('debug')('Routermodule');
const getAll = require('./lib/getlist.js')
const postList = require('./lib/postlist.js')
const putList = require('./lib/updateList.js')
const deletelist = require('./lib/deleteList.js')
const getById=require('./lib/getPlayerById.js')
const getByplayerId=require('./lib/getbyPlayerid.js')
// router.get('/', (req, res) => {  
//     res.send('Success :Connection successful');
//     routerDebug(`Response with status code ${res.status}`);
// });
// router.post('/', (req, res) => {
//     res.send('Success :Connection successful');
//     routerDebug(`Response with status code ${res.status}`);
// });
router.get('/playerlist', async (req, res) => {
    await getAll(req, res)
});

router.post('/playerlist', async (req, res) => {
    await postList(req, res)
});
router.get('/playerlist/:id/',async(req,res)=>{

await getById(req,res)


})

router.get('/playerbyid/:id',async(req,res)=>{

    await getByplayerId(req,res)
    
    
    })
router.put('/playerlist/:id/', async (req, res) => {
    await putList(req, res)
});

router.delete('/playerlist/:id/', async (req, res) => {
    await deletelist(req, res)
});
module.exports.playerlist = router;