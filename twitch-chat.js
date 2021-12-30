const child_process = require("child_process");
const ws = require("ws");
const ini = require("./ini-parse");

const config = ini("config.ini");
const connection_messages = ["CAP REQ :twitch.tv/tags twitch.tv/commands", "PASS SCHMOOPIIE", "NICK justinfan47583", "USER justinfan47583 8 * :justinfan47583", `JOIN #${config.name}`];
let vote_people = [];


/*
==========
Initiate a connection.
==========
*/
let ttv = new ws("wss://irc-ws.chat.twitch.tv/", {
    "headers": {
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        "Origin": "https://www.twitch.tv",
        "Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
        "Sec-WebSocket-Version": "13",
        "User-Agent": config["user-agent"]
    }
})

/*
==========
Send initial connection_message(s)
==========
*/
ttv.on("open", () => {
    connection_messages.forEach(message => {
        ttv.send(message);
    })
})

/*
==========
Listen to WS messages
==========
*/
ttv.on("message", (msg) => {
    msg = msg.toString();

    if(msg.includes("PING")) {
        ttv.send("PONG");
    }

    if(msg.includes("PRIVMSG")) {
        // a chat message

        let sender = msg.split("PRIVMSG #")[1].split(" ")[0]
        let message = msg.split(`PRIVMSG #${sender} :`)[1];

        if(message.includes("!voteskip") && !vote_people.includes(sender)) {

            vote_people.push(sender);
            console.log(`${sender} voted for a skip. ${vote_people.length}/${config.require}`)

            if(vote_people.length == parseInt(config.require)) {
                /*
                ==========
                Skip!
                ==========
                */
                console.log("Skipping!");


                vote_people = []
                child_process.execSync("skip_song.exe");
            }

        }
    }
})


/*
==========
Close when a connection is aborted
==========
*/
ttv.on("close", () => {
    console.log("[ERROR] Connection closed.");
    process.exit();
})
