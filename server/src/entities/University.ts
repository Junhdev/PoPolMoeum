import BaseEntity from './Entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { User } from './User';
import Post from './Post';
import { Expose } from "class-transformer";

@Entity("universities")
export default class Study extends BaseEntity{

    @Index()
    @Column({ nullable: true })
    name: string;

    
    @Column({nullable: true })
    major: string;

    
    @Column({ type: 'text', nullable: true })
    study: string;

    
    @Column({ nullable: true })
    imageUrn: string;

    @Column({ nullable: true })
    bannerUrn: string;

    
    @Column({ nullable: true })
    username: string;

    
    @ManyToOne(()=>User)
    @JoinColumn({ name: "username", referencedColumnName: "username" }) // 첫번째 username은 22번 line, 두번째 username은 User.ts이 username
    user: User;

    
    @OneToMany(() => Post, (post) => post.study)
    posts: Post[]

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