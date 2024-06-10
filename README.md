# sse
a simple server demo for "server-side-events"

## v1 branch
this is a simple demo where an express server sends updates to the frontend

## v2 branch
this is a demo where the polyfill Eventsource `npm i eventsource" is used to communicate server-server

### Useful links
https://web.dev/articles/eventsource-basics
https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
https://developer.mozilla.org/en-US/docs/Web/API/EventSource

### Notes
console.log("Messages: ", e.data, e.lastEventId, e.source, e.ports, e.origin)
eventsource api use the MessageEvent interface, but only e.data, e.origin & e.lastEventId (id) are accessible. The other fields are for cross messaging (check st3v3 coursse)

### Setup
1. start the static/index.html on port 5500 (vscode liverserver default port)
2. start the server via npm run dev

### TODO
1. Proper error handling
2. Scaling by storing client res object in either redis or whatnot (solution similar to scaling websocket)
3. Browser reconnection (check the event.retry field to specify retry timoeout)
4. Handle situation where client is not online (optional pull missed messages or proceed from that point on) - leverage the event.id/lastEventId field which is sent in the `Last-Event-Id` header on reconnection. Need to store this on client side.