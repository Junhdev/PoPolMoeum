import { Request, Response, Router } from "express";
import userMiddleware from "../middlewares/user";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import Study from "../entities/Study";
import Membership from "../entities/Membership";

// insert
// 내가 참여하기 버튼 눌렀을때
const sendStudyRequest = async(req: Request, res: Response) => {
  const user: User = res.locals.user;
 
  let studyId = req.params.studyId;
  
  
  try {
    // 프론트에서 :로 넘어받은 스터디id로 스터디 정보(object) 찾기
    const study = await Study.findOneBy(
        {
            id: Number(studyId),
        }
    )
    // 내가 생성자한테 참여요청 보냈을때
    const studyRequest = await Membership.find({
    
      where: [{    
          receiverId: study.superuserId, 
          senderId: user.id
        }
      ]
    })
    
    // 해당 생성자한테 보낸 참여요청이 기존에 없었다면
    if (studyRequest.length === 0) {
   
    // 엔티티에 등록(인스턴스 생성)!!!
    const membership = new Membership();
    membership.studyId = study.id
    membership.senderId = user.id;
    membership.receiverId = study.superuserId;
    membership.accepted= false;
    // members컬럼에 추가하기 위해
    membership.userId = user.id
   
    await membership.save();
    return res.status(201).json({ message: '스터디 참여 요청을 보냈어요.' });
    }
  } catch {
    return res.status(500).json({ message: '서버 에러가 발생했어요.' });
  }
};

// 내가 superuser일때, 프론트에서 수락 버튼 클릭했을때
// 여기서 멤버 업데이트 원리도 같이해주기!
const acceptStudyRequest = async(req: Request, res: Response) => {
  // 체크
  const user: User = res.locals.user
  const myStudyId = req.params.studyId
  const myStudySenderId = req.params.senderId
  
  // 1. 생성자인 나에게 온 참여 요청 상태 수락으로 업데이트
  try {
    
    const studyRequest = await Membership.findOneBy(
    {
            receiverId: user.id,
            senderId: Number(myStudySenderId),
            accepted: false,
            studyId: Number(myStudyId)
    }
    )
    
      studyRequest.accepted = true;
      // 새로운 인스턴스가 생성되는 것이 아니라 업데이트 시켜준다
      await Membership.save(studyRequest);

      // 위에서 수락완료된 membership 1개의 정보의 senderId(즉, 참여자!)
      const memberId = studyRequest.senderId
      // user id가 memberId인 User 객체 1개 찾기
      const member = await User.findOneBy(
        {
            id: memberId
        }
      )
      // 참여 신청 온 스터디
      const study = await Study.findOneBy(
        {
            id: Number(myStudyId)
        }
      )
        //superuser은 createStudy에서 members에 push
        // 배열이므로 업데이트를 하기 위해선 push를 해준다.
        study.members.push(member);
        // 스터디 멤버 정보 업데이트(수락 버튼 누를떄마다 1명씩 업데이트 되는 원리)
        await Study.save(study);
        
      
        return res.status(200).json({ message: '스터디 참여를 수락했어요' });
        // 프론트에서 이 api가 성공되면 alarm에 수락으로 바뀌고 나의 스터디 목록에 해당 스터디가 생성되게 프론트에서 구축해주기
        
    }

  catch {
    return res.status(500).json({ message: '서버 에러가 발생했어요.' });
  }
};

const removeStudy =  async(req: Request, res: Response) => {

  try {
    const { affectedRows } : any = await AppDataSource.createQueryBuilder()
    .delete()
    .from(Membership)
    .where("accepted = true")
    .execute()
   
    if (affectedRows === 0) return res.status(404).json({ message: '존재하지 않는 친구예요.' });
    return res.status(200).json({ message: '친구가 삭제되었어요.' });
  } catch {
    return res.status(500).json({ message: '서버 에러가 발생했어요.' });
  }
  }

