import * as express from "express";
import { DownloadDocxController } from "./downloadDocx.controller";
const Router = express.Router();

Router.get("/jobs", DownloadDocxController.getJobs);
Router.post("/download", DownloadDocxController.downloadDocx);
Router.post("/generate", DownloadDocxController.generateDocx);

export { Router as downloadDocxRouter };
