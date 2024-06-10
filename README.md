# sse
a simple server demo for "server-side-events"

## v1 branch
this is a simple demo where an express server sends updates to the frontend

## v2 branch
this is a demo where the polyfill Eventsource `npm i eventsource" is used to communicate server-server
- This could be solved by manually implementing events. This is what was done in the actual eventsource polyfill. Just be sure to establish the correct headers 
```js
Content-Type: text/event-stream
Connection: keep-alive
// and for reconnection
Last-Event-Id: id
```

### FIX
The `eventsource librarry won't work without a this line

```js
global.EventSource = eventsource
```

[Gitbub issue]("https://github.com/pocketbase/pocketbase/discussions/530")

### Useful links
https://web.dev/articles/eventsource-basics
https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
https://developer.mozilla.org/en-US/docs/Web/API/EventSource

### Notes
console.log("Messages: ", e.data, e.lastEventId, e.source, e.ports, e.origin)
eventsource api use the MessageEvent interface, but only e.data, e.origin & e.lastEventId (id) are accessible. The other fields are for cross messaging (check st3v3 coursse)

### Setup
1. `npm run dev:1` && `npm run dev:2` in separate terminal


### TODO
1. same as for the server-browser

### Extension
1. same as for the server-browser


