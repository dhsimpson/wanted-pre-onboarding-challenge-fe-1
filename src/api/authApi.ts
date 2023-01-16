import axios from 'axios';
//TODO : 여기는 axiosClient 사용하지 않아도 되려나?? auth header 사용치 않는 axiosClient 를 새로 만들어야 하나?
//TODO : [이건 pr 메시지 및 과제 제출에 적을 내용] - ts가 개발 편의성에 도움을 주는 부분을 확실히 알게 됨. authorization 토큰을 주입하지 않도록 axios.interceptor 설정을 했는데,
// 그러면서 api 의 input param 타입을 수정함. 수정 헀더니 해당 메서드에 토큰 파라미터 넣지 말라고 나옴. js 였다면 직접 해당 api와 연관 된 메서드들을 찾아 다니면서 어떤 파라미터를 제거해야 할 지 봐야 했을 것인데,
// (or 상용 환경에서 문제가 생기거나) ts 의 경우엔 ts 가 다 알려주니 개발 편의성이 굉장히 좋은 것을 느낄 수 있었음.
// ts 는 '유지보수' 와 같은 작업을 할 때 굉장히 좋은 것 같다.
// c.f. 개발자의 대부분의 업무는 '유지보수' 다.
interface AuthMutationParams {
  email: string;
  password: string;
  url: string;
}
interface AuthMutationResponse {
  token: string;
  data: {
    token: string;
  };
}

export const authApi = (params: AuthMutationParams) =>
  axios.post<any, AuthMutationResponse>(`http://localhost:8080${params.url}`, {
    email: params.email,
    password: params.password,
  });
