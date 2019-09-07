
const ip = require('ip')
const portFinder = require('portfinder')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const nextHandler = nextApp.getRequestHandler()

const {CONNECTION_ESTABLISHED}  = require('../utilities/constants')


portFinder.getPort({
    port: 8000,
    stopPort: 9000
}, async (err,port) =>{

    if(err){
        console.error("No Ports available", err)
        process.exit(1);
    }


    await nextApp.prepare()

    const app = require('express')()
    const http = require('http').createServer(app)
    const io = require('socket.io')(http);
    const ipAddress = ip.address()

    app.get('/getConnectionInfo', (req,res)=>{
        res.json({port,ipAddress})
    })

    app.get('*', (req,res) => {
        nextApp.render(req,res,'/',{ipAddress,port})
    })


    const server = http.listen(port,ipAddress, ()=>{
        var host = server.address().address;
        var port = server.address().port;
        console.log('running at http://' + host + ':' + port)
    });

    io.on('connection', function (socket) {
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });

        socket.on(CONNECTION_ESTABLISHED, (data)=>{
            console.log(data)
        })
    });
})



