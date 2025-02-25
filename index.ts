import express, { Application, Request, Response } from "express";
import { AdminRoute, VandorRoute } from './routes'
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MONGO_URI } from "./config";

const app: Application = express(); // Explicitly set type as Application

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', AdminRoute);
app.use('/vandor', VandorRoute);

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));


const PORT = 3000;
app.listen(PORT, () => {
  console.clear();
  console.log(`Server running on http://localhost:${PORT}`);
});
