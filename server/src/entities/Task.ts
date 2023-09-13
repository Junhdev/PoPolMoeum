import BaseEntity from './Entity';
import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { User } from './User';
import { Exclude, Expose } from "class-transformer";
import Study from './Study';
import Like from './Like';

@Entity("tasks")
export default class Task extends BaseEntity{
    
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

    @Column({ nullable: true })
    userId: number;
    
    @Column({ nullable: true })
    studyId: number;

    @ManyToOne(()=>User, (user) => user.tasks)
    @JoinColumn({ name: "userId", referencedColumnName: "id" }) // 첫번째 username은 22번 line, 두번째 username은 User.ts이 username
    user: User;

    @ManyToOne(() => Study, (study) => study.tasks)
    @JoinColumn({ name: "studyId", referencedColumnName: "id" })
    study: Study;

    @Exclude()
    @OneToMany(() => Like, (like) => like.task)
    likes: Like[];

    @Expose() get likeScore(): number {
        return this.likes?.reduce((memo, curt) => memo + (curt.value || 0), 0);
    }

    protected userLike: number;

    setUserLike(user: User){
        const index = this.likes?.findIndex((v) => v.userId === user.id);
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