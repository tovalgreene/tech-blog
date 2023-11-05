INSERT INTO users (username, email, password) VALUES
('JaneDoe', 'jane.doe@example.com', 'hashed_password1'),
('JohnSmith', 'john.smith@example.com', 'hashed_password2'),
('AliceJohnson', 'alice.johnson@example.com', 'hashed_password3');

INSERT INTO posts (title, content, user_id) VALUES
('First Post', 'This is the content of the first post', 1),
('Second Post', 'This is the content of the second post', 2),
('Third Post', 'This is the content of the third post', 3);

INSERT INTO comments (content, user_id, post_id) VALUES
('This is a comment on the first post', 2, 1),
('This is a comment on the second post', 1, 2),
('This is another comment on the first post', 3, 1);
