const events = new EventSource("http://localhost:5000/sse", {
    withCredentials: true,
})

console.log(events.readyState)
console.log(events.url)
console.log(events.withCredentials)

const ol = document.querySelector('ol')

console.log("first: ", ol)


events.onmessage = (e) => {
    // console.log("Messages: ", e.data, e.lastEventId, e.origin)
    const li = document.createElement("li")
    li.textContent = `$MESSAGE=========::${e.lastEventId}: ${e.data}`
    ol.appendChild(li)
}


    events.onerror = (e) => {
        console.log("Error in events source")
        console.log(e)
    }
    
    events.onopen = (e) => {
        console.log("Opening in events source")
    }
    
    
events.addEventListener("notice", (e) => {
        const li = document.createElement("li")
        li.textContent = `$NOTICE ============::${e.lastEventId}: ${e.data}`
        ol.appendChild(li)
        
    })
