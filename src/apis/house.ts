// 아래는 모킹 함수
// TODO: 실제 api로 함수 바꿔야 함
export default {
  getHouseOutside: (userId: number) =>
    // 아이디 쿼리 파라미터로 넘김
    new Promise((res, rej) => {
      res({
        code: 200,
        message: '하우스 조회를 완료했습니다.',
        data: {
          icingId: 3,
          cookieIds: [1, 4],
          houseName: '오동재의 집',
        },
      });
      rej();
    })
      .then((res: any) => res.data)
      .catch((err) => {
        throw new Error();
      }),
};
