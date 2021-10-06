function wsSetup() {
    const content = document.getElementById('content');
    const socket = new WebSocket('ws://localhost:3000');

    socket.onopen = function () {
        // Sending to server
        socket.send('Hello from client!');
    };

    // Receiving from server
    socket.onmessage = function (message) {
        content.innerHTML += message.data +'<br />';
    };

    socket.onerror = function (error) {
        console.log('WebSocket error: ' + error);
    };
};
