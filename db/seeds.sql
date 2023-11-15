INSERT INTO users (username, email, password) VALUES
('User 1', 'user1@example.com', 'hashed_password1'),
('User 2', 'user2@example.com', 'hashed_password2'),
('User 3', 'user3@example.com', 'hashed_password3');

INSERT INTO posts (title, content, user_id) VALUES
('First Post', 'First post comment', 1),
('Second Post', 'Second post comment', 2),
('Third Post', 'Third post comment', 3);

INSERT INTO comments (content, user_id, post_id) VALUES
('First post comment', 2, 1),
('Second post comment', 1, 2),
('Third post comment', 3, 1);
