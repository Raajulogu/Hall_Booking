import { ObjectId } from "bson";
import { client } from "../db.js";

export function AddRooms(data){
    return client
    .db("Hall_Booking").collection("Hall")
    .insertOne({data})
}

export function AvailableRooms(){
    return client
    .db("Hall_Booking").collection("Hall")
    .find().toArray()
}

export function BookRooms(id,newdHall){
    return client
    .db("Hall_Booking").collection("Hall")
    .findOneAndUpdate({_id:new ObjectId(id)},{$set:newdHall})
}

export function BookedRooms(){
    return client
    .db("Hall_Booking").collection("Hall")
    .find({ifBooked:"true"}).toArray()
}
