// 아래는 모킹 함수
// TODO: 실제 api로 함수 바꿔야 함
export default {
  getLoginUserInfo: () =>
    new Promise((res, rej) => {
      res({
        code: 200,
        message: '유저 조회에 성공했습니다.',
        data: {
          userId: 1,
          userName: '황태환',
          isHouseBuilt: false,
          todayMissionComplete: false,
        },
      });
      // rej();
    })
      .then((res: any) => res.data)
      .catch((err) => {
        throw new Error();
      }),
};
