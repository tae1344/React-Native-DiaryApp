# Daily Diary App

하루를 정리하며 간단하게 일기를 작성할 수 있는 앱입니다.

---

## 목차

- [project](#project-내용)
- [pakages](#pakages)
- [앱 구성](#앱-구성)
- [앱 동작 화면](#앱-동작-화면)

---

## Project 내용

#### 개요

프론트엔드 공부를 시작하고 여러 프레임워크 중 React를 선택해 공부하게 됐습니다. React를 이용해 웹은 물론 모바일 앱도 개발을 할 수 있다는 것이 매력적이었습니다. 처음 리액트를 독학으로 동영상 강의를 통해 따라하며 기초적인 것을 배웠으며, 조금 더 확실하게 익히고자 개인 프로젝트로 이번 다이어리 앱을 개발하게 됐습니다. 이번 프로젝트에서 백엔드와 DB로 '파이어베이스'를 이용했습니다. 처음 접한 기술이었지만 잘 쓰여진 개발 문서와 예시가 있어 금방 익혀 프로젝트에 적용할 수 있었습니다.

#### pakages

```
"@react-native-community/masked-view": "^0.1.10",
"@react-native-community/viewpager": "4.2.0",
"@react-navigation/native": "^5.8.10",
"@react-navigation/stack": "^5.12.8",
"expo": "^40.0.0",
"expo-app-loading": "^1.0.1",
"expo-font": "~8.4.0",
"expo-image-picker": "~9.2.0",
"expo-status-bar": "~1.0.3",
"firebase": "^7.9.0",
"react": "16.13.1",
"react-dom": "16.13.1",
"react-native": "https://github.com/expo/react-native/archive/sdk-40.0.1.tar.gz",
"react-native-calendars": "^1.1129.0",
"react-native-gesture-handler": "~1.8.0",
"react-native-screens": "~2.15.0",
"react-native-web": "~0.13.12"
```

---

#### 앱 구성

- 달력 : 일기가 작성된 날짜 표시
- 일기 작성 & 읽기 & 수정 & 삭제 기능
- 모든 작성 된 일기를 보여주는 스크롤 뷰
- Imgae Picker 라이브러리를 사용한 이미지 선택 & 저장 & 삭제 & 수정 기능
- 파이어베이스 Realtime Data Base & Cloud Storage 이용한 백엔드 구현

#### 앱 동작
