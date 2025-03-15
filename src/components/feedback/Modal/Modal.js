import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { StyledModal } from './Modal.styles';
import { useModalStore } from '@/store/modalStore';
import gsap from 'gsap';

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ModalComponent = ({
  title,
  name,
  children,
  footer,
  size = 'medium',
  fullWidth = false,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { modalList, modalClose, modalSpeed } = useModalStore();
  const nodeRef = useRef(null);
  const contentRef = useRef(null);
  const titleId = useMemo(() => `modal-title-${name}`, [name]);
  const contentId = useMemo(() => `modal-content-${name}`, [name]);
  const previousFocusRef = useRef(null);

  const modalItem = useMemo(() => {
    return modalList.find((modal) => modal.name === name);
  }, [modalList, name]);

  // 현재 모달이 최상위 모달인지 확인하는 함수
  const isTopModal = useMemo(() => {
    if (!isVisible) return false;

    // 모달 목록이 비어있거나 현재 모달이 목록에 없으면 false
    if (!modalList.length || !modalItem) return false;

    // 보이는 모달 중에서 가장 마지막(최상위)에 있는 모달 찾기
    const visibleModals = modalList.filter((modal) => modal.visible);
    const topModal = visibleModals[visibleModals.length - 1];

    // 현재 모달이 최상위 모달인지 확인
    return topModal && topModal.name === name;
  }, [modalList, modalItem, name, isVisible]);

  useEffect(() => {
    setIsVisible(!!modalItem?.visible);
  }, [modalItem]);

  // 포커스 트랩 및 관리
  useEffect(() => {
    if (!isVisible) return;

    // 모달이 열릴 때 현재 포커스된 요소 저장
    previousFocusRef.current = document.activeElement;

    // 포커스 가능한 요소들을 찾는 함수
    const getFocusableElements = () => {
      if (!contentRef.current) return [];

      const focusableSelectors = [
        'button:not([disabled])',
        'a[href]:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(',');

      return Array.from(
        contentRef.current.querySelectorAll(focusableSelectors)
      );
    };

    // 초기 포커스 설정
    const setInitialFocus = () => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length) {
        // 첫 번째 포커스 가능한 요소에 포커스
        setTimeout(() => {
          focusableElements[0].focus();
        }, 50);
      } else if (contentRef.current) {
        // 포커스 가능한 요소가 없으면 컨테이너에 포커스
        contentRef.current.focus();
      }
    };

    // 탭 키 처리 함수
    const handleTabKey = (e) => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift + Tab을 누르고 첫 번째 요소에 포커스가 있는 경우
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // Tab을 누르고 마지막 요소에 포커스가 있는 경우
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    // 키보드 이벤트 핸들러
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        handleTabKey(e);
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener('keydown', handleKeyDown);
    setInitialFocus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // 모달이 닫힐 때 이전 포커스로 복원
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isVisible]);

  const onModalEnter = useCallback(() => {
    gsap.fromTo(
      nodeRef.current,
      { autoAlpha: 0, ease: 'power3.out' },
      { autoAlpha: 1, duration: modalSpeed / 1000, ease: 'power3.out' }
    );
  }, [modalSpeed]);

  const onModalExit = useCallback(() => {
    gsap.fromTo(
      nodeRef.current,
      { autoAlpha: 1, ease: 'power3.out' },
      { autoAlpha: 0, duration: modalSpeed / 1000, ease: 'power3.inOut' }
    );
  }, [modalSpeed]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      // 현재 모달이 최상위 모달이고, ESC 키를 눌렀을 때만 닫기
      if (closeOnEsc && e.key === 'Escape' && isVisible && isTopModal) {
        e.preventDefault(); // 이벤트 전파 방지
        e.stopPropagation(); // 이벤트 버블링 방지
        modalClose(name);
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = ''; // 배경 스크롤 복원
    };
  }, [isVisible, modalClose, name, closeOnEsc, isTopModal]);

  // 오버레이 클릭 처리를 useCallback으로 메모이제이션
  const handleOverlayClick = useCallback(
    (e) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        modalClose(name);
      }
    },
    [closeOnOverlayClick, modalClose, name]
  );

  if (typeof window === 'undefined') return <></>;

  const modalElement = (
    <Transition
      nodeRef={nodeRef}
      timeout={modalSpeed}
      in={isVisible}
      onEnter={onModalEnter}
      onExit={onModalExit}
      unmountOnExit={true}
    >
      <StyledModal
        size={size}
        fullWidth={fullWidth}
        ref={nodeRef}
        className={`modal-${name}`}
      >
        <div
          className="modal-container"
          ref={contentRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={contentId}
          tabIndex="-1" // 컨테이너에 포커스할 수 있도록 설정
        >
          {(title || showCloseButton) && (
            <div className="modal-header">
              {title && (
                <h2 className="modal-title" id={titleId}>
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  className="modal-close"
                  onClick={() => modalClose(name)}
                  aria-label="모달 닫기"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          )}
          <div className="modal-content" id={contentId}>
            {children}
          </div>
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
        <div
          className="modal-overlay"
          onClick={handleOverlayClick}
          aria-hidden="true"
        ></div>
      </StyledModal>
    </Transition>
  );
  return createPortal(
    modalElement,
    document.querySelector('#modal-wrap') || document.body
  );
};

ModalComponent.propTypes = {
  name: PropTypes.string,
  title: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'fullscreen']),
  fullWidth: PropTypes.bool,
  closeOnOverlayClick: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  showCloseButton: PropTypes.bool,
};

// React.memo를 사용하여 컴포넌트 메모이제이션
const Modal = React.memo(ModalComponent);

export default Modal;
