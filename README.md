This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Back-End Spec
MongoDB, express
## Front-End Spec
React, Redux, Bootstrap, styled-component

## 배포 
heroku https://powerful-falls-31436.herokuapp.com/

## 스크린샷
### 로그인페이지
<img width="1259" alt="스크린샷 2020-04-07 오전 12 32 18" src="https://user-images.githubusercontent.com/55937548/78576158-41418900-7867-11ea-9c58-e648e6e76fde.png">

### 회원가입 페이지
<img width="1259" alt="스크린샷 2020-04-07 오전 1 42 38" src="https://user-images.githubusercontent.com/55937548/78583029-34299780-7871-11ea-8a9d-ab5f6bfa2e69.png">

### Landing 페이지
<img width="990" alt="스크린샷 2020-04-08 오후 2 16 09" src="https://user-images.githubusercontent.com/55937548/78747084-88cd2f80-79a3-11ea-90bd-459398c90499.png">
<img width="1773" alt="스크린샷 2020-04-08 오후 1 40 24" src="https://user-images.githubusercontent.com/55937548/78745246-861c0b80-799e-11ea-97d8-56e9de19d3d5.png">
<img width="1774" alt="스크린샷 2020-04-07 오후 4 31 36" src="https://user-images.githubusercontent.com/55937548/78642184-447f5800-78ed-11ea-85b7-b31978afe6b5.png">

### Favorite 페이지
<img width="1531" alt="스크린샷 2020-04-09 오전 11 21 42" src="https://user-images.githubusercontent.com/55937548/78851262-57606c80-7a54-11ea-8106-97466485bbc3.png">

### Ranking 페이지
<img width="1676" alt="스크린샷 2020-04-08 오전 11 15 48" src="https://user-images.githubusercontent.com/55937548/78737364-5236eb00-798a-11ea-9d00-0ba73b95c153.png">

### Detail 페이지
<img width="1531" alt="스크린샷 2020-04-08 오후 4 28 56" src="https://user-images.githubusercontent.com/55937548/78756656-1d408d80-79b6-11ea-8958-6261003b5751.png">

### Product 페이지
<img width="1531" alt="스크린샷 2020-04-09 오전 11 28 35" src="https://user-images.githubusercontent.com/55937548/78851646-48c68500-7a55-11ea-9972-50c19e96f2ac.png">

### Cart 페이지
<img width="1531" alt="스크린샷 2020-04-09 오전 11 13 09" src="https://user-images.githubusercontent.com/55937548/78850852-32b7c500-7a53-11ea-8cb3-5c431d3c06f8.png">

## 오류 및 해결

 <img width="311" alt="스크린샷 2020-03-27 오전 5 18 53" src="https://user-images.githubusercontent.com/55937548/77692708-7558b680-6fea-11ea-9def-e2bb5d75bbb5.png">

 ### CORS 이슈 문제
 ### 해결책
 Axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${API_KEY}`)

 <img width="622" alt="스크린샷 2020-04-05 오후 7 12 14" src="https://user-images.githubusercontent.com/55937548/78472164-a2873080-7771-11ea-9787-fd7c4479eda7.png">

![스크린샷 2020-04-05 오후 7 12 53](https://user-images.githubusercontent.com/55937548/78472174-ab780200-7771-11ea-852a-b29978a26d68.png)

### 불러온데이터에서 HTML태그도 같이있는 문제
<img width="1110" alt="스크린샷 2020-04-08 오후 1 24 52" src="https://user-images.githubusercontent.com/55937548/78744423-7b607700-799c-11ea-96d7-389bc03b1ebf.png">

### 해결책
![스크린샷 2020-04-08 오후 1 30 58](https://user-images.githubusercontent.com/55937548/78744707-3557e300-799d-11ea-9ca7-121cc37deca2.png)
정규표현식과 replace함수을 활용해서 해결

### 페이지 이동시 첫화면이 스크롤이 그대로인 문제
<img width="1059" alt="스크린샷 2020-04-09 오후 9 27 27" src="https://user-images.githubusercontent.com/55937548/78894965-0169e400-7aa9-11ea-8796-8b59c9ff4b55.png">
 
 ### 해결책
useEffect(() => {
      window.scrollTo(0, 0)
    });