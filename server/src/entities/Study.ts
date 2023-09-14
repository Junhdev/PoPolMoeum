import BaseEntity from './Entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { User } from './User';
import { Expose } from "class-transformer";
import Work from './Task';
import Membership from './Membership';
import Task from './Task';

@Entity("studies")
export default class Study extends BaseEntity{

    @Index()
    @Column({ nullable: true })
    superuserId: number;
    
    // 스터디 참여 조건 -> 해당 대학의 학우들만 참여 가능
    @Column({nullable: true })
    universityId: number;

    @Column({nullable: true })
    subjectId: number;

    @Index()
    @Column({ nullable: true })
    name: string;

    @Column({nullable: true })
    title: string;
    
    @Column({ type: 'text', nullable: true })
    description: string;

    // 지원마감일
    @Column({nullable: true })
    applyDeadline: Date;

    // 모집인원
    @Column({nullable: true })
    applyNumberOfMember: number;

    // 온오프라인 방식  
    @Column({nullable: true })
    way: string;
    
    // 오프라인일경우 장소   
    @Column({nullable: true })
    place: string;
    
    // 주 ?일
    @Column({nullable: true })
    frequency: number;
   
    
    @Column({ nullable: true })
    imageUrn: string;

   
    @Column({ nullable: true })
    bannerUrn: string;

    /* 현재 스터디에 속해있는 user column (FK?) 
    @Column({ nullable: true })
    userId: number;
    */

    @ManyToOne(()=>User)
    @JoinColumn({ name: "userId", referencedColumnName: "id" }) 
    userId: number;

   
    @OneToMany(() => Task, (task) => task.study)
    tasks: Task[]

    // 모집인원 나타낼때 ? / 6 이런식으로 이용
    @OneToMany(() => Membership, (membership) => membership.studyId)
    membership: Membership[]

    /* class-transformer 사용 */
    @Expose()
    get imageUrl(): string {
        return this.imageUrn ? `${process.env.APP_URL}/images/${this.imageUrn}` : "https://www.gravatar.com/avatar?d=mp&f=y"; // false === 기본 image
    }

    @Expose()
    get bannerUrl(): string | undefined { // false일때 type은 undefined 이므로 union type으로 지정
        return this.bannerUrn ? `${process.env.APP_URL}/images/${this.bannerUrn}` : undefined;
    }
    
}