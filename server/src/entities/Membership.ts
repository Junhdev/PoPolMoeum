
import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import BaseEntity from "./Entity";
import Study from "./Study";


@Entity("membership")
export default class Membership extends BaseEntity{
    
    @Column({ nullable: true })
    study_id: number 

    @ManyToOne(()=>Study, (study) => study.membership)
    @JoinColumn({ name: "study_id", referencedColumnName: "study_id" }) 
    study: Study 

    @Column({ nullable: true })
    sender_id: number 
    
    @Column({ nullable: true })
    receiver_id: number;
    
    @Column()
    accepted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
