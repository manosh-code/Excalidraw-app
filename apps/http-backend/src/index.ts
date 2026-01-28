import express from "express";
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";

const app = express();


app.post("/signup", (req, res) => {

})

app.post("/signup", (req, res) => {
    const userId = 1;
    const token =jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({ token });

    // Handle signup logic
})

app.post("/room" , middleware, async(req, res) => {
    
    // Handle room creation logic
})

app.listen(3001, () =>{
    console.log("Server is running on port 3001");
})