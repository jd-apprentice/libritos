CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (id name profile_picture created_at) VALUES
    (1, 'Jonathan', 'https://cdn.discordapp.com/avatars/594392412475097090/38c46fa6548b5fb7ad5af3167b2f3059.png?size=1024'),