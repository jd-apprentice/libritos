CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
);

INSERT INTO books (id, name, url, description) VALUES
    (1, 'The Linux Command Line', 'https://openlab.citytech.cuny.edu/emt2390l/files/2020/03/The-Linux-Command-Line-Book-5th-Edition.pdf', 'Second internet edition'),
    (2, 'Introduction to Linux', 'https://tldp.org/LDP/intro-linux/intro-linux.pdf', 'Learn how to use Linux'),
    (3, 'Linux From Scratch', 'https://linuxfromscratch.org/lfs/downloads/10.0/LFS-BOOK-10.0.pdf', 'Systemd version');
