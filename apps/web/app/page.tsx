"use client";
import { useRouter } from "next/dist/client/components/navigation";
import styles from "./page.module.css";
import { useState } from "react";


export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw"
    }}>
      <div>
        <input style = {{
          padding: 10
        }} value={roomId} onChange={(e) => setRoomId(e.target.value)
          }  type= "text" placeholder="Enter Room ID" /> 
        <button style={{
          padding: 10
        }} onClick={() => router.push(`/rooms/${roomId}`)}>Join Room</button>
      </div>

    </div>
  )
}