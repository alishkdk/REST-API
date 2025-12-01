const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors = require("cors");
app.use(cors()); 
const PORT=5000;
const fs=require('fs')
const users=require('./MOCK_DATA.json');


// Parse JSON body
app.use(express.json());

//Routes
app.get("/api/users",(req,res)=>{
return res.json(users);
});

//middleware -plugin
//app.use(express.urlencoded({extended:false}));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/usersDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("DB Error:", err));

// Schema
const userSchema = new mongoose.Schema({
    
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    address: String
});

// Model
const User = mongoose.model("User", userSchema);


app
.route("/api/users/:id")
.get((req,res) => {
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    return res.json(user);
});

app.post("/api/users",async (req,res)=>{
    const {first_name,last_name,email,gender,address}=req.body;
    
    if (!first_name||!last_name||!email || !gender || !address) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
    }

      try {
        const newUser = await User.create({
            
            first_name,
            last_name,
            email,
            gender,
            address
        });

        return res.json({ status: "success", id: newUser._id });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Database error" });
    }
});

app.listen(PORT,() => console.log('server start at port:${PORT}'));
