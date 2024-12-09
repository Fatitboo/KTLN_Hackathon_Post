import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  HACKATHON_REPOSITORY,
  HackathonRepository,
} from 'src/hackathon/domain/repositories/hackathon.repository';
import { SeedDataHackathonCommand } from './seed-data-hackathon.command';
import { HackathonDocument } from 'src/hackathon/infrastructure/database/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';
import { HackathonMigrateDTO } from './dto/hackathon-migrate.dto';
@CommandHandler(SeedDataHackathonCommand)
export class SeedDataHackathonHandler
  implements ICommandHandler<SeedDataHackathonCommand>
{
  constructor(
    @Inject(HACKATHON_REPOSITORY)
    private readonly hackathonRepository: HackathonRepository,
    @InjectModel(HackathonDocument.name)
    private readonly hackathonModel: Model<HackathonDocument>,
  ) {}

  async execute() {
    const filePath = path.resolve(
      __dirname,
      '../../../../../data/10_first_hackathons.csv',
    );
    console.log('🚀 ~ execute ~ filePath:', filePath);
    await this.processCSVFile(filePath);
    return 'ok';
  }

  async processCSVFile(filePath: string): Promise<void> {
    const hackathons: any[] = [];

    console.log('Start processing for file', filePath);
    return new Promise<void>((resolve, reject) => {
      const rs = fs.createReadStream(filePath);

      rs.pipe(csv())
        .on('data', (chunk) => {
          const hkt = HackathonMigrateDTO.fromCSVChunk(chunk);
          hackathons.push(hkt);
        })
        .on('end', async () => {
          try {
            await this.migrateData(hackathons);
            resolve();
          } catch (error) {
            console.error('Error migrating data for file:', filePath, error);
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('Error reading CSV file:', filePath, error);
          reject(error);
        });
    });
  }
  async migrateData(hackathons: any[]) {
    await this.hackathonModel.insertMany(hackathons);
  }
}
