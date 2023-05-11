import { Injectable, Inject, forwardRef } from "@nestjs/common"
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
} from "typeorm";
import { UserEntity } from "../users/user.entity";


@Injectable()
@Entity()
export class ReportEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    approved: boolean;

    @Column()
    price: number;

    @Column()
    maker: string;

    @Column()
    model: string;

    @Column()
    mfgyear: number;

    @Column()
    mileage: number;

    @Column()
    longitude: number;

    @Column()
    latitude: number;

  

    @ManyToOne(() => UserEntity, (user) => user.reports)
    user: UserEntity;

    //   constructor(
    //     @Inject(forwardRef(() => UserEntity))
    //    sdf: UserEntity,
    // ) { }

}