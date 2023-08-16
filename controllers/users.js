import usersModel from "../model/usersModel.js";

const projection = {password: 0};
export const getUsersById = async(req, res)=>{
    try {
        const {id} = req.params;
        const users = await usersModel.findById(id, projection);
        return res.status(200).json({ success: true, msg: "All people fetched successfully", data: users })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, msg: "internal server error", data: null })
    }
};
export const createEntry = async(req, res)=>{
    try {
        const newEntry = {...req.body};
        const { email_id } = newEntry;
        const userWithSameEmailId = await usersModel.findOne({email_id: email_id}, projection);
        if(userWithSameEmailId){
            return res.status(400).json({ success: false, msg: "Email already exist", data: null })
        }
        const newPerson = await usersModel.create(newEntry);
        return res.status(201).json({ success: true, msg: "New person entered successfully", data: newPerson })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, msg: "internal server error", data:null })
    }
};
export const getAllUsers = async(req, res)=>{
    try {
        const {filterParam, sortParams}=req.body;
        //{ age: { $gte: minAge, $lte: maxAge }, gender: "female", address.country: "dubai", address.city: "paris" }
        let query={};
        for (const key in filterParam) {
            if(key==="age"){
                query.age = { "$gte": filterParam[key][0], "$lte": filterParam[key][1] }
            }else if(key==="country" || key==="city"){
                query[`address.${key}`] = filterParam[key]
            }else{
                query[key] = filterParam[key]
            }
        }
        //1 for ascending and -1 for decending
        const filteredPeople = await usersModel.find(query, projection).sort(sortParams)
        return res.status(200).json({ success: true, msg: "People filtered successfully", data: filteredPeople })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, msg: "internal server error", data:null })
    }
};
export const editEntryById = async(req, res)=>{
    try {
        const { id }=req.params;
        const fieldsToBeUpdated = {...req.body}
        const user = await usersModel.findById(id, projection)
        if (!user){
            return res.status(400).json({ success: false, msg: "Person Not found", data: null })
        }
        for(const key in fieldsToBeUpdated){
            if(typeof fieldsToBeUpdated[key]==="object"){
                for(const prop in fieldsToBeUpdated[key]){
                    user[key][prop] = fieldsToBeUpdated[key][prop]
                }
            }
            else
            user[key] = fieldsToBeUpdated[key]
        }
        const updatedPerson = await user.save();
        return res.status(201).json({ success: true, msg: "Person updated successfully", data: updatedPerson })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, msg: "internal server error", data: null })
    }
};
