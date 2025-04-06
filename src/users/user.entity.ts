import { Injectable, Inject, forwardRef } from "@nestjs/common"
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    OneToMany,
} from "typeorm";
import { ReportEntity } from "../reports/report.entity";

@Injectable()
@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    role: string;

    @Column({ nullable: false })
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => ReportEntity, (report) => report.user)
    reports: ReportEntity[];

    @AfterInsert()
    logInsert() {
        console.log(`Hey ${this.name}! You are in our database having id:  ${this.id}`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Updated the ${this.role} of id:  ${this.id}`);
    }

    @AfterRemove()
    logRemove() {
        console.log(`Removed the ${this.role} of id:  ${this.id}`);
    }
}

