import express, { Request, Response } from "express";
import cors from "cors";
import getRoutes from "./routers/getRoutes";
import postRoutes from "./routers/PostRoutes";
import delRoutes from "./routers/delRoutes";
import employeeRoute from "./routers/employeeRoute";
import act3routes from "./activity3routers/act3routes";
import midtermRoutes from "./midterm-routers/midtermRoutes";
const app = express();

// network port
const port = 3000;
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "delete  -> /delbogsh, post -> /bogshed, get -> /bogsh",
    client: "This text is from the server ",
  });
});
app.use("/bogsh", getRoutes);
app.use("/bogshed", postRoutes);
app.use("/delbogsh", delRoutes);
app.use("/employee", employeeRoute);

// Act3
app.use("/act3", act3routes);

// Midterms
app.use("/tasks", midtermRoutes);

//  Express server
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
