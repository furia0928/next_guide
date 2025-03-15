import styled from '@emotion/styled';

export const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-container {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 40rem;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme?.colors?.background || '#ffffff'};
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    padding: 24px;
    max-width: ${({ size }) => {
      switch (size) {
        case 'small':
          return '400px';
        case 'large':
          return '800px';
        case 'fullscreen':
          return '95%';
        default:
          return '600px';
      }
    }};
    width: ${({ fullWidth }) => (fullWidth ? '95%' : 'auto')};
    max-height: 90vh;
    overflow-y: auto;
    z-index: 1;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .modal-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme?.colors?.text || '#333333'};
    margin: 0;
  }

  .modal-close {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme?.colors?.textSecondary || '#666666'};
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme?.colors?.text || '#333333'};
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .modal-content {
    margin-bottom: 16px;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
  }
`;
