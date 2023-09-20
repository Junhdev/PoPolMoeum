import { isEmpty, validate } from "class-validator";
import { Request, Response, Router } from "express";
import { User } from "../entities/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import userMiddleware from "../middlewares/user";
import authMiddleware from "../middlewares/auth";


const mapError = (errors: Object[]) => {
    return errors.reduce((prev: any, err: any) => {
      prev[err.property] = Object.entries(err.constraints)[0][1];
      return prev;
    }, {});
  };

  
const signup =  async (req: Request, res: Response) => {
    const { user_id, email, username, password, universityId, majorId, interestedSubjectTag } = req.body;
  
    try { 
        let errors: any = {};
    
        // 유저아이디, 이메일, 유저이름이 이미 사용되고 있는 것인지 검사
        const user_idOfUser = await User.findOneBy({ user_id });
        const emailOfUser = await User.findOneBy({ email });
        const usernameOfUser = await User.findOneBy({ username });
          
        if (user_idOfUser) errors.user_id = "이미 해당 이메일 주소가 사용되었습니다.";
        if (emailOfUser) errors.email = "이미 해당 이메일 주소가 사용되었습니다.";
        if (usernameOfUser) errors.username = "이미 이 사용자 이름이 사용되었습니다.";
    
        if (Object.keys(errors).length > 0) {
          return res.status(400).json(errors);
        }
    
        const user = new User();
        user.user_id = user_id;
        user.email = email;
        user.username = username;
        user.password = password;
        user.universityId = universityId;
        user.majorId = majorId;
        user.interestedsubjectTag = interestedSubjectTag
    
        // 엔티티에서 정해 놓은 조건으로 user데이터의 유효성 검사 해주기
        errors = await validate(user);
    
        if (errors.length > 0) return res.status(400).json(mapError(errors));
    
        await user.save(); 
        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
      } 
}  

const login = async (req: Request, res: Response) => {
  const { userId, username, password } = req.body;
  try {
    let errors: any = {};
    // 비워져있다면 에러를 프론트엔드로 보내주기
    // isEmpty from class-validator
    if (isEmpty(userId)) errors.userId = "사용자 아이디는 비워둘 수 없습니다.";
    if (isEmpty(username)) errors.username = "사용자 이름은 비워둘 수 없습니다.";
    if (isEmpty(password)) errors.password = "비밀번호는 비워둘 수 없습니다.";
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // DB에서 유저 찾기
    const user = await User.findOneBy({ userId });

    if (!user)
      return res
        .status(404)
        .json({ userID: "사용자 아이디가 등록되지 않았습니다." });

    // 유저가 있다면 비밀번호 비교하기
    // user.password는 DB에 저장되어 있는 암호화 되어 있는 비밀번호 , password는 client에서 user가 입력한 비밀번호
    const passwordMatches = await bcrypt.compare(password, user.password); 

    // 비밀번호가 다르다면 에러 보내기
    if (!passwordMatches) {
      return res.status(401).json({ password: "비밀번호가 잘못되었습니다." });
    }

    // 비밀번호가 맞다면 username과 JWT_SECRET을 합쳐서 토큰 생성
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    // 쿠키저장
    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      })
    );

    return res.json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

// 핸들러 호출 되면 res에 정보 담아 getServerSideProps로 res전달
const me = async (_: Request, res: Response) => {
  return res.json(res.locals.user);
};

const logout = async (_: Request, res: Response) => {
  res.set(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      // 바로 expires 될 수 있게 Date인자로 0을 입력
      expires: new Date(0),
      path: "/",
    })
  );
  res.status(200).json({ success: true });
};

const router = Router();
router.get("/me", userMiddleware, authMiddleware, me)
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", userMiddleware, authMiddleware, logout);

export default router;