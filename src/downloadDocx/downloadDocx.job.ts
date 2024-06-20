import { AppDataSource } from "../data-source";
import { DownloadDocxEntity } from "../downloadDocx/downloadDocx.entity";
import { createReport } from "docx-templates";
import * as fs from "fs";

export class DownloadDocxJob {
  static async generateDocx(username: string, templateName: string, data: any) {
    try {
      const template = await fs.promises.readFile(
        __dirname + `/../public/${templateName}.docx`
      );
      const document = await createReport({
        template,
        data,
        cmdDelimiter: ["{", "}"],
      });

      const downloadDocxRepository =
        AppDataSource.getRepository(DownloadDocxEntity);
      const downloadDocx = await downloadDocxRepository.findOne({
        where: { filename: `${username}-${templateName}.docx` },
      });

      const buffer = Buffer.from(document);
      fs.writeFileSync(
        __dirname + `/../public/${downloadDocx.filename}`,
        buffer
      );

      await new Promise((resolve) => setTimeout(resolve, 60000));

      downloadDocx.status = "done";
      await downloadDocxRepository.save(downloadDocx);
    } catch (error) {
      console.error(error);
    }
  }
}
