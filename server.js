const mongoose = require('mongoose');
const Msg = require('./models/messages');
const io = require('socket.io')(3000)

const mongoDB = 'mongodb+srv://<username>:<password>@cluster0.sqenbc7.mongodb.net/chats?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected')
}).catch(err => console.log(err))

io.on('connection', (socket) => {
    Msg.find().then(result => {
        socket.emit('output-messages', result)
    })
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chatmessage', (user, msg) => {
        console.log(user + ' sends a msg: '+ msg);
        const message = new Msg({ user, msg });
        message.save().then(() => {
            io.emit('message', user, msg)
        })
    })
});
