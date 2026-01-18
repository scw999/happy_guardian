# 캐릭터 이미지 저장 방법

이 폴더에 **각 캐릭터당 3개씩, 총 12개**의 이미지를 저장해주세요.

## 필요한 이미지 파일

각 캐릭터마다 **3가지 감정 상태** 이미지가 필요합니다:

### 1. 완벽주의 센서티브 (빨간 정장 캐릭터)
- **character1-perfectionist-normal.jpg** - 평소 상태 (기본)
- **character1-perfectionist-happy.jpg** - 행복한 상태 (호감도 70% 이상)
- **character1-perfectionist-unhappy.jpg** - 안좋은 기분 (호감도 35% 미만)

### 2. 비타민 긍정녀 (베이지 카디건 캐릭터)
- **character2-positive-normal.jpg** - 평소 상태 (기본)
- **character2-positive-happy.jpg** - 행복한 상태 (호감도 70% 이상)
- **character2-positive-unhappy.jpg** - 안좋은 기분 (호감도 35% 미만)

### 3. 반전 매력의 츤데레 (고딕 스타일 캐릭터)
- **character3-tsundere-normal.jpg** - 평소 상태 (기본)
- **character3-tsundere-happy.jpg** - 행복한 상태 (호감도 70% 이상)
- **character3-tsundere-unhappy.jpg** - 안좋은 기분 (호감도 35% 미만)

### 4. 논리적인 커리어우먼 (검은 정장 캐릭터)
- **character4-career-normal.jpg** - 평소 상태 (기본)
- **character4-career-happy.jpg** - 행복한 상태 (호감도 70% 이상)
- **character4-career-unhappy.jpg** - 안좋은 기분 (호감도 35% 미만)

## 이미지 저장 방법

### 방법 1: 직접 다운로드
1. 제공된 4개의 이미지를 위의 파일명으로 저장
2. 이 폴더(`webapp/images/`)에 복사

### 방법 2: 명령줄 사용
```bash
# 현재 디렉토리에서 실행
cd webapp/images/

# 다운로드한 이미지 파일을 이 폴더로 이동
mv ~/Downloads/image1.jpg character1-perfectionist.jpg
mv ~/Downloads/image2.jpg character2-positive.jpg
mv ~/Downloads/image3.jpg character3-tsundere.jpg
mv ~/Downloads/image4.jpg character4-career.jpg
```

## 이미지 형식

- **지원 형식**: JPG, JPEG, PNG
- **권장 크기**: 최소 500x500px (정사각형 또는 세로형)
- **파일 크기**: 각 이미지당 2MB 이하 권장

## 참고사항

이미지가 없어도 게임은 실행되지만, 이미지가 표시되지 않습니다.
모든 이미지 파일을 저장한 후 브라우저를 새로고침하세요.
