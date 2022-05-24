# dickbouncer

<img src="https://i.imgur.com/sb9GY9e.gif" alt="Screenshot of the application UI" />

This is a free alternative to debouncer.com. That being said, Debouncer is awesome, but this is for those who just want to check a subnet once or twice.

# use

Install it and boot up the express server by running:

```
yarn serve
```

and the web server will start on port 8080 or if the environment variable `HTTP_PORT` is defined, it will listen on any port defined there.

From here just navigate to the IP of your local machine/web server, making sure to specify the port, and you'll be greeted with the minimalistic interface.

You can also use it as a REST API, like so:

```
GET /dickbounce?cidr=45.61.173.17

[]

GET /dickbounce?cidr=185.244.95.6


[
    {
        "blacklist": "b.barracudacentral.org",
        "address": "185.244.95.6",
        "listed": true
    },
    {
        "blacklist": "dnsbl.spfbl.net",
        "address": "185.244.95.6",
        "listed": true
    }
]
```

# license

We licensed this under MIT, because it's really easy to make this :p