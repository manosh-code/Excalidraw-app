
import { useRef, useEffect, useState } from "react";
import { initDraw } from "@/draw";
import { RectangleHorizontal } from "lucide-react";
import { Circle } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { LineButton } from "@/components/Icons";


type shape = "pencil" | "rect" | "circle"
export function Canvas({
    roomId,
    socket
}: {
    roomId: string;
    socket: any;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState<shape>("circle");

    useEffect(() => {
        //@ts-ignore
        window.selectedTool = selectedTool;
    })


    useEffect(() => {
        if (canvasRef.current) {
            initDraw(canvasRef.current, roomId, socket);
        }
    }, [roomId, socket]);

    return <div>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />
        <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
}

function TopBar({selectedTool, setSelectedTool}:{
    selectedTool: shape;
    setSelectedTool: (tool: shape) => void;
}){

    return (
        <div style={{ position: "fixed", top: 10, left: 10, right: 10 }}>
            <div className="w-full h-16 bg-gray-800 flex items-center justify-start gap-4 p-4">
                <LineButton icon={<PlusIcon />} onClick={() => setSelectedTool("pencil")} activated={selectedTool === "pencil"} />
                <LineButton icon={<RectangleHorizontal />} onClick={() => setSelectedTool("rect")} activated={selectedTool === "rect"} />
                <LineButton icon={<Circle />} onClick={() => setSelectedTool("circle")} activated={selectedTool === "circle"} />
            </div>
        </div>
    );
}