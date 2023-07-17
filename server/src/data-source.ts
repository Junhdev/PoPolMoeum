import "reflect-metadata"
import { DataSource } from "typeorm"



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
    entities:[],
    migrations: [],
    subscribers: [],
})
