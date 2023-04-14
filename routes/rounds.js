var express = require('express');
var router = express.Router();
const fs = require('fs');

const ROUND_FILE = './data/rounds.json'

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile(ROUND_FILE, 'utf-8', (err, data) =>{
    if(err){
      console.error(err);
      res.status(500).send('There was a problem reading the file')
      return;
    }
    res.json(JSON.parse(data));
  })
});

router.get('/:id', (req,res)=>{
  fs.readFile(ROUND_FILE, 'utf-8', (err, data)=>{
    if(err){
      console.error(err);
      res.status(500).send('There was a problem reading the file')
      return;
    }
    const rounds = JSON.parse(data)
    const round = rounds.find(round => round.id === (req.params.id))
    console.log(round);
    console.log(req.params);
    if(!round) {
      res.status(404).send('Team no longer a playoff contender')
      return;
    }
    res.json(round)
  })
})

// POST new round
router.post('/',(req,res)=>{
    fs.readFile(ROUND_FILE, 'utf-8', (err, data)=>{
        if(err){
            console.error(err);
            res.status(500).send('There was a problem reading the file')
            return;
        }
        const rounds = JSON.parse(data);

        const newRound = {
            id: (rounds.length +1).toString(),
            status:req.body.status,
            round: req.body.round,
            vs: req.body.vs,
            series: req.body.series,
        };
        playoffs.push(newRound);

        fs.writeFile(ROUND_FILE, JSON.stringify(rounds), err =>{
            if(err){
                console.error(err);
                res.status(500).send('There was a problem writing the file')
                return;
            }
            res.json(newRound)
        })
    })
    res.send('post accepted')
})

module.exports = router;