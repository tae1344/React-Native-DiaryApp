<p align="center"><img src="https://user-images.githubusercontent.com/60888056/104449235-a211a500-55e1-11eb-9f66-7cd0f6ee1a50.png"/></p>

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
###### 개인 프로젝트(2020.12.30~2021.01.07)
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

- 달력
react-native-calendars 라이브러리 사용했고, 일기가 작성된 날짜를 표시하도록 스타일링 했습니다.

- 일기 작성 & 읽기 & 수정 & 삭제 기능
- 모든 작성 된 일기를 보여주는 스크롤 뷰
- Imgae Picker 라이브러리를 사용한 이미지 선택 & 저장 & 삭제 & 수정 기능
- 파이어베이스 Realtime Data Base & Cloud Storage 이용한 백엔드 구현

---

#### 앱 동작 화면


##### 1. 초기 화면

![image1](https://user-images.githubusercontent.com/60888056/103906523-5f644e80-5143-11eb-861f-f7932b165d96.jpg)

앱의 첫 화면으로 달력을 표시해주고, 달력에는 일기가 작성된 날짜에 색깔 마킹으로 표시를 합니다. 일기를 작성하려면 작성하고자 하는 날짜를 클릭하면 일기를 작성할 수 있는 뷰로 넘어가게 됩니다. 그리고 화면 아래쪽 플러스 아이콘의 기호를 누르게 되면 '오늘' 날짜의 일기를 작성하도록 하는 기능입니다.

##### 2. 일기 작성 화면

![image2](https://user-images.githubusercontent.com/60888056/103906522-5ecbb800-5143-11eb-8993-4e23f0ff1924.jpg)

일기를 작성하는 화면으로 상단 날짜를 표시해주고 아래 텍스트 입력란에 일기를 작성하도록 했습니다. 그리고 하단에 '이미지 업로드' 버튼을 클릭해 선택한 이미지가 썸네일 형태로 나타나도록 구현했습니다. 

아래 '체크' 아이콘을 클릭하면 텍스트와 날짜 그리고 이미지 정보는 Firebase Data Base로 저장, 이미지 파일은 Firebase Cloud Storage에 저장하도록 구현했습니다.

##### 3. 작성한 일기 읽기

![image4](https://user-images.githubusercontent.com/60888056/103908264-a5baad00-5145-11eb-944d-456258286fb8.jpg)

작성한 일기를 읽는 화면으로 상단 Header 오른쪽 아이콘을 클릭하면, 수정하기와 삭제 기능을 제공하는 뷰가 나타납니다. 수정하기를 선택하면 저장 된 텍스트와 이미지를 Firebase에서 가져와 수정 작업을 할 수 있게 됩니다. 하단 이미지를 클릭하면 화면 큰 이미지로 확대해 볼 수 있도록 Modal 뷰가 나타나도록 구현했습니다.

##### 4. 작성한 일기 목록

![image3](https://user-images.githubusercontent.com/60888056/103908268-a6534380-5145-11eb-9d9a-195587700381.jpg)

작성한 일기 목록들을 Scroll List View를 이용해 나타나도록 했고, 각 목록의 텍스트의 양이 한 줄 이상 넘어가면 보이지 않도록 설정해 균일한 크기의 목록으로 나타나도록 구현했습니다.
목록을 클릭하면 해당 일기 화면으로 넘어가게 됩니다.
