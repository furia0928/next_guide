import React, { useState } from 'react';
import styled from '@emotion/styled';
import Select from '@/components/forms/Select/Select';
import { theme } from '@/styles/theme';

const SelectEx = () => {
  // 각 샘플 Select의 상태 관리
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [language, setLanguage] = useState('');
  const [technology, setTechnology] = useState('');
  const [color, setColor] = useState('');

  // 샘플 데이터
  const countryOptions = [
    { value: 'kr', label: '대한민국' },
    { value: 'us', label: '미국' },
    { value: 'jp', label: '일본' },
    { value: 'cn', label: '중국' },
    { value: 'gb', label: '영국' }
  ];

  const cityOptions = [
    { value: 'seoul', label: '서울' },
    { value: 'busan', label: '부산' },
    { value: 'incheon', label: '인천' },
    { value: 'daegu', label: '대구', disabled: true },
    { value: 'daejeon', label: '대전' }
  ];

  const languageOptions = [
    { value: 'ko', label: '한국어' },
    { value: 'en', label: '영어' },
    { value: 'ja', label: '일본어' },
    { value: 'zh', label: '중국어' }
  ];

  const technologyOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' }
  ];

  const colorOptions = [
    { value: 'red', label: '빨강색' },
    { value: 'blue', label: '파랑색' },
    { value: 'green', label: '초록색' },
    { value: 'yellow', label: '노랑색' }
  ];

  // 이벤트 핸들러
  const handleChange = (setState) => (e) => {
    setState(e.target.value);
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify({
      country,
      city,
      language,
      technology,
      color
    }, null, 2));
  };

  return (
    <Container>
      <h1>Select 컴포넌트 예제</h1>
      
      <form onSubmit={handleSubmit}>
        <section className="section">
          <h2>기본 셀렉트 박스</h2>
          <p>기본적인 셀렉트 박스 사용 예시입니다.</p>
          
          <div className="form-group">
            <Select
              id="country"
              name="country"
              label="국가"
              placeholder="국가를 선택하세요"
              options={countryOptions}
              value={country}
              onChange={handleChange(setCountry)}
              helperText="여행하고 싶은 국가를 선택하세요."
            />
          </div>
        </section>

        <section className="section">
          <h2>필수 입력 필드</h2>
          <p>필수 입력 필드로 표시되는 셀렉트 박스입니다.</p>
          
          <div className="form-group">
            <Select
              id="city"
              name="city"
              label="도시"
              placeholder="도시를 선택하세요"
              options={cityOptions}
              value={city}
              onChange={handleChange(setCity)}
              required
              helperText="일부 도시는 선택할 수 없습니다."
            />
          </div>
        </section>

        <section className="section">
          <h2>오류 상태 셀렉트 박스</h2>
          <p>오류 상태를 표시하는 셀렉트 박스입니다.</p>
          
          <div className="form-group">
            <Select
              id="language"
              name="language"
              label="언어"
              placeholder="언어를 선택하세요"
              options={languageOptions}
              value={language}
              onChange={handleChange(setLanguage)}
              error={language === ''}
              helperText={language === '' ? "언어는 필수 선택 항목입니다." : "언어가 선택되었습니다."}
            />
          </div>
        </section>

        <section className="section">
          <h2>비활성화된 셀렉트 박스</h2>
          <p>비활성화된 상태의 셀렉트 박스입니다.</p>
          
          <div className="form-group">
            <Select
              id="disabled-select"
              name="disabled-select"
              label="비활성화된 셀렉트"
              placeholder="선택할 수 없음"
              options={[]}
              value=""
              disabled
              helperText="이 셀렉트 박스는 사용할 수 없습니다."
            />
          </div>
        </section>

        <section className="section">
          <h2>전체 너비 셀렉트 박스</h2>
          <p>컨테이너의 전체 너비를 차지하는 셀렉트 박스입니다.</p>
          
          <div className="form-group">
            <Select
              id="technology"
              name="technology"
              label="기술 스택"
              placeholder="기술을 선택하세요"
              options={technologyOptions}
              value={technology}
              onChange={handleChange(setTechnology)}
              fullWidth
              helperText="가장 관심있는 기술을 선택하세요."
            />
          </div>
        </section>

        <section className="section">
          <h2>스타일 변형 예시</h2>
          <p>커스텀 클래스를 적용한 셀렉트 박스입니다.</p>
          
          <div className="form-group">
            <Select
              id="color"
              name="color"
              label="색상"
              placeholder="색상을 선택하세요"
              options={colorOptions}
              value={color}
              onChange={handleChange(setColor)}
              className="custom-select"
              helperText="좋아하는 색상을 선택하세요."
            />
          </div>
        </section>

        <div className="button-group">
          <button type="submit" className="submit-button">
            제출하기
          </button>
          <button 
            type="button" 
            className="reset-button"
            onClick={() => {
              setCountry('');
              setCity('');
              setLanguage('');
              setTechnology('');
              setColor('');
            }}
          >
            초기화
          </button>
        </div>
      </form>
      
      <section className="section">
        <h2>현재 상태</h2>
        <pre className="state-preview">
          {JSON.stringify({
            country,
            city,
            language,
            technology,
            color
          }, null, 2)}
        </pre>
      </section>
    </Container>
  );
};

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 4rem 2rem;
  font-family: 'Pretendard', sans-serif;

  h1 {
    margin-bottom: 2rem;
    font-size: 2.4rem;
    font-weight: 700;
  }

  .section {
    margin-bottom: 4rem;

    h2 {
      margin-bottom: 1rem;
      font-size: 1.8rem;
      font-weight: 600;
    }

    p {
      margin-bottom: 2rem;
      font-size: 1.4rem;
      color: ${theme.colors.gray600};
    }
  }

  .form-group {
    margin-bottom: 2rem;
    max-width: 40rem;
  }

  .button-group {
    display: flex;
    gap: 1.6rem;
    margin-bottom: 4rem;

    .submit-button {
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};
      border: none;
      border-radius: 0.4rem;
      padding: 1rem 2rem;
      font-size: 1.4rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background-color: ${theme.colors.primaryDark};
      }
    }

    .reset-button {
      background-color: ${theme.colors.gray200};
      color: ${theme.colors.gray700};
      border: none;
      border-radius: 0.4rem;
      padding: 1rem 2rem;
      font-size: 1.4rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background-color: ${theme.colors.gray300};
      }
    }
  }

  .state-preview {
    background-color: ${theme.colors.gray100};
    padding: 1.6rem;
    border-radius: 0.4rem;
    font-family: 'Courier New', monospace;
    font-size: 1.4rem;
    overflow-x: auto;
  }

  .custom-select {
    .select-custom {
      border-width: 0.2rem;
    }

    .select-dropdown {
      border-radius: 0.8rem;
    }

    .select-option {
      &.selected {
        background-color: ${theme.colors.secondary};
        color: ${theme.colors.white};
      }
    }
  }
`;

export default SelectEx; 