import React, { useEffect, useMemo, useRef } from 'react';
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

const Modal = ({
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
  const { modalList, modalClose, modalSpeed } = useModalStore();
  const nodeRef = useRef(null);

  const isVisible = useMemo(() => {
    return !!modalList.find((modal) => modal.name === name)?.visible;
  }, [modalList, name]);

  useEffect(() => {
    console.log('isVisible', isVisible);
  }, [isVisible]);

  const onModalEnter = () => {
    console.log(nodeRef.current, modalSpeed);
    gsap.fromTo(
      nodeRef.current,
      {
        autoAlpha: 0,
        ease: 'power3.out',
      },
      {
        autoAlpha: 1,
        duration: modalSpeed / 1000,
        ease: 'power3.out',
      }
    );
  };
  const onModalExit = () => {
    console.log(nodeRef.current, modalSpeed);
    gsap.fromTo(
      nodeRef.current,
      {
        autoAlpha: 1,
        ease: 'power3.out',
      },
      {
        autoAlpha: 0,
        duration: modalSpeed / 1000,
        ease: 'power3.inOut',
      }
    );
  };

  const isOpen = useMemo(() => {
    return modalList.some((modal) => modal.name === name);
  }, [modalList, name]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (closeOnEsc && e.key === 'Escape' && isOpen) {
        modalClose(name);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = ''; // 배경 스크롤 복원
    };
  }, [isOpen, modalClose, name, closeOnEsc]);

  // 오버레이 클릭 처리
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      modalClose(name);
    }
  };

  if (typeof window === 'undefined') return <></>;

  const modalElement = (
    <Transition
      nodeRef={nodeRef}
      timeout={modalSpeed}
      in={isVisible}
      onEnter={() => {
        onModalEnter();
      }}
      onExit={onModalExit}
      unmountOnExit={true}
    >
      <StyledModal
        size={size}
        fullWidth={fullWidth}
        ref={nodeRef}
        className={'test'}
      >
        <div className="modal-container">
          {(title || showCloseButton) && (
            <div className="modal-header">
              {title && <h2 className="modal-title">{title}</h2>}
              {showCloseButton && (
                <button
                  className="modal-close"
                  onClick={() => modalClose(name)}
                  aria-label="닫기"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          )}
          <div className="modal-content">{children}</div>
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
        <div className="modal-overlay" onClick={handleOverlayClick}></div>
      </StyledModal>
    </Transition>
  );
  return createPortal(
    modalElement,
    document.querySelector('#modal-wrap') || document.body
  );
};

Modal.propTypes = {
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

export default Modal;
