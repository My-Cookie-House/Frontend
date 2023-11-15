// TODO: 실제 api로 바꾸기
export default {
  // 수행한 특정 미션 조회
  getCompletedMissionByDate: async () => {
    const res: any = await new Promise((res, rej) => {
      setTimeout(() => {
        res({
          code: 200,
          message: '미션 내역 조회를 완료하였습니다.',
          data: {
            missionCompleteId: 3,
            missionCompleteImage: 'https://~',
            missionCompleteContent: '오늘은 어쩌구~',
            missionCompleteDate: '2023-12-20',
            missionCompleteFurniture: {
              furnitureId: 3,
              furnitureName: '흔들의자',
              furnitureImage: 'https://~',
            },
          },
        });
      }, 500);
      //   rej();
    });
    return res.data;
  },

  // 수행한 모든 미션 조회
  getAllCompletedMissions: async () => {
    const res: any = await new Promise((res, rej) => {
      setTimeout(() => {
        res({
          code: 200,
          message: '미션 내역 조회를 완료하였습니다.',
          data: {
            completedMissions: [
              {
                missionCompleteId: 1,
                missionCompleteImage: 'https://~',
                missionCompleteContent: '오늘은 어쩌구~',
                missionCompleteDate: '2023-12-20',
                missionCompleteFurniture: {
                  furnitureId: 1,
                  furnitureName: '흔들의자',
                  furnitureImage: 'https://~',
                },
              },
              {
                missionCompleteId: 2,
                missionCompleteImage: 'https://~',
                missionCompleteContent: '오늘은 어쩌구~',
                missionCompleteDate: '2023-12-21',
                missionCompleteFurniture: {
                  furnitureId: 2,
                  furnitureName: '거울',
                  furnitureImage: 'https://~',
                },
              },
              {
                missionCompleteId: 3,
                missionCompleteImage: 'https://~',
                missionCompleteContent: '오늘은 어쩌구~',
                missionCompleteDate: '2023-12-22',
                missionCompleteFurniture: {
                  furnitureId: 3,
                  furnitureName: '탁자',
                  furnitureImage: 'https://~',
                },
              },
            ],
          },
        });
      }, 500);
      //   rej();
    });
    return res.data;
  },
};
