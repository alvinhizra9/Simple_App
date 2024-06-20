import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { DownloadDocxEntity } from "../downloadDocx/downloadDocx.entity";
import * as path from "path";
import { DownloadDocxJob } from "./downloadDocx.job";

export class DownloadDocxController {
  static async generateDocx(req: Request, res: Response) {
    try {
      const { username, templateName, data } = req.body;

      const downloadDocx = new DownloadDocxEntity();
      downloadDocx.username = username;
      downloadDocx.filename = `${username}-${templateName}.docx`;
      downloadDocx.status = "pending";

      const downloadDocxRepository =
        AppDataSource.getRepository(DownloadDocxEntity);
      await downloadDocxRepository.save(downloadDocx);

      DownloadDocxJob.generateDocx(username, templateName, data);

      return res.status(200).json({ message: "Generating..." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async downloadDocx(req: Request, res: Response) {
    const { templateName } = req.body;
    console.log(templateName);
    const downloadDocxRepository =
      AppDataSource.getRepository(DownloadDocxEntity);
    const downloadDocx = await downloadDocxRepository.findOne({
      where: { filename: templateName },
    });
    console.log(downloadDocx);
    if (downloadDocx.status === "pending")
      return res.status(400).json({ message: "Generating..." });

    const file = path.resolve(
      __dirname,
      __dirname + `/../public/${downloadDocx.filename}`
    );
    return res.download(file);
  }

  static async getJobs(req: Request, res: Response) {
    const downloadDocxRepository =
      AppDataSource.getRepository(DownloadDocxEntity);
    const downloadDocxs = await downloadDocxRepository.find();

    return res.status(200).json(downloadDocxs);
  }
}
