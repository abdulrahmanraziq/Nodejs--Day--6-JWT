import {mongoose} from "./index.js";

const urlSchema = new mongoose.Schema({
    originalUrl:{
        type:String,
        required:[true, 'Original URL is required']
    },
    shortUrl:{
        type:String,
        required:[true, 'Short URL is required'],
        unique:true
    }
}, {
    collection: 'url',    
    timestamps:true,
    versionKey:false
});

const urlModal = new mongoose.model('url', urlSchema);
export default urlModal;