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


### TODO



### Extension
