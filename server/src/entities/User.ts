import BaseEntity from "./Entity";
import { IsEmail, Length } from "class-validator";
import { Entity, Column, Index, OneToMany, BeforeInsert, ManyToMany } from "typeorm";
import bcrypt from 'bcryptjs';
import { Expose } from "class-transformer";
import Like from "./Like";
import Membership from "./Membership";
import Task from "./Task";
import Study from "./Study";


@Entity("users")
export class User extends BaseEntity {
    @Index()
    @Length(6, 20 , {message: "사용자 아이디는 6자 이상이어야 합니다"})
    @Column({ unique: true, nullable: true } )
    user_id: string;

    @Index()
    @IsEmail(undefined, {message: "이메일 주소가 잘못되었습니다."})
    @Length(1, 255, {message: "이메일 주소는 비워둘 수 없습니다."})
    @Column({ unique: true, nullable: true})
    email: string;

    @Index()
    @Length(3, 32, {message: "사용자 이름은 3자 이상이어야 합니다"})
    @Column({ unique: true , nullable: true})
    username: string;

    @Column()
    @Length(6, 255, {message: "비밀번호는 6자리 이상이어야 합니다."})
    password: string;

    @Column({ nullable: true })
    universityName: string;

    @Column({ nullable: true })
    major: string;

    @Column({ nullable: true })
    grade: string;

    
    @Column({ type: 'text', array: true, nullable: true  })
    interestedSubjects: any[];

    @Column({ nullable: true })
    profileImg: string;

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];

    // 유저는 여러개의 스터디에 참여할 수 있다
    @ManyToMany(()=>Study)
    study: Study[];

     /* 1명의 User가 여러개의 초대요청을 가질 수 있다 */
     @OneToMany(() => Membership, (membership) => membership.userId)
     membership: Membership[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6)
    }

    @Expose()
    get imageUrl(): string {
        return this.profileImg ? `${process.env.APP_URL}/images/${this.profileImg}` : "https://www.gravatar.com/avatar?d=mp&f=y"; // false === 기본 image
    }

}
