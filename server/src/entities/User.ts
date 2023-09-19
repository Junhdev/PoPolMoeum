import BaseEntity from "./Entity";
import { IsEmail, Length } from "class-validator";
import { Entity, Column, Index, OneToMany, BeforeInsert } from "typeorm";
import bcrypt from 'bcryptjs';
import { Expose } from "class-transformer";
import Work from "./Task";
import Like from "./Like";
import Membership from "./Membership";

type Subject = {
    id:
    name:
    
}
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
    universityId: number;

    @Column({ nullable: true })
    majorId: number;

    // 회원가입할때 선택 -> recoil 이용
    @Column({ nullable: true })
    interstingSubject: Subject[];

    @Column({ nullable: true })
    profileImg: string;

    @OneToMany(() => Work, (work) => work.user)
    works: Work[];

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6)
    }

    @Expose()
    get imageUrl(): string {
        return this.profileImg ? `${process.env.APP_URL}/images/${this.profileImg}` : "https://www.gravatar.com/avatar?d=mp&f=y"; // false === 기본 image
    }

}
