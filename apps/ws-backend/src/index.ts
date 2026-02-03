import {WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: 8080 });

interface User{
    ws : WebSocket
    rooms : string[]
    userId : string
}
const users : User[] = [];

function checkUser(token : string){
    const decoded = jwt.verify(token , JWT_SECRET);
    if ( typeof decoded == "string"){
        return null;
    }

    if (!decoded || !(decoded ).userId){
        return null;
    }

    return decoded.userId;
}

wss.on('connection', function connection(ws , request){

    const url = request.url;

    if(!url){
        return ws.close();
    }

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";
    const userId = checkUser(token);

    if(!userId){
        ws.close();
        return null;
    }


    users.push({
        ws,
        rooms: [],
        userId
    })

    ws.on('message', function message(data){
        const parseData = JSON.parse(data as unknown as string);   // { type: "join-room", roomId: "room1" }

        if (parseData.type === "join-room"){
            const user = users.find(x => x.ws === ws);
            user?.rooms.push(parseData.roomId);
        }

        if (parseData.type === "leave-room"){
            const user = users.find(x => x.ws === ws);
            if(!user) return ;
            user.rooms = user.rooms.filter(x => x !== parseData.roomId);

        }


        if(parseData.type === "chat"){
            const roomId = parseData.roomId;
            const message = parseData.message;

            users.forEach(user => {
                if(user.rooms.includes(roomId)){
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId
                    }))
                }
            })
        }
    });

})