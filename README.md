# Next Guide (Next.js 프로젝트)

이 프로젝트는 [Next.js](https://nextjs.org) 프레임워크를 기반으로 한 웹 애플리케이션입니다.

<p align="center">
  <img src="https://nextjs.org/static/blog/next-13/twitter-card.png" alt="Next.js Logo" width="500">
</p>

## 목차

- [개요](#개요)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [설치 및 실행 방법](#설치-및-실행-방법)
- [개발 환경 설정](#개발-환경-설정)
- [주요 기능](#주요-기능)
- [API 사용법](#api-사용법)
- [배포 방법](#배포-방법)
- [기여 방법](#기여-방법)
- [라이센스](#라이센스)

## 개요

이 프로젝트는 **EMOTION CT1의 프론트엔드 아키텍처**를 구현한 **보일러플레이트(Boilerplate)**입니다. 팀 내에서 새로운 프로젝트를 시작할 때 일관된 코드 구조와 개발 방식을 유지하기 위한 기본 템플릿으로 설계되었습니다.

이 보일러플레이트는 Next.js의 최신 기능들을 활용하여 빠른 페이지 로딩과 서버 사이드 렌더링 기능을 제공하며, React 19의 최신 기능과 함께 사용자 경험을 최적화하고, 개발자 경험을 향상시키기 위한 다양한 도구와 라이브러리를 통합하였습니다.

### 보일러플레이트 사용 목적

- **개발 시간 단축**: 프로젝트 초기 설정에 드는 시간을 절약합니다.
- **일관성 유지**: 모든 프로젝트가 동일한 구조와 기술 스택을 사용하도록 합니다.
- **모범 사례 적용**: 검증된 아키텍처와 패턴을 적용할 수 있습니다.
- **온보딩 간소화**: 새로운 팀원이 프로젝트 구조를 빠르게 이해할 수 있습니다.

### EMOTION CT1 아키텍처 원칙

EMOTION CT1 아키텍처는 컴포넌트 기반 개발에 중점을 두고, 재사용성과 유지보수성을 극대화하기 위한 구조를 제공합니다. 이 아키텍처는 다음과 같은 핵심 원칙을 따릅니다:

- **컴포넌트 분리**: UI, 비즈니스 로직, 상태 관리의 명확한 분리
- **선언적 UI**: 예측 가능하고 관리하기 쉬운 UI 구조
- **효율적인 상태 관리**: Zustand를 활용한 중앙 집중식 상태 관리
- **성능 최적화**: 코드 스플리팅, 지연 로딩, 메모이제이션을 통한 최적화

각 프로젝트의 요구사항에 맞게 이 보일러플레이트를 자유롭게 수정하고 확장하여 사용할 수 있습니다.

## 기술 스택

### 프론트엔드

- **Next.js 15.1.4**: React 기반의 프레임워크
- **React 19.0.0**: UI 라이브러리
- **Emotion**: CSS-in-JS 스타일링 솔루션
- **Zustand**: 상태 관리 라이브러리
- **SWR**: 데이터 페칭 라이브러리
- **React Hook Form**: 폼 관리 라이브러리
- **GSAP**: 애니메이션 라이브러리

### 개발 도구

- **ESLint/Prettier**: 코드 스타일 및 품질 관리
- **Turbopack**: 고속 개발 환경 지원
- **Source Map Explorer**: 번들 분석 도구

## 프로젝트 구조

```
src/
├── components/        # 재사용 가능한 컴포넌트
│   ├── common/        # 공통 컴포넌트
│   ├── layout/        # 레이아웃 관련 컴포넌트
│   └── ui/            # UI 컴포넌트
├── hook/              # 커스텀 훅
├── lib/               # 외부 라이브러리 관련 설정
├── pages/             # 페이지 및 라우팅
│   └── api/           # API 라우트
├── store/             # 상태 관리 (Zustand)
├── styles/            # 전역 스타일 및 테마
└── utils/             # 유틸리티 함수
```

## 설치 및 실행 방법

### 사전 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn, pnpm, bun

### 설치

```bash
# 저장소 복제
git clone https://github.com/your-username/next_guide.git
cd next_guide

# 의존성 설치
npm install
# 또는
yarn install
# 또는
pnpm install
# 또는
bun install
```

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
# 또는
bun dev
```

http://localhost:3000으로 브라우저에서 접속하면 애플리케이션을 확인할 수 있습니다.

## 개발 환경 설정

### 환경 변수

프로젝트는 다양한 환경에 대한 설정을 지원합니다:

- `.env.development`: 개발 환경 설정
- `.env.staging`: 스테이징 환경 설정
- `.env.production`: 프로덕션 환경 설정

### 패키지 분석

번들 크기를 분석하려면 다음 명령어를 실행하세요:

```bash
npm run analyze
# 또는
yarn analyze
```

## 주요 기능

- **반응형 UI**: 다양한 디바이스에 최적화된 인터페이스
- **데이터 페칭**: SWR을 활용한 효율적인 데이터 관리
- **상태 관리**: Zustand를 활용한 예측 가능한 상태 관리
- **폼 처리**: React Hook Form을 활용한 효율적인 폼 관리
- **에러 처리**: React Error Boundary를 활용한 우아한 오류 처리
- **애니메이션**: GSAP를 활용한 다이나믹한 UI 효과

## API 사용법

API 라우트는 `/api/*` 패턴으로 접근할 수 있습니다. 예를 들어:

```javascript
// 데이터 가져오기 예제
import { fetcher } from '@/lib/axiosInstance';
import useSWR from 'swr';

function MyComponent() {
  const { data, error } = useSWR('/api/endpoint', fetcher);

  if (error) return <div>에러가 발생했습니다.</div>;
  if (!data) return <div>로딩중...</div>;

  return <div>{data.message}</div>;
}
```

## 배포 방법

### Vercel 배포

가장 쉬운 배포 방법은 [Vercel 플랫폼](https://vercel.com)을 사용하는 것입니다:

1. GitHub, GitLab 또는 BitBucket에 프로젝트를 푸시합니다.
2. Vercel에서 새 프로젝트를 생성하고 저장소를 연결합니다.
3. 환경 변수를 설정하고 배포합니다.

### 수동 배포

```bash
# 프로덕션 빌드
npm run build
# 또는
yarn build

# 서버 시작
npm run start
# 또는
yarn start
```

자세한 배포 옵션은 [Next.js 배포 문서](https://nextjs.org/docs/pages/building-your-application/deploying)를 참조하세요.
