import {mongoose} from "./index.js";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, 'firstName is required']
    },

    lastName:{
        type:String,
        required:[true, 'lastName is required']
    },
    email:{
        type:String,
        required:[true, 'email is required']
    },

    mobile:{
        type:String,
        required:[true, 'mobile is required']
    },
    password:{
        type:String,
        required:[true, 'password is required']
    },
    role:{
        type:String,
        enum:{
            values:['Admin', 'User'],
            message:'{VALUE} is not supported'
        }
    },
    status:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    resetPasswordOTP:{type:Number},
    resetPasswordExpires:{type:Date}
}, {
    collection: 'user',
    versionKey:false
})

const userModal = new mongoose.model('user', userSchema);

export default userModal