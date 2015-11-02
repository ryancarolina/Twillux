//
//  Twillux - Twitter application that manages your twitter account for you!
//  Ryan Conklin 11 DEC 14
//  Version 1.1
//



var Bot = require("./bot")
, config1 = require("../config1");
 
var bot = new Bot(config1);
 
console.log('Twillux: Running.');
 
//get date string for today's date (e.g. 2011-01-01)
function datestring () {
  var d = new Date(Date.now() - 5*60*60*1000); //EST time
  return d.getUTCFullYear() + "-" + 
         (d.getUTCMonth() + 1) + "-" + 
         d.getDate();
  console.log(d);
};
 
setInterval(function() {
  bot.twit.get("followers/ids", function(err, reply) {
    if(err) return handleError(err)
    console.log("\n# followers:" + reply.ids.length.toString());  
  });
  var rand = Math.random();
 
  if(rand <= 0.30) { // follow someone
    bot.mingle(function(err, reply) {
      if(err) return handleError(err);
 
      var name = reply.screen_name;
      console.log("\nMingle: followed @" + name);
    });
  } else if(rand <= 0.65) {  // do a targeted follow
    console.log('Trying to target follow...');
    var params = {
        q: "#gamedesign"
      , since: datestring()
      , result_type: "mixed"
    };
 
    bot.searchFollow(params, function(err, reply) {
      if(err) return handleError(err);
 
      var name = reply.screen_name;
      console.log("\nTargetFollow: followed @" + name);
    });

  } else if(rand <= 0.80) {  // retweet
    console.log('Trying to retweet...');
    var params = {
        q: "#gamedesign"
      , since: datestring()
      , result_type: "mixed"
    };
 
    bot.retweet(params, function(err, reply) {
      if(err) return handleError(err);
 
      console.log("\nRetweet: retweeted response: " + reply.id);
    });
  
  } else if(rand <= 0.95) {  // favorite
    console.log('Trying to favorite...');
    var params = {
        q: "#gamedesign"
      , since: datestring()
      , result_type: "mixed"
    };

    bot.favorite(params, function(err, reply) {
      if(err) return handleError(err);
 
      console.log("\nFavorite: favorited response: " + reply.id);
    });

  } else {                  //  prune a friend
    bot.prune(function(err, reply) {
      if(err) return handleError(err);
 
      var name = reply.screen_name
      console.log("\nPrune: unfollowed @"+ name);
    });
  }
}, 360000);

//10 min == 600000
//6 min == 360000
 
function handleError(err) {
  console.error("response status:", err.statusCode);
  console.error("data:", err.data);
}
