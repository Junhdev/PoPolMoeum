import BaseEntity from "./Entity";
import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import Task from "./Task";


@Entity('tags')
export default class Like extends BaseEntity{
    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    status: number;

}