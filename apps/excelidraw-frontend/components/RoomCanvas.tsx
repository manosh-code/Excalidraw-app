" use client";

import { useRef , useEffect, useState} from "react";
import { Canvas } from "@/components/Canvas";

import { WS_URL } from "@/config";

export function RoomCanvas({roomId}: {roomId: string}){

    
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=${localStorage.getItem("token")}`);

        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join",
                roomId
            }));
        }
    }, [])

    

    if (!socket){
        return <div className="flex items-center justify-center h-screen text-2xl font-bold">
            connecting to server.....
        </div>
    }

    
    return <div>
        <Canvas roomId={roomId} socket={socket} />
    </div>;
}

