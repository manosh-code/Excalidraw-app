import express from "express";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { CreateUserSchema , SigninSchema , CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {

    const parseData = CreateUserSchema.parse(req.body);
    if(!parseData.success){
        return res.status(400).json({
            message: "Invalid data"
        })
        return;
    }
    // db call
    try {
        const user = await prismaClient.user.create({
            data: {
                email: parseData.data?.email,
                // hash the password
                password: parseData.data.password,
                name: parseData.data.name,
                
            } 
        })
        res.json({
            userId: user.id
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }

})


app.post("/signin", async (req, res) => {
    const parseData = SigninSchema.parse(req.body);
    if(!parseData.success){
        return res.status(400).json({
            message: "Invalid data"
        })
        return;
    }
    // compare the hashed pw here
    const user = await prismaClient.user.findFirst({
        where: {
            email : parseData.data.username,
            password: parseData.data.password
        }
    })

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
        return;
    }
    const token =jwt.sign({
        userId: user?.id
    }, JWT_SECRET);

    res.json({ token });

    // Handle signup logic
})

app.post("/room" , middleware, async(req, res) => {
    const parseData = CreateRoomSchema.parse(req.body);
    if(!parseData.success){
        return res.status(400).json({
            message: "Invalid data"
        })
        return;
    }
    // @ts-ignore :   fix this
    const userId = req.userId;

    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parseData.data.name,
                adminId: userId
            }
        })

        res.json({
            userId: room.adminId
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "room already exists "
        })
    }
    
    // Handle room creation logic
})

app.listen(3001, () =>{
    console.log("Server is running on port 3001");
})