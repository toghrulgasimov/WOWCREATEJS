var express = require('express');
var router = express.Router();
const  fs = require('fs');
const cheerio = require('cheerio')
const {WowPlayer} = require('../models/player');
const {WowContestant} = require('../models/contestant');
const Helper = require('./helper')

/* GET home page. */
router.get('/', async function(req, res, next) {
  let s = fs.readFile("./public/index.html") + "";
  res.send(s);
});
router.get('/border', async function (req, res) {
    let s = fs.readFileSync("./public/border.html") + "";
    const $ = cheerio.load(s);
    let a = $("#table");
    console.log("connnnn");//
    let ps = await WowPlayer.find({}).sort({mission:-1});
    for(let i = 0; i < ps.length; i++) {
        let t = "<tr class='clickable-row' data-href='http://35.231.39.26:3000/users/getUser?id="+ps[i]._id+"'>\n" +
            "        <th class='align-middle' scope=\"row\">"+(i+1)+"</th>\n" +
            "        <td class='align-middle'><img src='http://35.231.39.26:3000/profile/"+ps[i].image+"' width='40px' height='40px'>"+("")+"</td>\n" +
            "        <td class='align-middle'>"+(ps[i].firstName +" " +  ps[i].lastName)+"</td>\n" +
            "        <td class='align-middle'>"+(ps[i].mission)+"</td>\n" +
            "    </tr>"
        a.append(t);
    }
    res.send($.html());
});
router.get('/contestborder', async function (req, res) {
    let s = fs.readFileSync("./public/contestborder.html") + "";
    const $ = cheerio.load(s);
    let a = $("#table");
    console.log("connnnn");
    let ps = await WowPlayer.find({}).sort({mission:-1});
    for(let i = 0; i < ps.length; i++) {
        let t = "<tr class='clickable-row' data-href='http://35.231.39.26:3000/users/getUser?id="+ps[i]._id+"'>\n" +
            "        <th class='align-middle' scope=\"row\">"+(i+1)+"</th>\n" +
            "        <td class='align-middle'><img src='http://35.231.39.26:3000/profile/"+ps[i].image+"' width='40px' height='40px'>"+("")+"</td>\n" +
            "        <td class='align-middle'>"+(ps[i].firstName +" " +  ps[i].lastName)+"</td>\n" +
            "        <td class='align-middle'>"+(ps[i].mission)+"</td>\n" +
            "    </tr>"
        a.append(t);
    }
    res.send($.html());
});


let wows = fs.readFileSync("wowcavab") + "";
wows = wows.split("\n");
let Arrwow = [], cavabwow = [], preelo={},PRE={};
let Ewow, secwow=0, Oyuns;
let N = 330
testwow = wows[Helper.getRandom(1,N)]

setInterval(function () {
    let currentSecond = Math.ceil(new Date().getTime() / 1000);
    if(currentSecond % 85 == 0) { // oyun bashladi
        testwow = wows[Helper.getRandom(1,N)]
        let t = testwow.split('|');
        t[0] = Helper.shuffle(t[0]);
        testwow = t.join("|");
    }else if(currentSecond % 85 == 67) { // hesabla bashladi

    }
}, 1000);

router.get('/start', async function(req, res, next) {
    let s = fs.readFile("./public/index.html") + "";
    res.send(testwow);
});
router.get('/menu', async function(req, res, next) {
    let s = fs.readFile("./public/menu.html") + "";
    res.send(s);
});



module.exports = router;
