const express=require('express');
const app=express();
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

app
.route("/api/users/:id")
.get((req,res) => {
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    return res.json(user);
});

app.post("/api/users",(req,res)=>{
    const {first_name,last_name,email,gender,address}=req.body;
    
    if (!first_name||!last_name||!email || !gender || !address) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    const newUser = {  id: users.length + 1 ,
        first_name,
        last_name,
        email,
        gender,
        address
    };

    users.push(newUser);

    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users,null,2),(err)=>{
     
       if (err) {
            console.error(err);
            return res.status(500).json({ status: "error", message: "Failed to save user" });
        }

        return res.json({ status: "sucess", id: newUser.id });
    });
});

app.listen(PORT,() => console.log('server start at port:${PORT}'));
