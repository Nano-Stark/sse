import express from "express"
import eventsource from "eventsource"
import cors from "cors"

global.EventSource = eventsource;
const app = express()
let clients = []

app.use(express.json())
app.use(cors({
    origin: "http://127.0.0.1:5000",
    credentials: true
}))

const events = new EventSource("http://127.0.0.1:5000/sse")

events.onmessage = (e) => {
    console.log("[SERVER_ONE -> SERVER_TWO]: ", e.data)
}

events.addEventListener("notice", (e) => {
    console.log("[SERVER_ONE -> SERVER_TWO]:NOTICE ", e.data)
})

function sendMsg() {
    const interval = setInterval(() => {
        messageEvents()
        // console.log("first")
        sendMsg()
        clearInterval(interval)
    }, 2000)
}

sendMsg()

function sendNotice() {
    const noticeInterval = setInterval(() => {
        noticeEvents()
        // console.log("second")
        sendNotice()
        clearInterval(noticeInterval)
    }, 4000)

}
sendNotice()

app.get("/sse", registerClients)

app.listen(5001, () => {
    console.info("[server2]: server started on port 5001")
})


function registerClients(req, res, next) {
    console.log("req headers: ", req.headers)

    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
      };
    res.writeHead(200, headers);
    
    const clientId = Date.now();

  const newClient = {
    id: `client-${clientId}`,
    res
  };

  clients.push(newClient);

  req.on('close', () => {
    console.log(`[server2]: ${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });

}


function messageEvents() {
    const msg = `id: Stark\ndata: Message from [SERVER_TWO]\n\n`

    clients.forEach(({id, res}) => {
        res.write(msg)
    })
}

function noticeEvents() {
    const msg = `event: notice\ndata: NOTICE from [SERVER_TWO]\n\n`

    clients.forEach(({id, res}) => {
        res.write(msg)
    })
}