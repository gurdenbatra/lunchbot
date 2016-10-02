/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ______    ______    ______   __  __    __    ______
 /\  == \  /\  __ \  /\__  _\ /\ \/ /   /\ \  /\__  _\
 \ \  __<  \ \ \/\ \ \/_/\ \/ \ \  _"-. \ \ \ \/_/\ \/
 \ \_____\ \ \_____\   \ \_\  \ \_\ \_\ \ \_\   \ \_\
 \/_____/  \/_____/    \/_/   \/_/\/_/  \/_/    \/_/


 This is a sample Slack Button application that provides a custom
 Slash command.

 This bot demonstrates many of the core features of Botkit:

 *
 * Authenticate users with Slack using OAuth
 * Receive messages using the slash_command event
 * Reply to Slash command both publicly and privately

 # RUN THE BOT:

 Create a Slack app. Make sure to configure at least one Slash command!

 -> https://api.slack.com/applications/new

 Run your bot from the command line:

 clientId=<my client id> clientSecret=<my client secret> PORT=3000 node bot.js

 Note: you can test your oauth authentication locally, but to use Slash commands
 in Slack, the app must be hosted at a publicly reachable IP or host.


 # EXTEND THE BOT:

 Botkit is has many features for building cool and useful bots!

 Read all about it here:

 -> http://howdy.ai/botkit

 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

/* Uses the slack button feature to offer a real time bot to multiple teams */
var Botkit = require('botkit');

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.PORT || !process.env.VERIFICATION_TOKEN) {
    console.log('Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment');
    process.exit(1);
}

var config = {}
if (process.env.MONGOLAB_URI) {
    var BotkitStorage = require('botkit-storage-mongo');
    config = {
        storage: BotkitStorage({mongoUri: process.env.MONGOLAB_URI}),
    };
} else {
    config = {
        json_file_store: './db_slackbutton_slash_command/',
    };
}

var controller = Botkit.slackbot(config).configureSlackApp(
    {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        scopes: ['commands'],
    }
);

controller.setupWebserver(process.env.PORT, function (err, webserver) {
    controller.createWebhookEndpoints(controller.webserver);

    controller.createOauthEndpoints(controller.webserver, function (err, req, res) {
        if (err) {
            res.status(500).send('ERROR: ' + err);
        } else {
            res.send('Success!');
        }
    });
});


//
// BEGIN EDITING HERE!
//

var request = require('request');
var today = new Date();
var dateString = "";
dateString += today.getFullYear() + "-";
dateString += (today.getMonth() + 1) + "-";
if(today.getDate() < 10) {
    dateString += "0" + today.getDate();
}
else {
    dateString += today.getDate();
}


controller.on('slash_command', function (slashCommand, message) {

    switch (message.command) {
        case "/lunch": //handle the `/echo` slash command. We might have others assigned to this app too!
            // The rules are simple: If there is no text following the command, treat it as though they had requested "help"
            // Otherwise just echo back to them what they sent us.

            // but first, let's make sure the token matches!
            if (message.token !== process.env.VERIFICATION_TOKEN) return; //just ignore it.

            // if no text was supplied, treat it as a help command
            if (message.text === "" || message.text === "help") {
                slashCommand.replyPrivate(message,
                    "Moi! Lunch options-Aalto Valimo:'valimo', Aalto/VM5:'vm5', Alvari:'alvari', Konetekniikka:'kone', Kvarkki:'kva', Sähkötekniikka:'sah', Täffä:'taf' For any errors/suggestions ping @gurden");
                return;
            }

            // If we made it here, just echo what the user typed back at them
            //TODO You do it!
            if (message.text === "vm5"){
                request('https://kitchen.kanttiinit.fi/menus?&lang=en', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var tst = JSON.parse(body);
                    slashCommand.replyPublic(message, dateString);
                    var mainJSON = tst["9"][dateString];
                    var string = "";
                    for (var i = 0; i < mainJSON.length; i++) {
                        string+= mainJSON[i].title + " ";
                    }
                    slashCommand.replyPublic(message, "VM5-" + string);
                  }
                else {
                     slashCommand.replyPublic(message, error);
                }
                });
            }
            if (message.text === "valimo"){
                request('https://kitchen.kanttiinit.fi/menus?&lang=en', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var tst = JSON.parse(body);
                    var mainJSON = tst["8"][dateString];
                    var string = "";
                    for (var i = 0; i < mainJSON.length; i++) {
                        string+= mainJSON[i].title + " ";
                    }
                    slashCommand.replyPublic(message, "Valimo- " + string);
                  }
                else {
                     slashCommand.replyPublic(message, error);
                }
                });
            }
            if (message.text === "alvari"){
                request('https://kitchen.kanttiinit.fi/menus?&lang=en', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var tst = JSON.parse(body);
                    var mainJSON = tst["5"][dateString];
                    var string = "";
                    for (var i = 0; i < mainJSON.length; i++) {
                        string+= mainJSON[i].title + " ";
                    }
                    slashCommand.replyPublic(message, "Alvari-" + string);
                  }
                else {
                     slashCommand.replyPublic(message, error);
                }
                });
            }
            if (message.text === "kone"){
                request('https://kitchen.kanttiinit.fi/menus?&lang=en', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var tst = JSON.parse(body);
                    var mainJSON = tst["10"][dateString];
                    var string = "";
                    for (var i = 0; i < mainJSON.length; i++) {
                        string+= mainJSON[i].title + " ";
                    }
                    slashCommand.replyPublic(message, "Konetekniikka-" + string);
                  }
                else {
                     slashCommand.replyPublic(message, error);
                }
                });
            }

            if (message.text === "kva"){
                request('https://kitchen.kanttiinit.fi/menus?&lang=en', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var tst = JSON.parse(body);
                    var mainJSON = tst["1"][dateString];
                    var string = "";
                    for (var i = 0; i < mainJSON.length; i++) {
                        string+= mainJSON[i].title + " ";
                    }
                    slashCommand.replyPublic(message, "Kvarkki-" + string);
                  }
                else {
                     slashCommand.replyPublic(message, error);
                }
                });
            }

            if (message.text === "sah"){
                request('https://kitchen.kanttiinit.fi/menus?&lang=en', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var tst = JSON.parse(body);
                    var mainJSON = tst["6"][dateString];
                    var string = "";
                    for (var i = 0; i < mainJSON.length; i++) {
                        string+= mainJSON[i].title + " ";
                    }
                    slashCommand.replyPublic(message, "Sähkötekniikka-" + string);
                  }
                else {
                     slashCommand.replyPublic(message, error);
                }
                });
            }

            if (message.text === "taf"){
                request('https://kitchen.kanttiinit.fi/menus?&lang=en', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var tst = JSON.parse(body);
                    var mainJSON = tst["3"][dateString];
                    var string = "";
                    for (var i = 0; i < mainJSON.length; i++) {
                        string+= mainJSON[i].title + " ";
                    }
                    slashCommand.replyPublic(message, "Täffä-" + string);
                  }
                else {
                     slashCommand.replyPublic(message, error);
                }
                });
            }

            break;
        default:
            slashCommand.replyPublic(message, "I'm afraid I don't know how to " + message.command + " yet.");

    }

})
;

