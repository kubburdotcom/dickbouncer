const dnsbl = require('dnsbl');
const express = require('express');
const cidrTools = require('cidr-tools');
const lists = require('./lists.json');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('static'));

const tpl = (content) => `<!DOCTYPE html>
<html>
    <head>
        <title>Dickbouncer</title>
        <style>
            body {
                font-size: 0.8rem;
                font-family: 'arial', sans-serif;
                padding: 50px;
            }
            .button {
                font: bold 11px Arial;
                text-decoration: none;
                background-color: #EEEEEE;
                color: #333333;
                padding: 2px 6px 2px 6px;
                border-top: 1px solid #CCCCCC;
                border-right: 1px solid #333333;
                border-bottom: 1px solid #333333;
                border-left: 1px solid #CCCCCC;
            }
            .input {
                font: bold 11px Arial;
                text-decoration: none;
                background-color: #EEEEEE;
                color: #333333;
                padding: 2px 6px 2px 6px;
                border-top: 1px solid #CCCCCC;
                border-right: 1px solid #333333;
                border-bottom: 1px solid #333333;
                border-left: 1px solid #CCCCCC; 
            }
            table,thead,tr,th {
                border: 1px solid #DDD;
                border-collapse: collapse;
                padding: 5px;
                font-weight: 400;
                text-align: left;
                font-size: 0.8rem;
            }
        </style>
    </head>
    <body>
        ${content}
        <hr />
        <p>&copy; 2022 KUBBUR Limited.</p>
        <script>
            document.getElementById('button').addEventListener('click', function() {
                const results = document.getElementById('results');
                const cidr = document.getElementById('cidr').value;

                results.innerHTML = '<img src="/loading.gif" height="25" width="25" />'

                fetch('/dickbounce?cidr=' + cidr).then(res => res.json()).then(data => {
                    results.innerHTML = '';
                    if (data) {
                        if (data.length > 0) {
                            let table = '<table><thead><tr><th>IP</th><th>List</th></tr></thead>';
                            results.innerHTML += '<p style="font-weight:600;">Total listings: ' + data.length + '</p>'
                            data.map(listing => {
                                table += '<tr><th>' + listing.address + '</th>'
                                table += '<th>' + listing.blacklist + '</th></tr>'
                            });
                            results.innerHTML += table;
                        } else {
                            results.innerHTML = '<p style="color:green;font-weight:500;">IP is clean.</p>'
                        }
                    } else {
                        results.innerHTML = '<p style="color:red;font-weight:500;">Data fetch failed. Check browser console for details.</p>'
                    }
                });
            });
        </script>
    </body>
</html>`;

app.get('/', (req, res) => {
    res.send(tpl(`<p style="font-size:1rem;font-weight:600;">Enter CIDR to check</p>
    <p>For checking individual IPs, append /32 to the end for IPv4 and /128 for IPv6</p>
    <input class="input" id="cidr" type="text" />
    <button type="submit" class="button" id="button">Check IP</button>
    <div id="results" style="padding-top: 10px;"></div>
    <p>Note that this service is <strong>slow</strong>, let it sit until a result is delivered. You may also be rate limited if you send too many queries.</p>`));
});

app.get('/dickbounce', async (req, res) => {
    const {cidr} = req.query;

    if (!cidr) res.send(tpl('<p>Missing CIDR.</p>')); 

    const ips = cidrTools.expand([cidr])
    const results = await dnsbl.batch(ips, lists, {includeTxt: false});
    const listed_ips = results.filter(result => result.listed);

    res.send(listed_ips);
});

app.listen(process.env.HTTP_PORT || 8080, () => {
    console.log('Listening on port ' + (process.env.HTTP_PORT || 8080));
});