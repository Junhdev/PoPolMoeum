import { Request, Response, Router } from "express";
import Tag from "../entities/Tag";



const getTagList = async (req: Request, res: Response) => {
  
    try { 
        const tag = await Tag.findOneBy({});
        return res.json(tag);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    } 
}  

const saveTagList = async (req: Request, res: Response) => {
    const inputTag = req.body;
    try {
        //const user: User = res.locals.user;
        // 업데이트 시켜주기
        const tag = await Tag.findOneBy({});
        tag.name = inputTag
        
      
        await Tag.save(tag);
        return res.json(tag);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "문제가 발생했습니다" });
    }    
};


const router = Router();
router.get("/", getTagList)
router.post("/save", saveTagList);


export default router;