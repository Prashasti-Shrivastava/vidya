CREATE DATABASE vidya;
USE vidya;

-- 1. USERS TABLE
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. GROUPS TABLE (grp rather than group cuz group is a keyord in sql and ould have to be written as `group` each time)
CREATE TABLE grp (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. GROUP MEMBERS TABLE
CREATE TABLE group_members (
    user_id INT,
    grp_id INT,
    PRIMARY KEY (user_id, grp_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (grp_id) REFERENCES grp(id) ON DELETE CASCADE
);

-- 4. TASKS TABLE
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 5. TASK ASSIGNMENTS TABLE
CREATE TABLE task_assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT,
    grp_id INT,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (grp_id) REFERENCES grp(id) ON DELETE CASCADE
);
--created at in tasks table and assigned at in task assignmeents table are different cuz a task can be created and then assigned to a group later on. So the timestamps will be different

-- 6. STUDENT SUBMISSIONS TABLE
CREATE TABLE student_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT,
    student_id INT,
    status ENUM('pending', 'submitted') DEFAULT 'pending',
    submission_text TEXT NULL,
    submitted_at TIMESTAMP NULL DEFAULT NULL, 
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_task (student_id, task_id)
);
--until the task is pending submitted at is null

-- Run these ALTER commands on your existing database:

-- 1. Add max_score to tasks table (allowing decimal scores up to 999.99)
ALTER TABLE tasks 
ADD COLUMN max_score DECIMAL(5, 2) NOT NULL DEFAULT 100.00;

-- 2. Add score to student_submissions table (nullable by default since pending tasks don't have scores yet)
ALTER TABLE student_submissions 
ADD COLUMN score DECIMAL(5, 2) NULL DEFAULT NULL;