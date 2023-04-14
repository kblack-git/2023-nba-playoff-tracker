var express = require('express');
var router = express.Router();
const fs = require('fs');

const TEAM_FILE = './data/teams.json'

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile(TEAM_FILE, 'utf-8', (err, data) =>{
    if(err){
      console.error(err);
      res.status(500).send('There was a problem reading the file')
      return;
    }
    res.json(JSON.parse(data));
  })
});

router.get('/:id', (req,res)=>{
  fs.readFile(TEAM_FILE, 'utf-8', (err, data)=>{
    if(err){
      console.error(err);
      res.status(500).send('There was a problem reading the file')
      return;
    }
    const teams = JSON.parse(data)
    const team = teams.find(team => team.id === (req.params.id))
    console.log(team);
    console.log(req.params);
    if(!team) {
      res.status(404).send('Team no longer a playoff contender')
      return;
    }
    res.json(team)
  })
})

// POST new team
router.post('/',(req,res)=>{
    fs.readFile(TEAM_FILE, 'utf-8', (err, data)=>{
        if(err){
            console.error(err);
            res.status(500).send('There was a problem reading the file')
            return;
        }
        const teams = JSON.parse(data);

        const newTeam = {
            id: (teams.length +1).toString(),
            name: req.body.name,
            team: req.body.team,
            conference: req.body.conference,
        };
        playoffs.push(newTeam);

        fs.writeFile(TEAM_FILE, JSON.stringify(teams), err =>{
            if(err){
                console.error(err);
                res.status(500).send('There was a problem writing the file')
                return;
            }
            res.json(newTeam)
        })
    })
    res.send('post accepted')
})

module.exports = router;


