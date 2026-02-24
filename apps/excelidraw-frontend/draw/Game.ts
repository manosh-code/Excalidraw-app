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

    constructor(canvas: HTMLCanvasElement, roomID: string , socket: WebSocket){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.existingShapes = [];
        this.roomID = roomID;
        this.socket = socket;
        this.init();
        this.initHandlers();
    }

    async init() {
        // Initialization logic here
        this.existingShapes = await getExistingShapes(this.roomID);
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
            ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
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
}