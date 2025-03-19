import React, { useState } from 'react';
import styled from '@emotion/styled';
import DatePicker from '@/components/forms/DatePicker/DatePicker';

// 스타일드 컴포넌트
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const Code = styled.pre`
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  overflow: auto;
  margin-top: 20px;
  font-family: monospace;
  font-size: 14px;
`;

const DatePickerExample = () => {
  // 기본 DatePicker 상태
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 범위 제한 DatePicker 상태
  const [dateWithRange, setDateWithRange] = useState(new Date());

  // 에러 상태 DatePicker
  const [dateWithError, setDateWithError] = useState(null);

  // 날짜 범위 선택 상태
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // 기본 날짜 선택 핸들러
  const handleChange = (date) => {
    setSelectedDate(date);
  };

  // 날짜 범위 선택 핸들러
  const handleRangeChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <Container>
      <h1>DatePicker 컴포넌트 예제</h1>
      <p>
        이 예제는 react-datepicker 라이브러리를 기반으로 구현된 커스텀
        DatePicker 컴포넌트를 보여줍니다. 기존 Input 컴포넌트를 활용하여 일관된
        디자인 시스템을 유지합니다.
      </p>

      <Section>
        <h2>기본 DatePicker</h2>
        <p>
          기본적인 날짜 선택 컴포넌트입니다. 한국어 로케일이 적용되어 있습니다.
        </p>

        <DatePicker
          name="basic-date"
          label="날짜 선택"
          placeholder="YYYY.MM.DD"
          value={selectedDate}
          onChange={handleChange}
          isClearable={true}
          required={true}
          size="small"
        />
      </Section>

      <Section>
        <h2>날짜 범위 선택</h2>
        <p>
          시작일과 종료일을 한 번에 선택할 수 있는 DatePicker입니다. 토요일은
          파란색, 일요일은 빨간색으로 표시됩니다.
        </p>

        <DatePicker
          name="range-date"
          label="날짜 범위 선택"
          placeholder="시작일 ~ 종료일"
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={handleRangeChange}
          isClearable={true}
        />
      </Section>

      <Section>
        <h2>날짜 범위 제한</h2>
        <p>최소 및 최대 선택 가능 날짜가 설정된 DatePicker입니다.</p>
        <Grid>
          <DatePicker
            name="minmax-date"
            label="범위가 있는 날짜 선택"
            placeholder="YYYY.MM.DD"
            value={dateWithRange}
            onChange={setDateWithRange}
            minDate={new Date(new Date().setDate(new Date().getDate() - 5))}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 5))}
            helperText="오늘 기준 ±5일만 선택 가능합니다."
          />
        </Grid>
      </Section>

      <Section>
        <h2>오류 상태</h2>
        <p>오류 메시지가 있는 DatePicker입니다.</p>
        <Grid>
          <DatePicker
            name="error-date"
            label="오류 상태 날짜 선택"
            placeholder="YYYY.MM.DD"
            value={dateWithError}
            onChange={setDateWithError}
            error="날짜를 선택해 주세요."
          />
        </Grid>
      </Section>

      <Section>
        <h2>비활성화 상태</h2>
        <p>비활성화된 DatePicker입니다.</p>
        <Grid>
          <DatePicker
            name="disabled-date"
            label="비활성화된 날짜 선택"
            placeholder="YYYY.MM.DD"
            value={new Date()}
            onChange={() => {}}
            disabled
          />
        </Grid>
      </Section>
    </Container>
  );
};

export default DatePickerExample;
