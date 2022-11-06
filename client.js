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
            appendMessages(message.user, message.msg)
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
    const html = `<div>${user} : ${message}</div>`
    messages.innerHTML += html
}