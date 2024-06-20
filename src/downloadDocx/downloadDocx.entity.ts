import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "downloadDocxJobs" })
export class DownloadDocxEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  status: string;

  @Column()
  username: string;
}
