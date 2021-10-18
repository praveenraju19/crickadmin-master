
// const news = require('./Routes/News/news.js').news
// import { news} from './Routes/News/news.js'
// import {Router} from 'express'
const express = require('express');
const news = require('./Routes/News/news.js').news
const fileupload = require('./Routes/image/s3fileupload').s3fileupload
const teams=require('./Routes/Teams/teams.js').teams
const playerList=require('./Routes/PlayerList/playerlist.js').playerlist
const router = express.Router();


function initializeRouter(app) {
    router.get('/', async (req, res) => {
        res.send("Welcome to cricket 10");
    });
    app.use(router)
    app.use(news)
    app.use(fileupload)
    app.use(teams)
    app.use(playerList)
}

module.exports.initializeRouter = initializeRouter;