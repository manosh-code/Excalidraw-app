import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

type Shape = {
    type: "rect" ;
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "pencil";
    startX : number;
    startY : number;
    endX : number;
    endY : number;
}



export class Game{

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;
    private existingShapes:  Shape[];
    private roomID: string;
    private socket: WebSocket;
    private clicked: boolean;
    private startX: number = 0;
    private startY: number = 0;
    private selectedTool: Tool = "circle";

    constructor(canvas: HTMLCanvasElement, roomID: string , socket: WebSocket){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.existingShapes = [];
        this.roomID = roomID;
        this.clicked = false;
        this.socket = socket;
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
    }


    setShape(tool: Tool){
        this.selectedTool = tool;
    }

    async init() {
        // Initialization logic here
        this.existingShapes = await getExistingShapes(this.roomID);
        this.clearCanvas();
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
                const message = JSON.parse(event.data);

                if (message.type === "chat"){
                    const parsedShape = JSON.parse(message.message);
                    this.existingShapes.push(parsedShape.shape);
                    this.clearCanvas();
                }
            
        };
    }
    clearCanvas(){
        const ctx = this.ctx;
        if (!ctx) return;


       ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
       ctx.fillStyle = "rgba(0,0,0)";
       ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

       this.existingShapes.forEach((shape) => {
        if(shape.type === "rect"){
            ctx.strokeStyle = "rgba(255,255,255)";
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape.type === "circle"){

            ctx.strokeStyle = "rgba(255,255,255)";
            ctx.beginPath();
            ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
        } else if (shape.type === "pencil"){
            ctx.strokeStyle = "rgba(255,255,255)";
            ctx.beginPath();
            ctx.moveTo(shape.startX, shape.startY);
            ctx.lineTo(shape.endX, shape.endY);
            ctx.stroke();
            ctx.closePath();
        }
    });
}

initMouseHandlers() {
        if (!this.canvas) return;

        this.canvas.addEventListener("mousedown", (e: MouseEvent) => {
                this.clicked = true;
                this.startX = e.clientX;
                this.startY = e.clientY;
            });

        this.canvas.addEventListener("mouseup", (e: MouseEvent) => {
                this.clicked = false;
                console.log("Mouse released");
                const width = e.clientX - this.startX;
                const height = e.clientY - this.startY;

                // @ts-ignore
                const selectedTool = this.selectedTool;
                let shape: Shape | null = null;
                if (selectedTool === "rect") {
                    shape = {
                        // @ts-ignore
                        type: window.selectedTool,
                        x: this.startX,
                        y: this.startY,
                        width,
                        height
                    }
                    
                } else if (selectedTool === "circle") {
                    shape = {
                        // @ts-ignore
                        type: window.selectedTool,
                        centerX: this.startX,
                        centerY: this.startY,
                        radius: Math.sqrt(width * width + height * height)
                    }
                    
                } else if (selectedTool === "pencil"){
                    shape = {
                        // @ts-ignore
                        type: window.selectedTool,
                        startX: this.startX,
                        startY: this.startY,
                        endX: e.clientX,
                        endY: e.clientY
                    }
                }

                if (!shape) return;

                this.existingShapes.push(shape)

                this.socket.send(JSON.stringify({
                    type: "chat",
                    message: JSON.stringify({
                        shape
                    }),
                    roomId : this.roomID
                }))


            });

            this.canvas.addEventListener("mousemove", (e) => {

            if (this.clicked) {
                const width = e.clientX - this.startX;
                const height = e.clientY - this.startY;

                this.clearCanvas();

                const ctx = this.ctx;
                if (!ctx) return;

                ctx.strokeStyle = "rgba(255,255,255)";
            
                // @ts-ignore
                const selectedTool = this.selectedTool;
                console.log("selectedTool", selectedTool);
                if (selectedTool === "rect") {
                    ctx.strokeRect(this.startX, this.startY, width, height);
                } else if (selectedTool === "circle") {
                    const radius = Math.max(width, height) / 2;
                    const centerX = this.startX + radius;
                    const centerY = this.startY + radius;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        });
    }
}


