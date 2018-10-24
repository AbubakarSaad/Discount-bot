'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, cb) {
    if(intentData.intent[0].value !== 'deals') {
        return cb(new Error(`Expected time intent, got ${intentData.intent[0].value}`));
    }

    if(!intentData.search_query) return cb(new Error('Missing search query'));



    // return cb(false, `I don't yet have ${intentData.intent[0].value} for ${intentData.search_query[0].value}`);
    const search_query = intentData.search_query[0].value;
    // console.log(search_query);
    request.get(`http://localhost:3010/service/${search_query}`, (err, res) => {

        if(err || res.statusCode != 200 || !res.body.result) {
            console.log(err);
            console.log(res.body); 

            return cb(false, `I had a problem finding out the ${search_query}`);
        }

        let text = "";

        const answer = res.body.result;
        // console.log(answer[0]);
        text += "Daily Deals: \n";
        for(let key in answer) {
            

            text += key + ". " + answer[key].name + "\n";
        };


        // console.log(text);
        return cb(false, `The results are displayed below\n ${text}`);
    });
}