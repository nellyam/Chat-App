const socket = io.connect('http://localhost');

// Retrieve the name in the URL
const username = window.location.pathname.substring(6);
socket.emit('userConnected', username);

const sendBtn = document.querySelector('#send');

sendBtn.addEventListener('click', evt => {
    evt.preventDefault();

    const message = document.querySelector('#message').value;

    if (message) {
        socket.emit('newMsg', {message});
    }

});

socket.on('addNewMsg', message => {
    createMsgHtml(message);
    document.querySelector('#message').value = "";
});

function createMsgHtml(message) {
    const container = document.querySelector('#msgBox');


    const divMedia = document.createElement('div');
    divMedia.className = "media w-50 mb-3";

    const divMediaBody = document.createElement('div');
    divMediaBody.className = "media-body";

    const divContainerMsg = document.createElement('div');
    divContainerMsg.className = "rounded py-2 px-3 mb-2 shadow";

    const pMsg = document.createElement('p');
    pMsg.className = "text-small mb-0";
    pMsg.innerText = message.content;

    const pInfos = document.createElement('p');
    pInfos.className = "small text-muted";
    pInfos.innerText = message.user + ' - ' + message.date;

    // Add some class if we are on the current user or not
    if(message.user === username) {
        divMedia.classList.add('ml-auto');
        divContainerMsg.classList.add('bg-primary');
        pMsg.classList.add('text-light');
    }
    else {
        divMediaBody.classList.add('ml-3');
        divContainerMsg.classList.add('bg-light');
        pMsg.classList.add('text-muted');
    }

    divMedia.appendChild(divMediaBody);
    divMediaBody.appendChild(divContainerMsg);
    divMediaBody.appendChild(pInfos);
    divContainerMsg.appendChild(pMsg);

    container.appendChild(divMedia);
}
