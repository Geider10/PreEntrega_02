import express from "express"
import {Server} from "socket.io"
import productsRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/carts.routes.js"

//config de handlebars
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import routerIO from "./routes/views.routes.js"

const app = express()
const PORT = process.env.PORT ?? 8080

app.use(express.json())
app.use(express.urlencoded({extended : true}))//recibir parametros por url

app.use("/api/productsRouter",productsRouter)
app.use("/api/cartsRouter",cartsRouter)

//handlebars
app.engine("handlebars",handlebars.engine())//instanciar el motor
app.set("views",__dirname + "/views")
app.set("view engine", "handlebars")//motor se renderiza con handlebars
app.use(express.static(__dirname + "/public"))

const httpServer = ""  
app.listen(PORT,()=>console.log(`escuchando el puerto ${PORT}`))
const socketServer = new Server(httpServer)
socketServer.on("connection", socket=>{
    console.log("hola soy el servidor")
   
    socket.on("add", data=>{  // ID del evento
        console.log(data)
        // messages.push(data)
        data.emit("formResponse","data recibiida")
    })

    // socket.on("add",data=>{
    //     console.log(data)
    // })
})
const router = routerIO(socketServer)
app.use("/",router)


