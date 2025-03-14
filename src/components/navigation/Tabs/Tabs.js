import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { StyledTabs } from './Tabs.styles';

/**
 * Tabs 컴포넌트
 * @param {Object} props
 * @param {Array<{label: string, content: React.ReactNode}>} props.tabs - 탭 목록
 * @param {string} props.queryParam - URL에 사용할 쿼리 파라미터 키 (기본값: 'tab')
 */
const Tabs = ({ tabs, queryParam = 'tab', onTabChange }) => {
  const router = useRouter();
  const currentTab = parseInt(router.query[queryParam], 10) || 0; // 쿼리에서 탭 상태를 가져옴

  const handleTabChange = (index) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, [queryParam]: index },
      },
      undefined,
      { shallow: true }
    );
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <StyledTabs>
      <div className="tab-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${currentTab === index ? 'active' : ''}`}
            onClick={() => handleTabChange(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[currentTab]?.content}</div>
    </StyledTabs>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  queryParam: PropTypes.string, // 각 탭 인스턴스를 구분하는 쿼리 키
  onTabChange: PropTypes.func,
};

export default Tabs;
