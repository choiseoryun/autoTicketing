<h1>인터파크 매크로 프로그램</h1>

![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=auto%20ticketing&fontSize=90)

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fchoiseoryun&count_bg=%238EE8ED&title_bg=%23BAB6B6&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

제작기간 6월 17일 ~ ing
<h2>사용 스택</h2>

![Node.js](https://img.shields.io/badge/Node.js-5FA04E.svg?&style=for-the-badge&logo=Node.js&logoColor=white)
![javascript](https://img.shields.io/badge/javascript-F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=white)
![html5](https://img.shields.io/badge/html5-E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white)

추가로 네이버 클라우드 ocr 사용하고 있습니다

<h2>사용 방법</h2>
<h5>서버 실행 전 준비 방법</h5>

- CLOVA OCR 도메인 생성 이후 API Gateway를 연동한다
  
- 연동 이후 Secret Key, APIGW Invoke URL 값을 가져온다
  
- .env 파일 생성 이후 SERV_PORT, SECRET_KEY, SECRET_URL에 포트번호, Secret Key, APIGW Invoke URL 순서대로 넣는다

<h5>준비가 되었다면</h5>

- 서버를 실행한다(node ./server.js)

- ID, 비밀번호, 공연번호, 회차, 오픈시간을 입력한다
  이때 회차는 아래 그림과 같이 들어갔을 때 나오는 번호를 말한다

  ![image](https://github.com/choiseoryun/autoTicketing/assets/143160067/29140c5c-8e8c-4e93-b888-85aa82aadff5)

- 티켓팅을 한다!
