let express=require("express");

let app=express()
app.use(express.json())

const hallData = [
    {
      id: "1",
      numberOfSeats: 100,
      amenities: ["Ac", "chairs", "discolights"],
      price: 5000,
      ifBooked: "true",
      customerName: "Sanjay",
      date: "05-feb-2022",
      startTime: "10-feb-2022 at 12PM",
      endTime: "11-feb-2020 at 11am",
      RoomId: 201,
      RoomName: "Duplex",
    },
    {
      id: "2",
      numberOfSeats: 100,
      amenities: ["Ac", "chairs", "discolights"],
      price: 5000,
      ifBooked: "false",
      customerName: "",
      date: "",
      startTime: "",
      endTime: "",
      RoomId: 202,
      RoomName: "Duplex",
    },
    {
      id: "3",
      numberOfSeats: 50,
      amenities: ["Ac", "chairs"],
      price: 3000,
      ifBooked: "false",
      customerName: "",
      date: "",
      startTime: "",
      endTime: "",
      RoomId: 203,
      RoomName: "Classic",
    },
    {
      id: "4",
      numberOfSeats: 100,
      amenities: ["Ac", "chairs", "discolights"],
      price: 5000,
      ifBooked: "true",
      customerName: "Suresh",
      date: "03-feb-2022",
      startTime: "15-feb-2022 at 12PM",
      endTime: "16-feb-2020 at 11am",
      RoomId: 204,
      RoomName: "Duplex",
    },
    {
      id: "5",
      numberOfSeats: 200,
      amenities: ["Ac", "chairs", "discolights", "buffet"],
      price: 9000,
      ifBooked: "true",
      customerName: "Vidhya",
      date: "06-feb-2022",
      startTime: "11-feb-2022 at 12PM",
      endTime: "12-feb-2020 at 11am",
      RoomId: 205,
      RoomName: "Suite",
    }
  ];


//Full Hall Details
app.get("/hall-details",(req,res)=>{
    let {roomtype,ifBooked}=req.query;
    console.log(roomtype)
    let filtered
    if(roomtype){
        filtered=hallData.filter((room)=>room.RoomName===roomtype)
        return res.send(filtered)
    }
    res.send("Room not found")
})

//1. Adding a room to the hallData
app.post("/add/hall-details",(req,res)=>{
    let newHall={
        id:hallData.length+1,
        numberOfSeats: req.body.numberOfSeats,
        amenities: req.body.amenities,
        price: req.body.price,
        ifBooked: req.body.ifBooked,
    };
    hallData.push(newHall)
    return res.send(hallData)
})

//Available Rooms
app.get("/available-rooms",(req,res)=>{
    let filtered=hallData.filter((room)=>room.ifBooked=="false")
    if(filtered.length==0){
        return res.send("Sorry no rooms Available Now")
    }
    
    res.send(filtered)
})

//2. Book a room with using the id
app.put("/book/hall-details/:id",(req,res)=>{
    let {id}=req.params;
    let filtered =hallData.filter((room)=>room.id==id)
    if(filtered[0].ifBooked==="true"){
        return res.status(400).send("Room already booked")
    }
    let newHall={
        id: hallData[id-1].id,
        numberOfSeats: hallData[id-1].numberOfSeats,
        amenities:hallData[id-1].amenities,
        price: hallData[id-1].price,
        ifBooked:"true",
        customerName: req.body.customerName,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        RoomId: hallData[id-1].RoomId
    };
    hallData[id-1]=newHall
    res.send(newHall)
    
})

//3. Booked Rooms
app.get("/booked-rooms",(req,res)=>{
  let filtered=hallData.filter((room)=>room.ifBooked=="true")
  let data=[]
  if(filtered.length==0){
      return res.send("Sorry no rooms Available Now")
  }
  filtered.forEach((element) => {
    data.push({RoomName:element.RoomName,
              ifBooked:element.ifBooked,
              customerName:element.customerName,
              date:element.date,
              startTime:element.startTime,
              endTime:element.endTime})
  });
  
  res.send(data)
})

//4.Booked Customers
app.get("/booked-customers",(req,res)=>{
  let filtered=hallData.filter((room)=>room.ifBooked=="true")
  let data=[]
  if(filtered.length==0){
      return res.send("Sorry no rooms Available Now")
  }
  filtered.forEach((element) => {
    data.push({customerName:element.customerName,
              RoomName:element.RoomName,
              date:element.date,
              startTime:element.startTime,
              endTime:element.endTime})
  });
  
  res.send(data)
})


//5.No of times a customer booked
app.get("/no_of_times-boked",(req,res)=>{
  let filtered=hallData.filter((room)=>room.ifBooked=="true")
  let data=[]
  let count=0;
  if(filtered.length==0){
      return res.send("Sorry no rooms Available Now")
  }
  filtered.forEach((element) => {
    count=0;
    filtered.map((e)=>{
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
    res.send(data)
  });

app.listen(9000,()=>console.log("Server running in localhost:9000"))