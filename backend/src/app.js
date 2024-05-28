import express from 'express';
import router from './routers/web.js';
import cors from 'cors'

const corsOptions = {
  origin: 'http://localhost:5173', 
  optionsSuccessStatus: 200
}

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions))

//retornar todas as tasks
app.use('/tasks', router);


app.listen(port, () => {
  console.log(`Server : http://localhost:${port}/tasks `);
});