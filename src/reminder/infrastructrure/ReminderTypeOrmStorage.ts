import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';

import { ReminderDbo } from './ReminderDbo';
import { ReminderStorage } from '../domain/ReminderStorage';
import { Reminder } from '../domain';

@Injectable()
export class ReminderTypeOrmStorage implements ReminderStorage {
  constructor(
    @InjectRepository(ReminderDbo)
    private readonly repository: Repository<ReminderDbo>,
  ) {}

  public async createReminder(reminder: Reminder): Promise<void> {
    await this.repository.save(ReminderDbo.fromEntity(reminder));
  }

  public async findRemindersBefore(time: Date): Promise<Reminder[]> {
    const dbos = await this.repository.find({
      where: this.reminderTimeIsBefore(time),
    });

    return dbos.map((dbo) => ReminderDbo.toEntity(dbo));
  }

  public count(): Promise<number> {
    return this.repository.count();
  }

  public removeAll(): Promise<void> {
    return this.repository.clear();
  }

  public async removeRemindersBefore(time: Date): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .where(this.reminderTimeIsBefore(time))
      .execute();
  }

  private reminderTimeIsBefore(time: Date) {
    // Fixes issues with typeorm & sqlite
    // TODO remove this once this issue is fixed https://github.com/typeorm/typeorm/issues/2286
    const datestr = time.toISOString().replace('T', ' ');
    return {
      remindAt: LessThanOrEqual(datestr),
    };
  }
}
