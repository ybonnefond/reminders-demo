import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Reminder } from '../domain';

@Entity()
export class ReminderDbo {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  name: string;

  @Column()
  remindAt: Date;

  constructor(name: string, time: Date) {
    this.name = name;
    this.remindAt = time;
  }

  public static fromEntity(entity: Reminder): ReminderDbo {
    return new ReminderDbo(entity.name, entity.time);
  }

  public static toEntity(dbo: ReminderDbo): Reminder {
    return new Reminder(dbo.name, dbo.remindAt);
  }
}
