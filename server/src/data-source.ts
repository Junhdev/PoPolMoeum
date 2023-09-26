import "reflect-metadata"
import { DataSource } from "typeorm"
import Entity from "./entities/Entity"
import { User } from "./entities/User"
import Study from "./entities/Study"
import Like from "./entities/Like"
import Membership from "./entities/Membership"
import Task from "./entities/Task"




export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "777777",
    database: "univstudy",
    synchronize: true,
    logging: false,
    //entities: [
       // "src/entities/**/*.ts"
    //],
    entities:[Entity, User, Task, Study, Like, Membership],
    migrations: [],
    subscribers: [],
})
