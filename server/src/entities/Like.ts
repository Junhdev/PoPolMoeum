import BaseEntity from "./Entity";
import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import Work from "./Work";


@Entity('likes')
export default class Like extends BaseEntity{
    @Column()
    value: number;

    @Column()
    user_id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id", referencedColumnName: "user_id" })
    user: User

   
    @Column({ nullable: true })
    work_id: number;

    @ManyToOne(() => Work)
    work: Work;

}