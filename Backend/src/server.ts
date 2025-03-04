import express, { Request, Response } from "express";
import cors from "cors";
import getRoutes from "./routers/getRoutes";
import postRoutes from "./routers/PostRoutes"
import delRoutes from "./routers/delRoutes"
import employeeRoute from "./routers/employeeRoute"
// Create a new express application instance
const app = express();

// Set the network port
const port = 3000;
app.use(cors());
// Define the root path with a greeting message
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "delete  -> /delbogsh, post -> /bogshed, get -> /bogsh", client: "This text is from the server " });
});
app.use("/bogsh", getRoutes);
app.use("/bogshed", postRoutes);
app.use("/delbogsh", delRoutes);
app.use("/employee", employeeRoute)
// Start the Express server
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});