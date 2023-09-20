import { Request, Response, Router } from "express";



const getTagList =  async (req: Request, res: Response) => {
    const { userId, email, username, password, university, major } = req.body;
  
    try { 
       
        await user.save(); 
        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
      } 
}  

const saveTagList = async (req: Request, res: Response) => {
  const { userId, username, password } = req.body;
  try {
   
    return res.json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};


const router = Router();
router.get("/", getTagList)
router.post("/save", saveTagList);


export default router;