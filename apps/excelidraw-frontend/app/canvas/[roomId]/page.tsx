"use client";

import { useEffect, useRef } from "react";
import { initDraw } from "@/draw";

export default function Canvas(){

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect (() => {

        if(canvasRef.current){
            

         

            initDraw(canvasRef.current);
        }

    }, [canvasRef])
    return <div>
        <canvas ref={canvasRef} width={2000} height={2000}  />
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <button className="bg-yellow text-shadow-black">RECT</button>
            <br />
            <button className="bg-yellow text-shadow-black">CIRCLE</button>
        </div>
    </div>
}


