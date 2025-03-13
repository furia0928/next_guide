import { StyledPostsComments } from './PostsComments.styles';

export const PostsComments = ({ postsComments }) => {
  return (
    <StyledPostsComments>
      {postsComments.map((comment) => (
        <li key={comment.id}>
          <div className="comment-body">{comment.body}</div>
          <span className="comment-author">{comment.name}</span>
          <span className="comment-email">{comment.email}</span>
        </li>
      ))}
    </StyledPostsComments>
  );
};
