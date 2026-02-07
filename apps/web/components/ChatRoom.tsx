import axios from "axios"
import { BACKEND_URL } from "../app/config";


async function getChats(roomid: string){
    const response = await axios.get(`${BACKEND_URL}/rooms/${roomid}/chats`)
    return response.data.messages
}

export  function ChatRoom({id}: {
    id: string
}) {
    
}