var crypto = require('crypto');


var uri = "https://authservice.priaid.ch/login";
secret_key = "Cq6z2X7Zam9AWf43R";

//creating hmac object 
var hmac = crypto.createHmac('md5', secret_key);


//passing the data to be hashed
data = hmac.update(uri);

//Creating the hmac in the required format
gen_hmac= data.digest('base64');

//Printing the output on the console
//console.log("hmac : " + gen_hmac);


module.exports = gen_hmac