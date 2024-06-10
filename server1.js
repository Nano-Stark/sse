import eventsource from "eventsource"
import express from "express"
import cors from "cors"

global.EventSource = eventsource;
const app = express()
let clients = []

app.use(express.json())
app.use(cors({
    origin: "http://127.0.0.1:5001",
    credentials: true
}))

const events = new EventSource("http://127.0.0.1:5001/sse")

events.onmessage = (e) => {
    console.log("[SERVER_TWO -> SERVER_ONE]: ", e.data)
}

events.addEventListener("notice", (e) => {
    console.log("[SERVER_TWO -> SERVER_ONE]:NOTICE ", e.data)
})


function sendMsg() {
    const interval = setInterval(() => {
        messageEvents()
        // console.log("first")
        sendMsg()
        clearInterval(interval)
    }, 1000)
}

sendMsg()


function sendNotice() {
    const noticeInterval = setInterval(() => {
        noticeEvents()
        // console.log("second")
        sendNotice()
        clearInterval(noticeInterval)
    }, 3000)

}
sendNotice()

app.get("/sse", registerClients)

app.listen(5000, () => {
    console.info("[server1]: server started on port 5000")
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
    console.log(`[server1]: ${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });

}


function messageEvents() {
    const date = Date.now()
    const msg = `id: Stark\ndata: Message from [SERVER_ONE] \n\n`

    clients.forEach(({id, res}) => {
        res.write(msg)
    })
}

function noticeEvents() {
    const date = Date.now()
    const msg = `event: notice\ndata: NOTICE from [SERVER_ONE]\n\n`

    clients.forEach(({id, res}) => {
        res.write(msg)
    })
}