import BaseEntity from './Entity';
import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { User } from './User';

import { Exclude, Expose } from "class-transformer";
import Study from './Study';
import Like from './Like';


@Entity("works")
export default class Work extends BaseEntity{
    
    @Column({ nullable: true })
    title: string;

    
    @Column({nullable: true })
    completed: boolean;

    
    @Column({ type: 'text', nullable: true })
    description: string;

    
    @Column({ nullable: true })
    imageUrn: string;

   
    @Column({ nullable: true })
    bannerUrn: string;

    @Column()
    user_id: number;
    
    @Column()
    study_id: number;

    @ManyToOne(()=>User, (user) => user.works)
    @JoinColumn({ name: "user_id", referencedColumnName: "user_id" }) // 첫번째 username은 22번 line, 두번째 username은 User.ts이 username
    user: User;

   
    @ManyToOne(() => Study, (study) => study.works)
    @JoinColumn({ name: "study_id", referencedColumnName: "study_id" })
    study: Study;


    // 1개의 post는 여러개의 like를 가질 수 있다 
    @Exclude()
    @OneToMany(() => Like, (like) => like.work)
    likes: Like[];

    @Expose() get likeScore(): number {
        return this.likes?.reduce((memo, curt) => memo + (curt.value || 0), 0);
    }

    protected userLike: number;

    setUserLike(user: User){
        const index = this.likes?.findIndex((v) => v.user_id === user.id);
        this.userLike = index > -1 ? this.likes[index].value : 0;
    }

    /* slug 대신 id로 url 사용할 예정
    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeId(7);
        this.slug = slugify(this.title);
    }
    */
   
    
}