'use strict';

const Discord = require('discord.js');

const client = new Discord.Client();

let nlp = null;


function handleOnMessage(msg) {
    // Give bot some name
    // console.log(msg);
    if(msg.content.toLowerCase().includes('paulo')) {
        nlp.ask(msg.content,  (err, res) => {
            if(err) {
                console.log(err);
                return;
            }
            try {
                if(!res.intent || !res.intent[0] || !res.intent[0].value) {
                    throw new Error("Could not extract intent.");
                }

                const intent = require('./intents/' + res.intent[0].value + 'Intent');

                intent.process(res, function(error, response) {
                    if(error) {
                        console.log(error.message);
                        return;
                    }

                    return msg.reply(response);

                })

            } catch (err) {
                console.log(err);
                console.log(res);
                msg.reply("Sorry, I don't know what you are talking about");
            }

            // if(!res.intent) {
            //     return msg.reply("Sorry, I don't know what you are talking about");
            // } else if(res.intent[0].value == 'deals' && res.search_query) {
            //     return msg.reply(`I don't yet have the deals for ${res.search_query[0].value}`);
            // } else {
            //     // console.log(msg);
            //     return msg.reply('Everything works :D');
            // }
            
        });

    }

}

module.exports.init = function discordClient(logLevel, nlpClient) {

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    nlp = nlpClient
    
    client.on('message', handleOnMessage);
       
    return client;
}

