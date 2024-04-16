import { log } from "./subsjs/login.js"
import { whichTransport } from "./subsjs/transport.js"

const localPage = '/login/index.html'
const localTransport = '/transportadora/index.html'

const local = window.location.pathname

if(local == localPage){
    log()
}

if(local == localTransport){
    whichTransport()
}

















