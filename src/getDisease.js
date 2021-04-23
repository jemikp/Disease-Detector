const fetch = require('node-fetch');
const hash = require('./generateHash');
const config = require('./config');


const username = config.username;
const password = config.password;
const login_url = 'https://authservice.priaid.ch/login';
const url = "https://healthservice.priaid.ch/diagnosis";
var auth = "Bearer " +  `${username}:${hash}`;

var obj;

module.exports.calculateDisease = function calculateDisease(symptoms_id, gender, birth_year, res){

    var myJsonSymptoms = JSON.stringify(symptoms_id);

    fetch(login_url, {
        method: 'post',
        headers: { "Authorization": auth },
    })
    .then(res => res.json())
    .then(json => {

        var token = json.Token;

        fetch(`https://healthservice.priaid.ch/diagnosis?token=${token}&language=en-gb&symptoms=${myJsonSymptoms}&gender=${gender}&year_of_birth=${birth_year}`)
            .then(res => res.text())
            .then(json => {
                var result = JSON.parse(json)
                var length_of_result = result.length;

                for(let i=0; i<length_of_result; i++){
                    console.log(result[i].Issue.Name +"\n");
                }

                res.render("../public/views/display-disease");
                //console.log(result, result[0].Issue.Name, length_of_result)
            })

        
    })

}


//console.log(obj)