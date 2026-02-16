
import { useRef, useEffect } from "react";
import { initDraw } from "@/draw";

export function Canvas({
    roomId,
    socket
}: {
    roomId: string;
    socket: any;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            initDraw(canvasRef.current, roomId, socket);
        }
    }, [roomId, socket]);

    return <div>
        <canvas ref={canvasRef} width={2000} height={2000} />
    </div>
}
