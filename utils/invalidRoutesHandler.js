const invalidRoutesHandler =(req, res)=>{
    return res.status(400).json({ success: false, msg: "invalid api url", data:null})
}
export default invalidRoutesHandler;
   