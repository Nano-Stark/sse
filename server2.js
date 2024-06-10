import express from "express"
import eventsource from "eventsource"
import cors from "cors"

const app = express()
let clients = []

app.use(express.json())
app.use(cors({
    origin: "http://127.0.0.1:5000",
    credentials: true
}))

const events = new EventSource("http://127.0.0.1:5000/sse")

function sendMsg() {
    const interval = setInterval(() => {
        messageEvents()
        console.log("first")
        sendMsg()
        clearInterval(interval)
    }, 2000)
}

sendMsg()


function sendNotice() {
    const noticeInterval = setInterval(() => {
        noticeEvents()
        console.log("second")
        sendNotice()
        clearInterval(noticeInterval)
    }, 3000)

}
sendNotice()

app.listen(5001, () => {
    console.info("[server2]: server started on port 5001")
})


function registerClients(req, res, next) {
    console.log("req: ", req)
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
    const date = Date.now()
    const msg = `id: Stark\ndata: M-${new Date(date).toUTCString()}\n\n`

    clients.forEach(({id, res}) => {
        res.write(msg)
    })
}

function noticeEvents() {
    const date = Date.now()
    const msg = `event: notice\ndata: N-${new Date(date).toUTCString()}\n\n`

    clients.forEach(({id, res}) => {
        res.write(msg)
    })
}