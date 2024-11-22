# chatty-web
chatty 프로젝트의 프론트엔드 개발 관련 내용입니다.

## 개발 환경
- React
- Typescript
- tailwind css

## 브랜치 전략
Git Flow 전략을 기반으로 main, develop, feature 브랜치 활용

- 신규 기능 개발 시, develop 브랜치를 기준으로 feature 브랜치 생성 후 작업
- 작업이 완료된 feature 브랜치는 develop브랜치로 병합(merge)하며 이때 pull request를 통해 review 진행
![image](https://github.com/user-attachments/assets/de81949b-d1b3-4cc5-bf21-2f9536295332)


## 기능 설명
### 1. 회원가입 및 로그인

| **아이디 중복확인** | **비밀번호 유효성 검사** |
| :------: |  :------: | 
| <img src="https://github.com/user-attachments/assets/12abb54f-b38f-42e5-81f2-8b887cc52956" width=80%> | <img src="https://github.com/user-attachments/assets/ff4081c1-c962-4b08-9f33-bebc5a10b249" width=80%> | 

   
### 2. 워크스페이스 
| **목록 확인** | **워크스페이스 생성** |
| :------: | :------: | 
| <img width=80% src="https://github.com/user-attachments/assets/1245913b-2fe7-4d16-9bc6-9e64cdb21af9"> | <img width=80% src="https://github.com/user-attachments/assets/81545ad6-1f3d-4f70-a6e4-21ef6810b97b"> |

### 3. 워크스페이스 입장
| **멤버/채널 등 워크스페이스 관리** | **워크스페이스 변경** |
| :------: | :------: | 
| <img width=80% src="https://github.com/user-attachments/assets/423b2d6b-c1a3-40b4-b2e1-38df46d48e65"> | <img width=80% src="https://github.com/user-attachments/assets/9fb31692-a744-434d-bf41-30b7d0881880"> |

### 4. 채팅
| **채팅내역** |
| :------: |
| 안읽은 메세지가 쌓인 경우 마지막으로 읽은 메세지 표시 / 무한스크롤 적용 <br>  <img width=60% src="https://github.com/user-attachments/assets/0f4ec3fb-3c14-4bfb-b02e-b2c2c2083ffb"> |

### 5. 마이페이지
| **개인정보 수정** |
| :------:|
| <img width=40% src="https://github.com/user-attachments/assets/42566d3f-b0bc-4424-8fbb-98855cb04953"> <img width=40%  src="https://github.com/user-attachments/assets/d7128a3b-964b-48c2-ab76-45f1e5b667c6">  |



## 프로젝트 src 폴더구조
```
└── src
     ├── api
     │     └── auth
     │     └── chat
     │     └── user
     │     └── util
     │     └── workspace
     ├── assets
     ├── components
     │     └── DropdownMenu.tsx
     │     └── DropdownItem.tsx
     │     └── Modal.tsx
     │     └── NavBar.tsx
     │          .
     │          .
     │          .
     ├── features
     │     └── authSlice.ts
     │     └── userSlice.ts
     │     └── workspaceSlice.ts
     ├── pages
     │     └── Chat.tsx
     │     └── Home.tsx
     │     └── Login.tsx
     │     └── NotFound.tsx
     │          .
     │          .
     │          .
     ├── store 
     │     └── store.ts
     ├── styles
     │     └── index.css
     ├── types
     │     └── auth.d.ts
     │     └── user.d.ts
     │     └── workspace.d.ts
     │     └── common.d.ts
     │     └── chat.ts
     ├── App.tsx
     ├── index.tsx
```
