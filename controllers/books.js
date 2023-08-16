import booksModel from "../model/booksModel.js";
const projection = {password: 0};

export const allBooks = async(req, res)=>{
    try {
        const {filterParams, sortParams}=req.body;
        let query={};
        for (const key in filterParams) {
            if(key==="publicationYear"){
                query.publicationYear = { "$gte": filterParams[key][0], "$lte": filterParams[key][1] }
            }
            else if(key==="author" || key==="genre")
                query[key] = filterParams[key]
        }
        const Allbooks = await booksModel.find(query, projection).sort(sortParams)
        return res.status(200).json({ success: true, msg: "People filtered successfully", data: Allbooks }) 
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, msg: "internal server error", data:null })
    }
};
export const getBooksById  =async(req,res)=>{
    try {
        const {id} = req.params;
        const getBookById = await booksModel.findById(id, projection);
        return res.status(200).json({ success: true, msg: "books fetched by id", data: getBookById })
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, msg: "internal server error", data:null })
    }

}
export const filterByGenre=async(req,res)=>{
    try {
        const {genre} = req.params;
        const filterByGenre ={ genre: genre };
        const requiredGenre=await booksModel.find(filterByGenre);
        return res.status(200).json({ success: true, msg: "books filtered by genre", data: requiredGenre })
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, msg: "internal server error", data:null }) 
    }
}
export const sortInDescndng=async(req,res)=>{
    try {
        const ascendingSort = { publicationYear: 1 };
        const ascendingCursor = await booksModel.find().sort(ascendingSort);
        return res.status(200).json({ success: true, msg: "sorted in desending order", data: ascendingCursor})

    } catch (error) {      
        console.log(error);
        return res.status(500).json({ success: false, msg: "internal server error", data:null }) 
        
    }
}
export const createNewEntry=async(req,res)=>{
    try {
        const newEntry = {...req.body};
        // const { email } = newEntry;
        // const booksWithSameEmailId = await booksModel.findOne({email: email}, projection);
        // if(booksWithSameEmailId){
        //     return res.status(400).json({ success: false, msg: "Email already exist", data: null })
        // }
        const newBook = await booksModel.create(newEntry);
        return res.status(201).json({ success: true, msg: "New person entered successfully", data: newBook })
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, msg: "internal server error", data:null })  
    }
}
export const deleteRecord=async(req,res)=>{
    try {
        const {publicationYear}=req.params;
        await booksModel.deleteOne({publicationYear:publicationYear});
        return res.status(200).json({ success: true, msg: "book deleted succesfully", data:null})

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, msg: "internal server error", data:null })  
        
    }
}
export const editBookById = async(req, res)=>{
    try {
        const { id }=req.params;
        const fieldsToBeUpdated = {...req.body}
        const books = await booksModel.findById(id, projection)
        if (!books){
            return res.status(400).json({ success: false, msg: "book Not found", data: null })
        }
        for(const key in fieldsToBeUpdated){
            if(typeof fieldsToBeUpdated[key]==="object"){
                for(const prop in fieldsToBeUpdated[key]){
                    books[key][prop] = fieldsToBeUpdated[key][prop]
                }
            }
            else
            books[key] = fieldsToBeUpdated[key]
        }
        const updatedBook = await books.save();
        return res.status(201).json({ success: true, msg: "Person updated successfully", data: updatedBook })
    
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, msg: "internal server error", data: null })
    }
};