import mongoose from "mongoose";

const AddressSchema= mongoose.Schema({  
    door_no: {
        type: String,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

const UsersSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    Date_of_Birth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    email_id:{
        type:String
    },
    phone_number:{
        type: Number,
        required: true,
    },
    address: {
        type: AddressSchema,
        required: true,
        _id : false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true,
    }
},
{ timestamps: true }
)
const usersModel = mongoose.model('Users', UsersSchema, 'Users');
export default usersModel;