const qrcode = require("qrcode-terminal")
const {Client, LocalAuth} = require("whatsapp-web.js")
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "client1"
    })
})

require('dotenv').config()
const forwardTo = process.env.TO +"@c.us"

client.on('qr', qr => {
    qrcode.generate(qr, {small: true})
})

client.on('ready', ()=>{
    console.log('Client is ready')
})

client.on('message', (msg)=>{
    const from = msg.from.split('@')[0]
    const message = msg.body
    const nickname = msg._data.notifyName
    
    var forwardMsg = ""
    console.log(msg)
    forwardMsg += `Pesan dari: ${from}\n`
    forwardMsg += `Nickname: ${nickname}\n`
    forwardMsg += `Pesan:\n${message}`

    client.sendMessage(forwardTo, forwardMsg)
})

client.initialize()