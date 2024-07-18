import express from "express"
import productsRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/carts.routes.js"
import {Server} from "socket.io"

//config de handlebars
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import homeRouter from "./routes/home.routes.js"


const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended : true}))//recibir parametros por url

app.use("/",productsRouter)
app.use("/",cartsRouter)

//handlebars
app.engine("handlebars",handlebars.engine())//instanciar el motor
app.set("views",__dirname + "/views")
app.set("view engine", "handlebars")//motor se renderiza con handlebars
app.use(express.static(__dirname + "/public"))

app.use("/",homeRouter)


const httpServer = app.listen(PORT,()=>console.log("escuchando el puerto 8080"))
const socketServer = new Server(httpServer)
socketServer.on("connection", socket=>{
    console.log("hola soy el servidor")

    // ID del evento
    socket.on("message", data=>{
        console.log(data)
        // messages.push(data)
        // socketServer.emit("messageLogs",messages)
    })
})
