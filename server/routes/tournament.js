var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/loadTeams', function(req, res, next) {
  console.log("LOADTEAMS")
});

router.get('/InsertTeam', function(req, res, next) {
  console.log("INSERT")
});



module.exports = router;