// 받은 참여 신청 (신청자 정보 return)
  const getStudyRequests = async(req: Request, res: Response) => {
    const user: User = res.locals.user;
   
  try {
    
    const studyRequests = await Membership.find({
      
      // accepted: false 해주어야 수락/거부 과정이 이미 진행된 친구들이 프론트에서 렌더링 안된다.
      where: {
          receiverId: user.id, accepted: false
        }
      
    })
  
    // ★★★동기적 프로그래밍으로 인해 코드 위치 중요
    if(studyRequests.length === 0){
      return res.status(404).json({ message: '전달받은 참여신청이 없어요' })
    }
  
    // 수정
    const applicants = await User.find({
      relations: {
        membership: true
      }
      ,
      where: {
        membership: {
          receiverId: user.id,
          accepted: false
        }
     
    }})
      return res.json(applicants); 
  
  } catch {
    return res.status(500).json({ message: '서버 에러가 발생했어요.' });
  }
  };
  


  // 보낸 참여 신청 (스터디 정보 return)
  const getApplyingStudy = async(req: Request, res: Response) => {
    const user: User = res.locals.user;
   
  try {
    
    const studyApplications = await Membership.find({
      
      where: {
          senderId: user.id, accepted: false
        }
      
    })
  
    // ★★★동기적 프로그래밍으로 인해 코드 위치 중요
    if(studyApplications.length === 0){
      return res.status(404).json({ message: '보낸 참여신청이 없어요' })
    }
   
   // 로직 체크
   // 수락했으면 사라진다
   // 거절하면? 그 엔티티가 사라지므로 이 또한 사라진다
    const applyingStudy = await Study.find({
      relations: {
        membership: true
      }
      ,
      where: {
        // 참여 신청 보낸 유저가 본인일때
        membership: {
          senderId: user.id,
          accepted: false
        }
    }})
      return res.json(applyingStudy); 
  
  } catch {
    return res.status(500).json({ message: '서버 에러가 발생했어요.' });
  }
  };

  

// get보다 post/put 핸들러 먼저 생성하기(친구요청 관련 핸들러 먼저 생성 후 친구 목록 불러오기 핸들러 생성해주어야함)
// 위에서 친구요청이 진행되었으므로 sender_id와 receiver_id에 이미 해당 유저의 index가 들어있다.
// 그러므로 친구정보를 불러오기 위해서는 join을 해서 친구의 id(인덱스), 친구의 아이디, 이름 등을 선택하여 프론트에 보낼 수 있다.
// (★친구의 아이디, 이름등이 저장되어 있는 엔티티가 따로 있는 것이 아니라 join과 조건을 통해 user엔티티에서 친구의 정보를 불러와야함(FK 논리)!)
const getMyStudyList = async(req: Request, res: Response) => {
  const user: User = res.locals.user;
  try {
      // 내가 속해있는 스터디 정보들(find로 찾기)
        const myStudyList = await Study.find({
            relations: {
                membership: true
              }
              ,
              where: [{
                // 참여 신청 보낸 유저가 본인일때
                    membership: {
                        senderId: user.id,
                        accepted: true
                    }
                },
                {
                    superuserId: user.id
                }

                ]

                
        })
        // 존재하지 않는 경우의 코드 먼저 선언
        if(myStudyList.length === 0) return res.status(404).json({ message: '참여한 스터디가 존재하지 않아요' })
        
        return res.json(myStudyList);

    
  } catch {
    return res.status(500).json({ message: '서버 에러가 발생했어요.' });
  }
}



    

const router = Router();


// insert
router.put('/send/:studyId', userMiddleware, sendStudyRequest);
// update
router.patch('/accept/:studyId/:senderId', userMiddleware, acceptStudyRequest); 
router.delete('/accept/:friend_id', userMiddleware, removeStudy);
router.get('/', userMiddleware, getMyStudyList);
router.get('/request', userMiddleware, getStudyRequests);
router.get('/apply', userMiddleware, getApplyingStudy);

export default router;

