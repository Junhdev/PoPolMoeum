/*
import { Request, Response, Router } from "express";
import { User } from "../entities/User";
import userMiddleware from "../middlewares/user";
import Work from "../entities/Task";

const getUserData = async (req: Request, res: Response) => {
  try {
    
    const user = await User.findOneOrFail({
        // params로 넘어온 id의 type은 string이기 때문
        where: { id: Number(req.params.id) },
        select: ["id", "username", "profileImg"],
    });

   
    const works = await Work.find({
      where: { user_id: user.id },
      relations: ["likes", "study"],
    });
    


    if (res.locals.user) {
      const { user } = res.locals;
      works.forEach((p) => p.setUserLike(user));
    }

    // FriendSearchForm에서 map을 활용하기 위해 배열화 해주어야함
    let userArr: any[] = [];
    userArr.push(user)
    

    let userData: any[] = [];

    works.forEach((p) => userData.push({ type: "Post", ...p.toJSON() }));

    userData.sort((a, b) => {
      if (b.createdAt > a.createdAt) return 1;
      if (b.createdAt < a.createdAt) return -1;
      return 0;
    });

    return res.json(userArr);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "문제가 발생했습니다." });
  }
};

const router = Router();
router.get("/:user_ID", userMiddleware, getUserData);

export default router;
*/