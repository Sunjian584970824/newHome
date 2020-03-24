const app = require('express')
const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(9000)
let oSockets = []
let user = []
let n = 0
io.sockets.on('connection', socket => {
    console.log('用户链接成功')
    socket.on('online', data => {
            if (data === true) {
                io.emit('online', oSockets) //给所有连接用户广播
            } else {

                if (!data.user) {
                    n++
                    data.user = '游客' + n
                    data.n = n
                }
                oSockets.push(data)
                user.push(data)
                io.emit('online', oSockets) //给所有连接用户广播
                    // socket.emit('online', oSockets)//单独广播
            }

        })
        // 断开连接
    socket.on('disconnect', () => {
        oSockets.filter(item => item !== socket)
        console.log('用户离线')
    })
})