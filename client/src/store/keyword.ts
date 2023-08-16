
import { atom, selector } from "recoil";

export interface CareerValue {
  careerId: number;
  careerName: string;
  totalCareerNum: number;
}

export interface KeywordValue {
  universityId: number;
  universityName: string;
  totalUniversityNum: number;
  careers: CareerValue[];
}

export const keywordListState = atom<KeywordValue[]>({
  key: 'keywordState',
  default: [],
}); 

export const universityListState = atom({
    key: 'universityState',
    default: 1,
}); 

export const careerListState = atom({
    key: 'careerState',
    default: 1,
}); 
  
export const keywordsFilterState = selector({
    key: 'keywordsFilterState',
    get: ({ get }) => {
      const keywords = get(keywordListState);
      const selectedUniversityId = get(universityListState);
      const selectedCareerId = get(careerListState);
      // selectedUniversity의 type은 Object
      const selectedUniversity = selectedUniversityId ? keywords.find((keyword) => keyword.universityId === selectedUniversityId) : undefined;
      const selectedCareer = selectedUniversity?.careers.find((career) => career.careerId === selectedCareerId);
     
      return {
        selectedUniversity,
        selectedCareer
      };
    },
}); 
