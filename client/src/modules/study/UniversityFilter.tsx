'use client';


import Dropdown from '@/components/Dropdown';
import { useCallback } from 'react';

// 모바일 대응



const RegionsFilter = () => {
    const { data: regions } = useBoardRegions();
    // data[{universityId: 1, universityName: '광운대학교'},{universityId: 2, universityName:'숭실대학교'}]

    const { selectedUniversity, selectedCareer, setUniversityId, setCareerId } = useRegionsFilter(regions);
    // recoil 혹은 zustand로 저장하기

    const handleSelectUniversity = useCallback(
    (universityId: string | null) => {
      setUniversityId?.(universityId ? Number(universityId) : undefined);
    },
    [setUniversityId],
    );

  const handleSelectCareer = useCallback(
    (careerId: string | null) => {
      setCareerId?.(careerId ? Number(careerId) : undefined);
    },
    [setCareerId],
  );

  return (
    <>
      
      <div>
        <div className=''>
          <Dropdown className=''>
            <Dropdown.Button disabled={regions.length <= 0} color="red" size="small" placeholder="전체 지역">
              {selectedUniversity?.universityName}
            </Dropdown.Button>
            <Dropdown.Menu selectable selectedItemKey={String(selectedUniversity?.universityId)} onSelectChange={handleSelectUniversity}>
              {regions.map(({ universityId, universityName, sumByUniversity }) => (
                <Dropdown.Item key={universityId} itemKey={String(universityId)}>
                  <div className={styles.itemText}>
                    {universityName}
                    <span
                      className={styles.itemCountText({
                        active: sumByUniversity > 0,
                        selected: universityId === selectedUniversity?.universityId,
                      })}
                    >
                      {sumByUniversity}
                    </span>
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className={styles.dropdown}>
            <Dropdown.Button color="red" size="small" placeholder="전체 구/군" disabled={!selectedUniversity}>
              {selectedCareer?.careerName}
            </Dropdown.Button>
            <Dropdown.Menu
              selectable
              selectedItemKey={String(selectedCareer?.careerId)}
              onSelectChange={handleSelectCareer}
            >
              {selectedUniversity?.careers.map(({ careerId, careerName, sumByCareer }) => (
                <Dropdown.Item key={careerId} itemKey={String(careerId)}>
                  <div className={styles.itemText}>
                    {careerName}
                    <span
                      className={styles.itemCountText({
                        active: sumByCareer > 0,
                        selected: careerId === selectedCareer?.careerId,
                      })}
                    >
                      {sumByCareer}
                    </span>
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

export default RegionsFilter;