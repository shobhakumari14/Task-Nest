import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true})
  status: boolean;

  @AfterInsert()
  logInsert() {
    console.log(`Hey! You are in database having id:  ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated task of id:  ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed task of id:  ${this.id}`);
  }
}
