import express from "express"
import { AddRooms, AvailableRooms, BookRooms, BookedRooms } from "../Controllers/HallBooking.js";



let router=express.Router();


//1. Adding a room to the hallData
router.post("/add_Hall",async (req,res)=>{

    try {
        let newHall=req.body;
        if(!newHall){
            return res.status(400).json({data:"No details Provided"})
        }
        let result= await AddRooms(newHall)
        res.status(400).json({data:{result:result,message:"Romm Added Successfully"}})
    } catch (error) {
        console.log(error);
        res.status(500).json({data:"Internal Server Error"})
    }

})

//Available Rooms
router.get("/available-rooms",async (req,res)=>{

  try {
    let data=await AvailableRooms()
    if(data.length==0){
      return res.status(400).json({data:"Sorry no rooms Available Now"})
  }
  res.status(200).json({data:data})
  } catch (error) {
    console.log(error);
    res.status(500).json({data:"Internal Server Error"})
  }
    

})

//2. Book a room with using the id
router.put("/book/:id",async (req,res)=>{
    try {
        let {id}=req.params;
        let bookedHall=req.body;
        if(!bookedHall){
            return res.status(400).json({data:"Room Not Booked"})
        }
        let result=await BookRooms(id,bookedHall)
        res.status(200).json({data:{result:result,message:"Room booked Successfully"}})
    } catch (error) {
        console.log(error);
        res.status(500).json({data:"Internal Server Error"})
    }
})

//3. Booked Status of all Rooms
router.get("/booked-rooms",async (req,res)=>{
    try {
        let rooms=await AvailableRooms()
        let data=[]
        if(rooms.length==0){
          return res.status(400).json({data:"Sorry no rooms Available Now"})
      }
      rooms.forEach((element) => {
        data.push({RoomName:element.RoomName,
                ifBooked:element.ifBooked,
                customerName:element.customerName,
                date:element.date,
                startTime:element.startTime,
                endTime:element.endTime})
      });
  res.status(200).json({data:[...data]})
      } catch (error) {
        console.log(error);
        res.status(500).json({data:"Internal Server Error"})
      }
})

//4.Booked Customers
router.get("/booked-customers",async(req,res)=>{
    try {
        let rooms=await BookedRooms()
        let data=[]
  if(rooms.length==0){
      return res.status(400).json({data:"Sorry no rooms Available Now"})
  }
  rooms.forEach((element) => {
    data.push({customerName:element.customerName,
            RoomName:element.RoomName,
            date:element.date,
            startTime:element.startTime,
            endTime:element.endTime})
  });
  res.status(200).json({data:data})
      } catch (error) {
        console.log(error);
        res.status(500).json({data:"Internal Server Error"})
      }
})


//5.No of times a customer booked
router.get("/no_of_times-boked",async (req,res)=>{
    try {
        let rooms=await BookedRooms()
        let data=[]
        let count;
  if(rooms.length==0){
      return res.status(400).json({data:"Sorry no rooms Available Now"})
  }
  rooms.forEach((element) => {
    count=0;
    rooms.map((e)=>{
      if(e.customerName==element.customerName){
        count++;
      }
    })

    data.push({NoOfTimesBooked:count,
              customerName:element.customerName,
              RoomName:element.RoomName,
              date:element.date,
              startTime:element.startTime,
              endTime:element.endTime,
              id:element.id,
              })
    })
  res.status(200).json({data:data})
      } catch (error) {
        console.log(error);
        res.status(500).json({data:"Internal Server Error"})
      }
  });

  export let Hall_details=router;
