self.onmessage = messageHandler;
// or,
//addEventListener("message", messageHandler, true);


function messageHandler(e) {
    let data = e.data;
   
    console.log("Received", data);
    let result = 0;
    let start = parseInt(data.start);
    let end = parseInt(data.end);
    if (start && end) {
        for (let i = start; i <= end; i++) {
            result += i;
        }
    }
    data.result = result;

    // Timeout deplay optional

    setTimeout(function () {
        self.postMessage(data);
        self.close();
    }, Math.floor(Math.random() * 10000));

    
}

