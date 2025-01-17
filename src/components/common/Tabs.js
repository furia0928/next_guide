/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';

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
      { shallow: true } // shallow로 페이지 리로드 방지
    );
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div css={styles.container}>
      <div css={styles.tabHeader}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            css={[styles.tabButton, currentTab === index && styles.activeTab]}
            onClick={() => handleTabChange(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
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
};

const styles = {
  container: css`
    position: relative;
    width: 100%;
    background: #fff;
  `,
  tabHeader: css`
    display: flex;
    border-bottom: 2px solid #ddd;
    margin-bottom: 16px;
  `,
  tabButton: css`
    flex: 1;
    padding: 12px 16px;
    cursor: pointer;
    border: none;
    background: transparent;
    font-size: 16px;
    font-weight: bold;
    color: #555;
    outline: none;
    transition: color 0.3s, border-bottom 0.3s;

    &:hover {
      color: #333;
    }
  `,
  activeTab: css`
    color: #0070f3;
    border-bottom: 2px solid #0070f3;
  `,
  tabContent: css`
    padding: 16px;
    font-size: 14px;
    color: #333;
  `,
};

export default Tabs;
