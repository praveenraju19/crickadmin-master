const express = require('express');
const router = express.Router();
const routerDebug = require('debug')('Routermodule');
const createTeam = require('./lib/createteam.js')
const getAllTeams=require('./lib/getAllTeams.js')
const deleteTeams=require('./lib/deleteTeams.js')
const putTeams=require('./lib/updateTeams.js')
const getByTeamId=require('./lib/getTeamsById.js')
router.post('/teams', async (req, res) => {
    await createTeam(req, res)
});
router.get('/teams', async (req, res) => {
    await getAllTeams(req, res)
});
router.put('/teams/:id/', async (req, res) => {
    await putTeams(req, res)
});

router.delete('/teams/:id/', async (req, res) => {
    await deleteTeams(req, res)
});
router.get('/teams/:id/', async (req, res) => {
    await getByTeamId(req, res)
});
module.exports.teams = router;