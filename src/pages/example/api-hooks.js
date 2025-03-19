import React, { useState, useMemo, useEffect } from 'react';
import styled from '@emotion/styled';
import { usePost, usePut, useDelete, useHttp } from '@/hooks/useApi';
import { API_ENDPOINTS } from '@/config/apiEndpoints';
import { theme } from '@/styles/theme';

/**
 * API 훅 사용 예시를 보여주는 페이지
 */
export default function ApiHooksExample() {
  // 폼 상태 관리
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postId, setPostId] = useState('');

  // useMemo를 사용하여 동적 URL 생성 최적화
  const postDetailUrl = useMemo(
    () => API_ENDPOINTS.POSTS.DETAIL(postId),
    [postId]
  );

  // POST 요청 훅 - 중앙 관리되는 URL 사용
  const {
    execute: createPost,
    data: createdPost,
    error: createError,
    isLoading: isCreating,
    reset: resetCreateState,
  } = usePost(API_ENDPOINTS.POSTS.BASE);

  // PUT 요청 훅 - 동적 URL (useMemo로 최적화)
  const {
    execute: updatePost,
    data: updatedPost,
    error: updateError,
    isLoading: isUpdating,
    reset: resetUpdateState,
  } = usePut(postDetailUrl);

  // DELETE 요청 훅 - 동적 URL (useMemo로 최적화)
  const {
    execute: deletePost,
    data: deleteResult,
    error: deleteError,
    isLoading: isDeleting,
    reset: resetDeleteState,
  } = useDelete(postDetailUrl);

  // postId가 변경될 때 수정/삭제 관련 상태 초기화
  useEffect(() => {
    resetUpdateState();
    resetDeleteState();
  }, [postId, resetUpdateState, resetDeleteState]);

  // 포스트 생성 처리
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (!title.trim() || !content.trim()) {
        alert('제목과 내용을 모두 입력해주세요.');
        return;
      }

      // URL은 이미 훅에 전달되어 있으므로 데이터만 전달
      const result = await createPost(
        {
          title,
          body: content,
          userId: 1,
        },
        {
          revalidate: API_ENDPOINTS.POSTS.BASE, // 필요시 SWR 캐시 갱신
        }
      );

      console.log('생성된 포스트:', result);
      setPostId(result.id.toString()); // 생성된 ID 저장 (수정/삭제용)

      // 폼 초기화
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('포스트 생성 실패:', error);
    }
  };

  // 포스트 수정 처리
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!postId) {
      alert('수정할 포스트 ID를 입력하세요.');
      return;
    }

    if (!postDetailUrl) {
      console.error('유효하지 않은 포스트 URL입니다.');
      return;
    }

    try {
      // URL은 이미 훅에 전달되어 있으므로 데이터만 전달
      const result = await updatePost(
        {
          title,
          body: content,
          userId: 1,
        },
        {
          revalidate: [API_ENDPOINTS.POSTS.BASE, postDetailUrl], // 목록과 상세 모두 갱신
        }
      );

      console.log('수정된 포스트:', result);
    } catch (error) {
      console.error('포스트 수정 실패:', error);
    }
  };

  // 포스트 삭제 처리
  const handleDelete = async () => {
    if (!postId) {
      alert('삭제할 포스트 ID를 입력하세요.');
      return;
    }

    if (!postDetailUrl) {
      console.error('유효하지 않은 포스트 URL입니다.');
      return;
    }

    try {
      // URL은 이미 훅에 전달되어 있으므로 옵션만 전달
      const result = await deletePost({
        revalidate: API_ENDPOINTS.POSTS.BASE, // 목록 갱신
      });

      console.log('삭제 결과:', result);
      alert(`포스트 ${postId}가 삭제되었습니다.`);

      // 상태 초기화
      setPostId('');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('포스트 삭제 실패:', error);
    }
  };

  return (
    <Container>
      <Header>
        <h1>API 훅 사용 예시 (개선된 URL 관리)</h1>
        <p>usePost, usePut, useDelete 훅을 사용한 API 요청 예시입니다.</p>
      </Header>

      <Section>
        <h2>포스트 생성 (POST)</h2>
        <Form onSubmit={handleCreate}>
          <FormField>
            <Label htmlFor="create-title">제목</Label>
            <Input
              id="create-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="포스트 제목"
              required
            />
          </FormField>

          <FormField>
            <Label htmlFor="create-content">내용</Label>
            <TextArea
              id="create-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="포스트 내용"
              required
            />
          </FormField>

          <Button type="submit" disabled={isCreating}>
            {isCreating ? '생성 중...' : '포스트 생성'}
          </Button>

          {isCreating && <StatusText>요청 중...</StatusText>}
          {createError && <ErrorText>오류: {createError.message}</ErrorText>}
          {createdPost && (
            <SuccessText>
              포스트가 생성되었습니다! ID: {createdPost.id}
            </SuccessText>
          )}
        </Form>
      </Section>

      <Section>
        <h2>포스트 수정/삭제 (PUT/DELETE)</h2>
        <Form onSubmit={handleUpdate}>
          <FormField>
            <Label htmlFor="post-id">포스트 ID</Label>
            <Input
              id="post-id"
              value={postId}
              onChange={(e) => setPostId(e.target.value)}
              placeholder="수정/삭제할 포스트 ID"
              required
            />
          </FormField>

          <FormField>
            <Label htmlFor="update-title">새 제목</Label>
            <Input
              id="update-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="새 제목"
            />
          </FormField>

          <FormField>
            <Label htmlFor="update-content">새 내용</Label>
            <TextArea
              id="update-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="새 내용"
            />
          </FormField>

          <ButtonGroup>
            <Button
              type="submit"
              disabled={isUpdating || !postId || !postDetailUrl}
            >
              {isUpdating ? '수정 중...' : '포스트 수정'}
            </Button>
            <DeleteButton
              type="button"
              onClick={handleDelete}
              disabled={isDeleting || !postId || !postDetailUrl}
            >
              {isDeleting ? '삭제 중...' : '포스트 삭제'}
            </DeleteButton>
          </ButtonGroup>

          {(isUpdating || isDeleting) && <StatusText>요청 중...</StatusText>}
          {updateError && (
            <ErrorText>수정 오류: {updateError.message}</ErrorText>
          )}
          {deleteError && (
            <ErrorText>삭제 오류: {deleteError.message}</ErrorText>
          )}
          {updatedPost && (
            <SuccessText>포스트가 성공적으로 수정되었습니다!</SuccessText>
          )}
          {deleteResult && (
            <SuccessText>포스트가 성공적으로 삭제되었습니다!</SuccessText>
          )}
        </Form>
      </Section>
    </Container>
  );
}

// 스타일 컴포넌트
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Pretendard', sans-serif;
`;

const Header = styled.header`
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: ${theme.colors.gray700};
    font-size: 1.2rem;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid ${theme.colors.gray200};
    padding-bottom: 0.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${theme.colors.gray300};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${theme.colors.gray300};
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: ${theme.colors.primary};
  color: white;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.primary};
  }

  &:disabled {
    background-color: ${theme.colors.gray300};
    cursor: not-allowed;
  }
`;

const DeleteButton = styled(Button)`
  background-color: ${theme.colors.error};

  &:hover:not(:disabled) {
    background-color: #d32f2f;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const StatusText = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.gray700};
`;

const ErrorText = styled.div`
  color: ${theme.colors.error};
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SuccessText = styled.div`
  color: ${theme.colors.success};
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const CodeBlock = styled.pre`
  background-color: ${theme.colors.gray100};
  padding: 1.5rem;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre-wrap;
`;
