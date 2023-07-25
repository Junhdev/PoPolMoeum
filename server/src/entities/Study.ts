import BaseEntity from './Entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { User } from './User';
import { Expose } from "class-transformer";
import Work from './Work';

@Entity("studies")
export default class Study extends BaseEntity{

  
    @Index()
    @Column({ nullable: true })
    name: string;

    
    @Column({nullable: true })
    title: string;

    
    @Column({ type: 'text', nullable: true })
    description: string;

    
    @Column({ nullable: true })
    imageUrn: string;

   
    @Column({ nullable: true })
    bannerUrn: string;

    /* 현재 스터디에 속해있는 user column (FK?) */
    @Column({ nullable: true })
    user_id: number;


    @ManyToOne(()=>User)
    @JoinColumn({ name: "user_id", referencedColumnName: "user_id" }) 
    user: User;

   
    @OneToMany(() => Work, (work) => work.study)
    works: Work[]

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