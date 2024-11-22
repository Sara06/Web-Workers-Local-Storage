(function(win, doc) {

    win.onload = init;

    var startButton;
    var results = [];
    var sum = 0;
    var numWorkers;
    var numResults;


    function init() {
    	startButton = doc.getElementById("startButton");
    	startButton.onclick = sendDataToWorkers;
    }

    // Handle messages received from the Web Worker
    function handleReceipt(event) {

        numResults++;

        var itemsList = doc.getElementById("items");
        var item = doc.createElement("li");
        
        sum += event.data.result;
        var result = JSON.stringify(event.data);
        results[event.data.index] = result;
        localStorage.setItem("part3", results);
        item.innerHTML = result;
        items.appendChild(item);

        displaySum();
        displayStorage();

        if (numResults == numWorkers) {
            startButton.disabled = false;
        }
    }

    // send messages to the Web Workers
    function sendDataToWorkers(e) {

        startButton.disabled = true;

        sum = 0;
        numResults = 0;
        
        results = [];
        localStorage.setItem("part3", results);

        doc.getElementById("sum").innerHTML = 0;
        doc.getElementById("items").innerHTML = '';
        doc.getElementById("storageItems").innerHTML = '';

        numWorkers = parseInt(doc.getElementById("numWorkers").value) || 5;
        
    	let range = parseInt(doc.getElementById("range").value) || 100;
        let eachOne = Math.round(range / numWorkers);

        for (let i = 0; i < numWorkers; i++) {
            let myWorker = new Worker("computeWorker.js");
            myWorker.onmessage = handleReceipt;
            myWorker.postMessage({'index': i, 'start': (i*eachOne + 1) , 'end': (i+1)*eachOne});
        }

    }

    // display new storage events
    function displayStorage() {

        let value = localStorage.getItem("part3");
        var output = doc.getElementById("storageItems");
        // create a line item and add to the end of the list
        var item = doc.createElement("li");
        item.innerHTML = value;
        output.appendChild(item);
    }

    // display sum
    function displaySum() {
        var output = doc.getElementById("sum");
        output.innerHTML = sum;
    }

})(window, document);

























