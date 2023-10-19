import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
const app = express();
const port: number = 3000;

import todosRouter from './routes/todo.routes'

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/api/v1/todos", todosRouter)


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
