# dickbouncer

<img src="https://i.imgur.com/sb9GY9e.gif" alt="Screenshot of the application UI" />

This is a free alternative to debouncer.com. That being said, Debouncer is awesome, but this is for those who just want to check a subnet free of charge, and don't really care about speed.

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

# notes about reliability

This application is extremely basic, you might even observe from index.js that we did not even use a templating engine for it. It was written in a hurry for our janky IP address monitoring setup. If you'd like to use it for yourselves, please go ahead and do so, but don't expect anything fancy. We tested this code with Node.js version 16+ and version 101 of Google Chrome, don't expect it to work in older versions.

If you have any issues, please **don't** make an issue on the issues tab. Feel free to open a pull request or even [fork this repository](https://github.com/kubburdotcom/dickbouncer/fork) and improve it yourself, because we won't maintain it :)

Regardless, we hope you find this at least partially useful!

# license

We licensed this under MIT, because it's really easy to make this :p