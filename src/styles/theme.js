export const theme = {
  button: {
    primary: {
      bg: '#EA511E',
      hover: '#EA511E',
      text: '#000',
    },
    secondary: {
      bg: '#DDDDDD', 
      hover: '#DDDDDD',
      text: '#000',
    },
    tertiary : {
      bg: '#000', 
      hover: '#000',
      text: '#FFFFFF',
    },
  },
  fontSizes: {
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
  },
  colors: {
    primary: '#EA511E', // 주황색
    secondary: '#309CFF', // 파랑
    danger: '#DD181B', // 빨강

    success: '#4CAF50',
    warning: '#FFA726',
    error: '#DD181B',
    info: '#309CFF',

    white: '#FFFFFF',
    gray100: '#F6F6F6', 
    gray200: '#EEEEEE',
    gray300: '#CCCCCC',
    gray400: '#BBBBBB',
    gray500: '#AAAAAA',
    gray600: '#888888',
    gray700: '#555555',
    black: '#000000',
  },
};

/**
 * px 값을 rem 단위로 변환 (10px 기준)
 * @param {number} px - 변환할 px 값
 * @returns {string} rem 단위 문자열 (예: rem(10) -> '1rem')
 */
export const rem = (px) => {
  return `${px / 10}rem`;
};

/**
 * 색상에 투명도 추가 - 단순한 버전
 * @param {string|object} color - 색상 값(hex), 객체, 또는 경로 문자열
 * @param {number} opacity - 0부터 1 사이의 투명도 값
 * @returns {string|function} - rgba 색상 문자열 또는 함수
 */
export const opacity = (color, opacity = 1) => {
  // 객체가 직접 전달된 경우 (theme.button.primary.bg 같은 경우)
  if (typeof color === 'object' && color !== null) {
    // 객체가 색상 코드를 담고 있으면 직접 사용
    if (typeof color === 'string' && color.startsWith('#')) {
      return hexToRgba(color, opacity);
    }
    // 버튼 스타일에서 사용 중인 경우
    return `rgba(234, 81, 30, ${opacity})`; // #EA511E의 RGB 값
  }
  
  // 문자열 색상 코드인 경우
  if (typeof color === 'string' && color.startsWith('#')) {
    return hexToRgba(color, opacity);
  }
  
  // 문자열 경로나 다른 경우 - 함수 반환
  return (theme) => {
    let colorValue;
    
    // 경로 문자열인 경우 (예: 'button.primary.bg', 'primary')
    if (typeof color === 'string') {
      if (color.includes('.')) {
        const parts = color.split('.');
        let value = theme;
        
        for (const part of parts) {
          value = value?.[part];
          if (value === undefined) break;
        }
        
        colorValue = value;
      } else {
        // 단일 키
        colorValue = theme.colors[color];
      }
    }
    
    if (!colorValue) return `rgba(0, 0, 0, ${opacity})`; // 기본값
    
    return hexToRgba(colorValue, opacity);
  };
};

// HEX 색상 코드를 RGBA로 변환하는 헬퍼 함수
function hexToRgba(hexColor, opacity = 1) {
  if (typeof hexColor !== 'string') return `rgba(0, 0, 0, ${opacity})`;
  
  const hex = hexColor.replace('#', '');
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(0, 0, 0, ${opacity})`;
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export default theme;
