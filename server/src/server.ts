const express = require('express');

import { AppDataSource } from "./data-source";


const app = express();



// 서로 다른 ORIGIN에서 cookie에 token 저장을 위해 백엔드에서 credentials: true 설정 필요


/* for body-parsing application/json */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* HTTP 요청에 대한 log를 남겨주는 미들웨어 */



app.get("/", (_, res) => res.send("running"));


// static파일을 public 파일 안에 있고 브라우저로 접근할 때 제공할 수 있게 해줌
app.use(express.static("public"));


let port = 4000;
app.listen(port, async () => {
    console.log(`server running at ${process.env.APP_URL}`);

    AppDataSource.initialize().then(() => {
        console.log("database initialized");
    }).catch(error => console.log(error))
})
