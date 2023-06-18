# well-Living

## "당신의 마음은 안녕하신가요?" <br>

> 삶의 애착과 긍정성 도모를 이끄는 마음챙김 글쓰기 서비스  👉 https://welldie.com

> 기획서 https://www.miricanvas.com/ko/v/124y97q

 <img width="1300" alt="스크린샷 2023-06-18 오후 12 00 34" src="https://github.com/hackathon20230505/weliving_Server/assets/76617139/8992da3e-21d6-4d80-8a19-3150da7a3b00">

## 📖 Description
<b>"당신의 마음은 안녕하신가요?"</b>

무한 경쟁, 타인과의 관계에서 겪은 깊은 상처 등 우리들의 마음은 제대로 어루만져지지 않고 있습니다.
여러분은 스스로에게 얼마나 친절하신가요 ? <br>
사용자의 감정은 주관적 생각일 뿐, "사실"이 아니라는 객관적 인지 향상과 동시에 사용자의 삶의 애착 증대를 목표로 합니다. <br>


## ⭐ Main Feature

### 추억카드 / 마음챙김 글쓰기 작성 기능
- chatGPT API 를 활용하여 글 내용 기반, 위로/공감의 말 전달

### 공유 기능
- 사용자간의 감정적 유대 및 사회적 공감 증대 (익명성)

### 문자 인증 기능
- 서비스 사용 후 사용자 사후 관리 (문자를 통한 에세이, 좋은 글귀, 명상 음악 등 제공)

### 로그인 기능
- 카카오 소셜 로그인
- JWT 기반의 유저 인증/인가 수행

### 기타 기능
- 추억카드, 마음챙김 글 상세 정보 조회 기능
- 마이페이지 조회 및 수정 기능

<img width="1300" alt="스크린샷 2023-06-18 오후 12 37 58" src="https://github.com/hackathon20230505/weliving_Server/assets/76617139/fa92b0e7-a545-494b-ad5b-f11a2c67ce8f">


## 🔧 Stack
- **Language**: JavaScript
- **Library & Framework** : Node.js
- **Database** : AWS RDS (MariaDB)
- **Deploy**: AWS EC2, Route53, Docker, PM2

<img width="1300" alt="스크린샷 2023-06-18 오후 12 43 08" src="https://github.com/hackathon20230505/weliving_Server/assets/76617139/9bc9abda-3381-41fe-a893-1e2624ca12d2">

## :open_file_folder: Project Structure

```markdown
src
├── auth
├── config
├── controller
   ├── types
├── Dao
    ├── types
├── Routers
     ├── types
├── swagger
├── utils
```

> Swagger Document : http://www.welldie.com:3000/api-docs/


## 👨‍👩‍👧‍👦 Developer
*  **정진철** ([bik1111](https://github.com/bik1111))
*  **이효림** ([rimi3226](https://github.com/rimi3226))


## 📝 Referecne

자기성찰을 위한 글쓰기: 유서 <br>
https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE06613314 <br>
우울 수준별 자살생각에 영향을 미치는 요인에 관한 연구 <br>
https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE10556204 <br>
저널치료 : 새로운 일기쓰기 <br>
https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001228132 <br>
자기자비 글쓰기 프로그램이 대학생의 사회불안에 미치는 영향: 자기비난, 자기개념 명확성, 사회비교경향성을 중심으로 <br>
https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002898932 <br>
집착, 역기능적 문제해결, 마음챙김, 자살생각 간의 관계<br>
https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001292332 <br>
