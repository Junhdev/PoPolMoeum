import "reflect-metadata"
import { DataSource } from "typeorm"
import Entity from "./entities/Entity"
import { User } from "./entities/User"



export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "777777",
    database: "postgres",
    synchronize: true,
    logging: false,
    //entities: [
       // "src/entities/**/*.ts"
    //],
    entities:[Entity, User],
    migrations: [],
    subscribers: [],
})
