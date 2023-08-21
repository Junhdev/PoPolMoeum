'use client';

import Dropdown from '@/components/Dropdown';
import { careerListState, keywordListState, keywordsFilterState, universityListState } from '@/store/keyword';
import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

// 모바일 대응

const KeywordFilter = () => {
    // 실제 데이터
    // const { data: keywords } = useSWR(getKeywords);
    // 임시 데이터
    //let keywords = [{universityId: 1, universityName: '광운대학교', careers:[{careerId: 1, careerName: '개발'}, {careerId: 2,careerName:'디자인'}]},
    //{universityId: 2, universityName: '숭실대학교', careers:[{careerId: 3, careerName: '마케팅'}, {careerId: 4,careerName:'인사'}]}]
    // data[{universityId: 1, universityName: '광운대학교'},{universityId: 2, universityName:'숭실대학교'}]
    const setUniversityId = useSetRecoilState(universityListState)
    const setCareerId  = useSetRecoilState(careerListState)
    const keywords = useRecoilValue(keywordListState);
    const {
      selectedUniversity,
      selectedCareer
    } = useRecoilValue(keywordsFilterState);

    // Why
    const handleSelectUniversity = useCallback(
    (universityId: number) => {
      setUniversityId(universityId);
    },
    [setUniversityId]
    );

  const handleSelectCareer = useCallback(
    (careerId: number) => {
      setCareerId(careerId);
    },
    [setCareerId]
  );

  return (
    <>
      
      <div>
        <div className=''>
          <Dropdown className=''>
            <Dropdown.Button disabled={keywords.length <= 0} color="red" size="small" placeholder="전체 대학교">
              {selectedUniversity?.universityName}
            </Dropdown.Button>
            <Dropdown.Menu selectable selectedItemKey={selectedUniversity?.universityId} onSelectChange={handleSelectUniversity}>
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
            <Dropdown.Button color="red" size="small" placeholder="전체 직무" disabled={!selectedUniversity}>
              {selectedCareer?.careerName}
            </Dropdown.Button>
            <Dropdown.Menu
              selectable
              selectedItemKey={selectedCareer?.careerId}
              onSelectChange={handleSelectCareer}
            >
              {selectedUniversity?.careers.map(({ careerId, careerName }, idx) => (
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