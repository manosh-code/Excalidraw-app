import axios from "axios";
import { BACKEND_URL } from "../../config";


async function getRoom (slug: string){
    const response = await axios.get(`${BACKEND_URL}/rooms/${slug}`);
    return response.data;
}

export default async function chatRoom({
    params
}: {
    params: {
        slug: string
    }
}) {
    const slug = params.slug;
    const room = await getRoom(slug);
    return <div>{JSON.stringify(room)}</div>;
}