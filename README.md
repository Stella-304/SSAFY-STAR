# 리드미

# 🌷 SSAFY-STAR - SSAFY 인포메이션/커뮤니케이션 사이트

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled.png)

## SSAFY-STAR 링크 : [https://ssafy-star.com](https://ssafy-star.com/)

## UCC 보기 : [보러가기](https://youtu.be/Hu_f3-gY1qQ)

## 💜 프로젝트 진행 기간

2023.04.10(월) ~ 2022.05.19(금) (39일 소요)

SSAFY 8기 2학기 자율 프로젝트

## 🎵 ssafy-star - 배경

SSAFY 캠퍼스 내에 배치된 선배기수의 한마디가 담긴 롤링페이퍼 판을 보며, “저 분들은 어디에 취직했고, 무엇을 하고 계실까?” 라는 궁금증 에서 이 프로젝트를 시작하게 되었습니다.

SSAFY의 진행 회차가 늘어남에 따라 총 7천명에 육박하는 교육생들이 존재하며 더 증가할테지만, 교육생간의 커뮤니티 공간이 모호하여 인적 네트워크가 활성화 되지 못한 것이 내심 아쉽다고 생각했습니다.

그래서, 현업에 종사하고 계신 선배님들의 정보를 한눈에 모아보고, 곧 수료생이 될 저희를 포함해 졸업기수와 현 기수와의 커뮤니케이션 공간을 제공하면 좋겠다고 생각했습니다.

## 💜 SSAFY-STAR - 개요

- SSAFY-STAR는 SSAFY인들을 위한 “인포메이션&커뮤니케이션 사이트” 입니다.

교육생들은 모두 “별”로 우주 공간에 그려지며, 해당 별은 한마디, 분야, 직장, 이메일 등의 정보를 담고 있습니다.

기수/반/지역 등 공통 분모가 있는 “별” 끼리는 하나의 “운하” 로 표시되어, 각각 별자리를 생성합니다.

사용자는 등록된 정보(별)들을 한눈에 볼 수 있으며, 다중 필터링을 제공합니다.

커뮤니케이션이 가능한 메타버스 공간이 존재합니다. 접근성을 고려해 WebGL을 사용하여 Unity file을 저희 웹 사이트에 포함하였고, 별도의 다운로드 없이 이용 가능합니다.

“민들렛”이라는 프로젝트를 통해 SSAFY인들과 처음 소통했던 기수로써, 저희 프로젝트도 그런 의미있는 작품이 되길 희망하고 있습니다.

## 💜 주요 기능

---

- 정보 조회 - 유니버스 Page
    - 각 유저의 정보가 반 구 형태의 밤하늘의 별로 시각화됩니다.
    - 별을 누르면 해당 유저의 정보가 양면의 카드 형태로 제공됩니다.
    - 카드의 앞면에는 한마디를 포함한 기본 정보, 뒷면에는 상세 정보가 표시됩니다.
    - 카드에는 코멘트(댓글) 작성이 가능합니다.
    - 다중 필터링을 지원하여 여러개의 검색 조건을 적용/해제 할 수 있습니다.
    - 클러스터링한 자료를 통해 검색한 직장명을 입력하면 매핑되는 기업명이 자동 추천됩니다.
    - 설정한 조건으로 그룹화가 가능하며, 공통분모가 있는 별끼리 운하를 형성하여 시각화됩니다.
    - 시각적 요소를 위한 별자리 외 카드 리스트로 보기 기능을 제공합니다.
- 정보 조회 - 싸피통계 Page
    - 별을 등록한 사용자 중, 유의미한 정보들의 통계가 차트로 표시됩니다.
    - 70여개의 개발자 명언과 40여개의 cs퀴즈가 즐길거리로 제공됩니다.
- 커뮤니케이션 - 메타버스 Page
    - Web에서 유저끼리 소통할 수 있는 3d 메타버스 공간이 제공됩니다.
    - 캐릭터는 기본적인 조작과 시점 이동이 가능합니다.
    - 20여개의 캐릭터 선택이 가능합니다.
    - 월드채팅, 귓속말 등의 채팅을 제공합니다.
    - 10여가지의 감정표현을 제공합니다.
    - 프로젝트를 담당하는 코치/컨설턴트 등의 SSAFY 조직내 인원이 NPC로 등장합니다.
    - 메타버스 내 캐릭터 및 NPC의 위치가 지도에 표시됩니다.
    - 자신의 프로젝트를 소개하고, 클릭 시 해당 링크로 이동시키는 홍보관을 제공합니다.
- etc
    - 정확하지 않은 정보 기입이나, 비매너 유저 선별을 위한 신고 기능을 제공합니다.
    - 제공한 정보의 신빙성을 위해, SSAFY 인증 및 회사 인증 기능을 제공합니다.
    - 앞선 기능들을 제어할 수 있는 관리자 전용 페이지가 존재합니다.

## ✔ 주요 기술

---

**Web - Backend**

- IntelliJ IDE 2021.2.4
- Springboot 2.7.10 (Gradle - Groovy, Java11)
    - Dependencies
        - Spring Data JPA
        - Spring Web
        - Spring Boot Devtools
        - Swagger3 (firefox)
        - Lombok
        - SMTP (naver email)
        - Spring Security
        - Oauth2 (naver, kakao, google)
        - JWT
        - Jackson
        - QueryDSL
- Redis 7.2
- MySQL 8.0.31

**Web - Frontend**

- Three.js
- Chart.js
- Node.js 18.12.1-alpine
- React 18
    - React Query
    - React Router
    - Redux Tool Kit
- Tailwinds

**Web - Mateverse**

- Unity
- WebGL
- Photon Fusion

**Infra**

