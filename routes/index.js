var express = require('express');
var router = express.Router();
const  fs = require('fs');
const cheerio = require('cheerio')
const {WowPlayer} = require('../models/player');
// const {WowContestant} = require('../models/contestant');
const Helper = require('./helper')

/* GET home page. */
router.get('/', async function(req, res, next) {
  let s = fs.readFileSync("./public/index.html") + "";
  res.send(s);
});
router.get('/border', async function (req, res) {
    let s = fs.readFileSync("./public/border.html") + "";
    const $ = cheerio.load(s);
    let a = $("#table");
    console.log("connnnn");//
    let ps = await WowPlayer.find({}).sort({score:-1});
    for(let i = 0; i < ps.length; i++) {
        let t = "<tr class='clickable-row' data-href='http://35.231.39.26:3000/users/getUser?id="+ps[i]._id+"'>\n" +
            "        <th class='align-middle' scope=\"row\">"+(i+1)+"</th>\n" +
            "        <td class='align-middle'><img src='http://35.231.39.26:3000/profile/"+ps[i].image+"' width='40px' height='40px'>"+("")+"</td>\n" +
            "        <td class='align-middle'>"+(ps[i].firstName +" " +  ps[i].lastName)+"</td>\n" +
            "        <td class='align-middle'>"+(ps[i].score)+"</td>\n" +
            "    </tr>"
        a.append(t);
    }
    res.send($.html());
});
// router.get('/contestborder', async function (req, res) {
//     let s = fs.readFileSync("./public/contestborder.html") + "";
//     const $ = cheerio.load(s);
//     let a = $("#table");
//     console.log("connnnn");
//     let ps = await WowPlayer.find({}).sort({mission:-1});
//     for(let i = 0; i < ps.length; i++) {
//         let t = "<tr class='clickable-row' data-href='http://35.231.39.26:3000/users/getUser?id="+ps[i]._id+"'>\n" +
//             "        <th class='align-middle' scope=\"row\">"+(i+1)+"</th>\n" +
//             "        <td class='align-middle'><img src='http://35.231.39.26:3000/profile/"+ps[i].image+"' width='40px' height='40px'>"+("")+"</td>\n" +
//             "        <td class='align-middle'>"+(ps[i].firstName +" " +  ps[i].lastName)+"</td>\n" +
//             "        <td class='align-middle'>"+(ps[i].mission)+"</td>\n" +
//             "    </tr>"
//         a.append(t);
//     }
//     res.send($.html());
// });


let wows = fs.readFileSync("wowcavab") + "";
wows = wows.split("\n");
// let Arrwow = [], cavabwow = [], preelo={},PRE={};
// let Ewow, secwow=0, Oyuns;
// let N = 330
// let Elo = require('./elo')
// testwow = wows[Helper.getRandom(1,N)]
//
// setInterval(async function () {
//     let currentSecond = Math.ceil(new Date().getTime() / 1000);
//     if(currentSecond % 85 == 0) { // oyun bashladi
//         await WowContestant.removeAll();
//         testwow = wows[Helper.getRandom(1,N)]
//         let t = testwow.split('|');
//         t[0] = Helper.shuffle(t[0]);
//         testwow = t.join("|");
//     }else if(currentSecond % 85 == 67) { // hesabla bashladi
//         let ps = await WowContestant.find().sort({count});
//         let Mathch = Elo.ELOMatch();
//         for(let i = 0; i < ps.length(); i++) {
//             Mathch.addPlayer(ps._id, )
//         }
//     }
// }, 1000);

// router.get('/start', async function(req, res, next) {
//
//     let _id = req.cookies._id;
//     let contestant = WowContestant.find();
//     if(contestant == null) {
//
//     }else {// 2ci defedi
//
//     }
//     let currentSecond = Math.ceil(new Date().getTime() / 1000);
//     let b = 85 - (currentSecond % 85);
//     //res.send(b+"|60|"+testwow);
//     // butun prosesler index.html de olmalidi
//     let s =  fs.readFileSync("./public/index.html") + "";
//     const $ = cheerio.load(s);
//     let a = $("#info");
//     a.attr("wow", testwow);
//     a.attr("duration", "60");
//     res.send($.html());
// });
router.get('/menu', async function(req, res, next) {
    // hamisi i
    let _id = req.query._id;
    if (req.query._id == undefined) return;
    let user = await WowPlayer.findOne({_id: req.query._id});
    if (user == null) {
        let data = req.query;
        data.mission = 1;
        data.score = 0;
        console.log(data);
        user = new WowPlayer(data);
        user = await user.save();
    }
    console.log(user);
    res.cookie('_id', user._id, {expire : new Date() + 99900000009});
    res.cookie('mission', user.mission, {expire : new Date() + 99900000009});
    res.cookie('score', user.score, {expire : new Date() + 99900000009});
    let s = fs.readFileSync("./public/menu.html") + "";
    const $ = cheerio.load(s);
    $('#rinfo').text('Reytinq ' + user.mission);
    res.send($.html());//test

});

router.post('/nextmission', async function (req, res) {
    console.log("nextx mission post");
    let _id = req.cookies._id;
    //let scorec = parseInt(req.body.ts);

    let ts = parseInt(req.body.ts);
    let user = await WowPlayer.findOne({_id:_id})
    let currMission = parseInt(req.cookies.mission);
    currMission++;
    ts += user.score;
    res.cookie('mission', currMission);
    res.cookie('score', ts);
    await WowPlayer.update({_id: _id}, {$set: {mission: currMission, score:ts}});
    res.send("succes");
});
router.get('/start', async function(req, res, next) {
    // hamisi i
    let s = fs.readFileSync("./public/index.html") + "";
    const $ = cheerio.load(s);
    let m = parseInt(req.cookies.mission)+0;
    $("#info").attr("mission", req.cookies.mission);
    $("#info").attr("score", req.cookies.score);
    console.log(m);
    let game = wows[m-1];
    let ar = game.split('|');
    ar[0] = Helper.shuffle(ar[0]);
    game = ar.join("|");

    $("#info").attr("wow", game);
    let a = $("#table");
    console.log("connnnn");//
    let ps = await WowPlayer.find({}).sort({score:-1});
    for(let i = 0; i < ps.length; i++) {
        let t = "<tr class='clickable-row' data-href='http://35.231.39.26:3000/users/getUser?id="+ps[i]._id+"'>\n" +
            "        <th class='align-middle' scope=\"row\">"+(i+1)+"</th>\n" +
            "        <td class='align-middle'><img src='http://35.231.39.26:3000/profile/"+ps[i].image+"' width='40px' height='40px'>"+("")+"</td>\n" +
            "        <td class='align-middle'>"+(ps[i].firstName +" " +  ps[i].lastName)+"</td>\n" +
            "        <td class='align-middle'>"+(ps[i].score)+"</td>\n" +
            "    </tr>"
        a.append(t);
    }

    let mission = req.cookies.mission;
    res.send($.html());//test
});

router.get('/reclamprofile', async function(req, res, next) {
    res.send("succes");
});





module.exports = router;
