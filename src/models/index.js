import mongoose from 'mongoose';

import 'dotenv/config';

const MONGODB_URL = process.env.MONGODB_URL;

const MONGODB_DB = process.env.MONGODB_DB;

const url = `${MONGODB_URL}/${MONGODB_DB}`;

mongoose.connect(url).then(() => {
    console.log('Mongodb connected Successfully')
}).catch((err) => {
    console.log('Mongo Db Connection Failed', err)
})

export {mongoose}