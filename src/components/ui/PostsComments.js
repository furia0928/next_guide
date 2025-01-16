export const PostsComments = ({ postsComments }) => {
  return (
    <ul style={{ borderTop: '1px solid #ccc', marginTop: 100 }}>
      {postsComments.map((comment) => (
        <li key={comment.id} style={{ borderBottom: '1px solid #ccc' }}>
          {comment.body}
          <br />
          <span style={{ color: 'red' }}>{comment.name}</span>
          <span style={{ color: 'blue' }}>{comment.email}</span>
          <br />
        </li>
      ))}
    </ul>
  );
};
