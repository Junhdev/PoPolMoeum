import { atom, selector } from "recoil";

export interface CareerValue {
  careerId: number;
  careerName: string;
  //totalCareerNum: number;
}

export interface KeywordValue {
  universityId: number;
  universityName: string;
  //totalUniversityNum: number;
  careers: CareerValue[];
}

export const keywordListState = atom<KeywordValue[]>({
  key: 'keywordState',
  default: [{universityId: 1, universityName: '광운대학교', careers:[{careerId: 1, careerName: '개발'}, {careerId: 2,careerName:'디자인'}]},
  {universityId: 2, universityName: '숭실대학교', careers:[{careerId: 3, careerName: '마케팅'}, {careerId: 4,careerName:'인사'}]}],
}); 

export const selectedUniversityState = atom({
    key: 'universityState',
    default: 0
}); 

export const selectedCareerState = atom({
    key: 'selectedCareerState',
    default: 0,
}); 
  
export const keywordsFilterState = selector({
    key: 'keywordsFilterState',
    get: ({ get }) => {
      const keywords = get(keywordListState);
      const selectedUniversityId = get(selectedUniversityState);
      const selectedCareerId = get(selectedCareerState);
      // selectedUniversity의 type은 Object
      const selectedUniversityData = selectedUniversityId ? keywords.find((keyword) => keyword.universityId === selectedUniversityId) : undefined;
      const selectedCareerData = selectedUniversityData?.careers.find((career) => career.careerId === selectedCareerId);
      
      return {
        selectedUniversityData,
        selectedCareerData
      };
    },
}); 

// DropdownMenu 원리 context 원리
// 스터디 생성할때 atom에 업데이트해주기(추가 > 신문법 이용) > 그러면 atom[]에 [{},{}] 식으로 저장됨
// 데이터베이스에 저장이 아닌 클라이언트에 저장?
// [] [{},{..[{},{}]}] {} 타입중요!