- Gitlab
- AWS EC2 ubuntu
- AWS S3
- Jenkins
- Docker
- Nginx
- CertBot (Let’s Encryt SSL)

**Communication**

- Notion
- Jira
- MatterMost

## ✔ 프로젝트 트리 구조

---

### Backend

```
├─java
│  └─com
│      └─ssafy
│          └─star
│              ├─api
│              │  ├─controller
│              │  └─service
│              ├─common
│              │  ├─auth
│              │  │  ├─entrypoint
│              │  │  ├─enumeration
│              │  │  ├─exception
│              │  │  ├─filter
│              │  │  ├─handler
│              │  │  ├─info
│              │  │  ├─principal
│              │  │  ├─property
│              │  │  ├─repository
│              │  │  └─service
│              │  ├─config
│              │  ├─db
│              │  │  ├─dto
│              │  │  │  ├─request
│              │  │  │  └─response
│              │  │  ├─entity
│              │  │  └─repository
│              │  │      └─querydsl
│              │  ├─exception
│              │  ├─handler
│              │  ├─provider
│              │  └─util
│              │      ├─constant
│              │      ├─converter
│              │      ├─dto
│              │      ├─entity
│              │      └─init
│              └─constellation
└─resources
```

### Frontend

```

├─apis
│  ├─admin
│  ├─card
│  ├─comment
│  ├─company
│  ├─main
│  ├─report
│  ├─star
│  └─user
├─assets
│  ├─fonts
│  └─icons
├─components
│  ├─Admin
│  ├─Button
│  ├─Card
│  ├─Comment
│  ├─Filter
│  ├─Ground
│  ├─GroundObjects
│  ├─Icon
│  ├─Input
│  ├─Layout
│  ├─Star
│  └─Verify
├─constants
├─enum
├─features
├─hooks
├─pages
│  ├─Admin
│  ├─Card
│  ├─Error
│  ├─Report
│  ├─test
│  │  └─webGLBuild
│  └─User
│      └─Mypage
├─stores
│  ├─card
│  ├─page
│  ├─star
│  └─user
├─types
├─utils
└─test
```

## ✔ 팀원 역할 분배 (수정 중)

---

## ✔ 프로젝트 산출물 (수정 중)

---

## ✔ 프로젝트 결과물 (수정 중)

## 🎵 ssafy-star 서비스 화면

---

### 메인 페이지

- 현재 사이트의 이용자 수와 몇 가지 버튼이 제공됩니다.
- 휠을 내리면 웹사이트의 상세 정보가 제공됩니다.
- “별 보러가기” 선택 시 로그인 페이지로 이동합니다.
- 이 외의 서비는 로그인 없이 사용 가능합니다.

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%201.png)

### 로그인 페이지

- 일반 로그인과 소셜 로그인이 제공됩니다.
- 일반 로그인 시 간단한 이메일 인증절차가 필요하며, 비밀번호 재설정 및 발급 기능이 포함됩니다.

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%202.png)

### 등록/수정 페이지

- 일반 로그인과 소셜 로그인이 제공됩니다.
- 일반 로그인 시 간단한 이메일 인증절차가 필요하며, 비밀번호 재설정 및 발급 기능이 포함됩니다.

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%203.png)

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%204.png)

### 유니버스 페이지 - 기본

- 전체 별/별자리가 표시됩니다.
- 나의 별이 존재한다면, 파란색으로 표시됩니다.

![KakaoTalk_20230504_005443485.gif](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/KakaoTalk_20230504_005443485.gif)

### 유니버스 페이지 - 별 클릭 이후

- 앞면에는 한마디와 간략한 정보, 뒷면에는 상세 정보가 표시됩니다.
- 간단한 코멘트를 달 수 있습니다.

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%205.png)

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%206.png)

### 유니버스 페이지 - 필터링

- 필터링 결과에 해당하는 결과만 반환합니다.

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%207.png)

### 유니버스 페이지 - 그룹화

- 그룹화 조건과 필터링 조건을 결합하여 시각화 합니다.

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%208.png)

### 유니버스 페이지 - 카드보기

- 시각화 이외 정보보기의 편의성을 위해 리스트로 보기를 제공합니다.

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%209.png)

### 싸피통계 페이지

- 각 키워드 별 통계를 원 그래프로 제공합니다.
- 간단한 개발자 명언과 cs퀴즈를 제공합니다.

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%2010.png)

### 신고하기

- 부적절한 카드 내용 / 부정적인 언행 / 기타 항목에 대한 신고 기능을 제공합니다.
- 신고 내용은 개발자만 접근 가능한 어드민 페이지에서 조회 가능합니다.

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%2011.png)

### 인증 페이지

- 카드의 신빙성을 더하기 위해, 간단한 이미지로 인증할 수 있습니다.
- 검토 후, 인증된 사용자의 카드에는 인증 뱃지가 제공됩니다.

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%2012.png)

### 메타버스 - 접속 페이지

- 로그인 플레이 시, 설정된 닉네임으로 입장합니다.
- 비 로그인 플레이 시, 닉네임을 설정 후 입장합니다.
- 닉네임은 중복될 수 없습니다.

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%2013.png)

### 메타버스 - 접속 이후

- 날짜/미니맵/캐릭터변경/시점변경/채팅 등이 제공됩니다.

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%2014.png)

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%2015.png)

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%2016.png)

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%2017.png)

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%2018.png)

### 메타버스 - NPC

- 실제 SSAFY 관계자가 NPC화 되어, 개발자 선배로써의 조언을 받아 볼 수 있습니다.

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%2019.png)

### 메타버스 - 프로젝트 홍보관

- 자신의 프로젝트를 홍보할 수 있습니다.

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%2020.png)

![Untitled](exec/%E1%84%85%E1%85%B5%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%20b92f805e977245b08083bc3766baaa3d/Untitled%2021.png)