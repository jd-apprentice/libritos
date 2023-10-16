CREATE TABLE IF NOT EXISTS books (     
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description VARCHAR(255),
);

INSERT INTO books (id, name, url, description) VALUES
    (1, 'The Linux Command Life', 'https://files.jonathan.com.ar/Books/TLCL-13.07.pdf', 'Second internet edition'),
    (2, 'How Linux Works', 'https://files.jonathan.com.ar/Books/How-Linux-Works.pdf', 'What every superuser should know'),
    (3, 'Linux From Scratch', 'https://files.jonathan.com.ar/Books/LFS-11.3-SYSTEMD-BOOK.pdf', 'Systemd version');