
import axios from "axios";
import { HTTP_BACKEND } from "@/config";

export async function getExistingShapes(roomId: string) {
    const response = await axios.get(`${HTTP_BACKEND}/rooms/${roomId}`);
    const message = response.data.message;

    const shape = message.map((x : {message: string}) => {
        const messageData = JSON.parse(x.message);
        return messageData.shape ;
    })
    return shape;
}