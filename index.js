
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req,res) {  
    res.sendFile(__dirname+ '/index.html');
})
app.post('/',function (req,res) {  
    //console.log(req.body.crypto)
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount =req.body.amount;
    var options ={
        url: 'https://apiv2.bitcoinaverage.com/convert/global',
        method: 'GET',
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        }
    }
    request(options,
     function (error,response,body) {  
        var data =JSON.parse(body);
        var price = data.price;
        var date = data.time;
        res.write('<p><i> The current date is ' + date +'GMT</i></p>')
        res.write('<h1 style="color:pink;"><i>'+ amount + crypto + ' is currently worth '+ price + fiat+'</i></h1>')
        res.send();
    })
});

app.listen(1000, function () {  
    console.log(`Server is running on port '1000'.`);
})