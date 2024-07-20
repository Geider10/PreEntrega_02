const socket = io()
// instanciamos un socket al cliente 
socket.emit("start","hola soy el cliente")
const formu = document.getElementById("formu")
const btnAdd = document.getElementById("btnAdd")
const btnDelete = document.getElementById("btnDelete")
const btnSend = document.getElementById("btnSend")
const btnCancel = document.getElementById("btnCancel")
const iptId = document.getElementById("iptId")
const iptName = document.getElementById("iptName")
let typeAction ="add"

const restartForm = ()=>{
    btnDelete.removeAttribute("disabled")
    btnAdd.removeAttribute("disabled")
    iptId.removeAttribute("disabled")
    iptName.removeAttribute("disabled")
    iptId.value =""
    iptName.value =""
    typeAction =""
}
formu.addEventListener("submit",(e)=> {
    e.preventDefault()
    const formData = new FormData(this)
    const data = {}
    formData.forEach((value,key)=>{
        data[key] = value
    })
    socket.emit("add",data)
})
socket.on("formResponse", (message)=>{
    console.log("respuesta servidor: ",message);
})
btnAdd.addEventListener("click",()=>{
    btnDelete.setAttribute("disabled", "true")
    iptId.setAttribute("disabled", "true")
    typeAction ="add"
})
btnDelete.addEventListener("click",()=>{
    btnAdd.setAttribute("disabled", "true")
    iptName.setAttribute("disabled", "true")
    typeAction ="delete"
})
// btnSend.addEventListener("click",()=>{
//     const txtId = iptId.value
//     const txtName = iptName.value

//     if(typeAction == "add" && txtName.length > 1){
//         socket.emit("add",{type : typeAction, body : txtName})
//         console.log(txtName);
//         // restartForm()
//     }
//     else if(typeAction == "delete" ){
//         socket.emit("delete",{type : typeAction, body : txtId})
//         restartForm()
//     }
// })

btnCancel.addEventListener("click",()=>{
    restartForm()
})