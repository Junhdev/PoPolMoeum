'use client';

import Dropdown from '@/components/Dropdown';
import { keywordListState, keywordsFilterState, selectedCareerState, selectedUniversityState } from '@/store/keyword';
import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

// 모바일 대응

const KeywordFilter = () => {

    // 실제 데이터
    // const { data: keywords } = useSWR(getKeywords);
    // 임시 데이터
    //let keywords = [{universityId: 1, universityName: '광운대학교', careers:[{careerId: 1, careerName: '개발'}, {careerId: 2,careerName:'디자인'}]},
    //{universityId: 2, universityName: '숭실대학교', careers:[{careerId: 3, careerName: '마케팅'}, {careerId: 4,careerName:'인사'}]}]
    
    const [selectedUniversityId, setSelectedUniversityId] = useRecoilState(selectedUniversityState)
    const [selectedCareerId, setSelectedCareerId] = useRecoilState(selectedCareerState)
    const keywords = useRecoilValue(keywordListState);
    const {
      selectedUniversityData,
      selectedCareerData
    } = useRecoilValue(keywordsFilterState);

    // Why
    const handleSelectUniversity = useCallback(
    (universityId: number) => {
      setSelectedUniversityId(universityId);
    },
    [setSelectedUniversityId]
    );

  const handleSelectCareer = useCallback(
    (careerId: number) => {
      setSelectedCareerId(careerId);
    },
    [setSelectedCareerId]
  );

  return (
    <>
      
      <div>
        <div className=''>
          <Dropdown className=''>
            <Dropdown.Button disabled={keywords.length <= 0} color="red" size="small" placeholder="전체 대학교">
              {selectedUniversityData?.universityName}
            </Dropdown.Button>
            <Dropdown.Menu 
              selectable 
              onSelectChange={handleSelectUniversity} 
              selectedItemKey={selectedUniversityId}
            >
              {keywords.map(({ universityId, universityName }, idx) => (
                <Dropdown.Item key={idx} itemKey={universityId}>
                  <div /*className={styles.itemText}*/>
                    {universityName}
                    {/*
                    <span
                      className={styles.itemCountText({
                        //active: sumByUniversity > 0,
                        selected: universityId === selectedUniversity?.universityId,
                      })}
                    >
                      {sumByUniversity}
                    </span>
                    */}
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="w-full">
            {/* 대학교를 선택해야만 직무를 선택할 수 있음 */ }
            <Dropdown.Button color="red" size="small" placeholder="전체 직무" disabled={!selectedUniversityData}>
              {selectedCareerData?.careerName}
            </Dropdown.Button>
            <Dropdown.Menu
              selectable
              onSelectChange={handleSelectCareer}
              selectedItemKey={selectedCareerId}
            >
              {selectedUniversityData?.careers.map(({ careerId, careerName }, idx) => (
                <Dropdown.Item key={idx} itemKey={careerId}>
                  <div>
                    {careerName}
                    {/*
                    <span
                      className={styles.itemCountText({
                        active: sumByCareer > 0,
                        selected: careerId === selectedCareer?.careerId,
                      })}
                    >
                      {sumByCareer}
                    </span>
                    */}
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default KeywordFilter;