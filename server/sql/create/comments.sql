CREATE TABLE IF NOT EXISTS comments (
    coment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    id_replies INT,
    replies INT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);