const socket = io('http://localhost:3000');
const messages = document.getElementById('messages');
const msgForm = document.getElementById('msgForm');

socket.on('message', (user, data) => {
    console.log(user)
    console.log(data)
    appendMessages(user, data)
})
socket.on('output-messages', data => {
    console.log(data)
    if (data.length) {
        data.forEach(message => {
            // var username = "User";
            appendMessages(message.msg, message.msg)
        });
    }
})

msgForm.addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('chatmessage', msgForm.user.value, msgForm.msg.value)
    console.log('submit from '+ msgForm.user.value + ' with ' + msgForm.msg.value)
    msgForm.msg.value = '';

})

function appendMessages(user, message) {
    const html = `<div>${user} + ${message}</div>`
    messages.innerHTML += html
    // var message = document.createElement('div');
    // message.setAttribute('class', 'chat-message');
    // message.textContent = ${message}+": "+message;
    // // message.textContent = data[x].name+": "+data[x].message;
    // console.log(message.msg);
    // messages.appendChild(message);
    // messages.insertBefore(message, messages.firstChild);
}