import fs from "fs-extra";
// import { hash, compare } from 'bcryptjs';
const filePath = 'assets/usersCredDb.json';
const creds = await fs.readJson(filePath);
export const login=async(req, res)=>{
  try {
    const { username, password } = req.body;  
    const user = creds.find(obj => obj.username===username);  
    if(!user)return res.status(400).json({success:false,msg:"user is not available",data:null})
    if(user.password!==password) return res.status(405).json({success:false,msg:"wrong password",data:null})
    return res.status(200).json({success:true,msg:"successfully loggedIn",data:user})
  }
  catch (err) {
      console.log(err);
      return res.status(500).json({success:false, msg: "internal server error", data:null});
  }
}
    

export const userLogin=async(req, res)=>{
     const { username, password } = req.body;  
     const user = creds.find(obj => obj.username=username); 
     res.json(user);

    try {
        const { username, password } = req.body;  
        const user = creds.find(obj => obj.username=username);    
     
        if(!user.password== password && !user.user==user || !user.password==password && user.user==user|| user.password==password && !user.user==user) {   
          return res. status(400).json({ success: false, message: "invalid User or password", data: null})
        }
        if (user.password=== password && user.user=== user ) {   
          return res. status(200).json({ success: true, message: "user Loggedin successfully", data: null})
        }
        return res.send(user);
      } 
    catch (err) {
        console.log(err);
        return res.status(500).send("Something went wrong");
      }
    }
