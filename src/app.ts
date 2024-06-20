import { AppDataSource } from "./data-source";
import * as express from "express";
import { Request, Response } from "express";
import { downloadDocxRouter } from "./downloadDocx/downloadDocx.routes";
import "reflect-metadata";
import * as cors from "cors";

const PORT = "3000";
const url = "http://localhost:" + PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", downloadDocxRouter);

app.get("*", (req: Request, res: Response) => {
  res.status(200).json({ message: "OK" });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on " + url);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
