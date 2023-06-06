const qrcode = require("qrcode-terminal")
const {Client, LocalAuth} = require("whatsapp-web.js")
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "client1"
    }),
    puppeteer: {
        headless: true,
		args: ['--no-sandbox'],
	}
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

    if(msg.body.split(" ")[0].toLowerCase() == "b" && msg.from == forwardTo){
        console.log(msg.body.split(" "))
        const replyTo = msg.body.split(" ")[1].split("\n") + "@c.us"
        const replyMsg = msg.body.split("|")[1].slice(2)
        if(replyTo && replyMsg){
            client.sendMessage(replyTo, replyMsg)
        }
        console.log("Reply to ", replyTo)
        return
    }

    const isPC = msg.from.includes("@c")
    
    if(isPC){
        var forwardMsg = ""
        console.log(msg)
        forwardMsg += `Pesan dari: ${from}\n`
        forwardMsg += `Nickname: ${nickname}\n`
        forwardMsg += `Pesan:\n${message}`
    
        strReply = "Copy pesan dibawah ini dan isi pesan untuk membalas"
        formatReply = `b ${from} | \n`
    
    
        client.sendMessage(forwardTo, forwardMsg)
        client.sendMessage(forwardTo, strReply)
        client.sendMessage(forwardTo, formatReply)
    }
    
})

client.initialize()