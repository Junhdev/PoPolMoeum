import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import BaseEntity from "./Entity";
import Study from "./Study";


@Entity("membership")
export default class Membership extends BaseEntity{
    /*
    @Column({ nullable: true })
    studyId: number 
    */
    
    // join된 column name이 studyId로 적용되는지 체크
    @ManyToOne(()=>Study, (study) => study.membership)
    @JoinColumn({ name: "studyId", referencedColumnName: "id" }) 
    studyId: number

    //초대요청은 한개의 userId를 가져야한다. (senderId)
    @ManyToOne(()=>User, (user) => user.membership)
    @JoinColumn({ name: "userId", referencedColumnName: "id" }) 
    userId: number

    @Column({ nullable: true })
    senderId: number 
    
    @Column({ nullable: true })
    receiverId: number;
    
    @Column({ nullable: true })
    accepted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
