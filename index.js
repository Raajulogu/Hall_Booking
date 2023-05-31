import express from "express";
import { Hall_details } from "./Rout/HallBooking.js";

let app=express()
app.use(express.json())

let PORT=9090;

app.use("/Hall-Details",Hall_details)


app.listen(PORT,()=>console.log(`Server running in localhost:${PORT}`))