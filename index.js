import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import Routes from './src/routes/index.js'
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(Routes);
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`); 
})