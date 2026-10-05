USE smartplacify;

INSERT INTO users (name, email, password_hash, role) VALUES
('Naveen Kumar', 'student@test.com', 'dev:password123', 'student'),
('Acme Talent Team', 'company@test.com', 'dev:password123', 'company'),
('Dr. Anjali Sharma', 'admin@test.com', 'dev:password123', 'tpo');

INSERT INTO companies (user_id, name, email, phone, website, industry, location, description, verified) VALUES
(2, 'Google', 'campus@google.com', '+91-9000000001', 'https://google.com', 'Technology', 'Bengaluru', 'Cloud, AI and software engineering roles.', TRUE),
(NULL, 'Microsoft', 'campus@microsoft.com', '+91-9000000002', 'https://microsoft.com', 'Technology', 'Hyderabad', 'Product engineering and cloud platforms.', TRUE),
(NULL, 'TCS', 'talent@tcs.com', '+91-9000000003', 'https://tcs.com', 'IT Services', 'Pune', 'Graduate engineering trainee hiring.', TRUE),
(NULL, 'Infosys', 'freshers@infosys.com', '+91-9000000004', 'https://infosys.com', 'IT Services', 'Mysuru', 'System engineer campus hiring.', TRUE),
(NULL, 'Zoho', 'jobs@zohocorp.com', '+91-9000000005', 'https://zoho.com', 'SaaS', 'Chennai', 'SaaS product development roles.', TRUE);

INSERT INTO students (user_id, full_name, email, phone, date_of_birth, gender, college, course, branch, graduation_year, cgpa, percentage, backlogs, certifications, projects, experience_years, placement_status) VALUES
(1, 'Naveen Kumar', 'student@test.com', '+91-9876543210', '2004-02-12', 'Male', 'Gurugram University', 'B.Tech', 'CSE', 2027, 8.20, 82.00, 0, 'AWS Cloud Practitioner', 'Placement portal, Resume analyzer', 0.5, 'NOT_PLACED'),
(NULL, 'Priya Sharma', 'priya@test.com', '+91-9876543201', '2004-04-20', 'Female', 'Gurugram University', 'B.Tech', 'IT', 2027, 8.60, 86.00, 0, 'Azure Fundamentals', 'Job matcher', 0.3, 'NOT_PLACED'),
(NULL, 'Rahul Verma', 'rahul@test.com', '+91-9876543202', '2003-11-08', 'Male', 'Gurugram University', 'B.Tech', 'CSE', 2026, 7.80, 78.00, 1, 'React Developer', 'ATS checker', 0.8, 'PLACED'),
(NULL, 'Sneha Gupta', 'sneha@test.com', '+91-9876543203', '2004-09-16', 'Female', 'Gurugram University', 'B.Tech', 'ECE', 2027, 7.40, 74.00, 0, 'SQL Associate', 'Analytics dashboard', 0.2, 'NOT_PLACED'),
(NULL, 'Aman Yadav', 'aman@test.com', '+91-9876543204', '2004-05-11', 'Male', 'Gurugram University', 'B.Tech', 'CSE', 2027, 9.10, 91.00, 0, 'Python', 'AI chatbot', 1.0, 'NOT_PLACED'),
(NULL, 'Isha Mehta', 'isha@test.com', '+91-9876543205', '2003-07-10', 'Female', 'Gurugram University', 'B.Tech', 'IT', 2026, 8.00, 80.00, 0, 'Node.js', 'Student CRM', 0.7, 'PLACED');

INSERT INTO skills (name) VALUES
('React'), ('Node.js'), ('MySQL'), ('Python'), ('Java'), ('SQL'), ('AWS'), ('Docker'), ('Communication'), ('Data Structures'), ('Express'), ('MongoDB')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO student_skills (student_id, skill_id)
SELECT s.id, k.id FROM students s JOIN skills k ON
(s.full_name = 'Naveen Kumar' AND k.name IN ('React', 'Node.js', 'Python', 'MySQL', 'SQL')) OR
(s.full_name = 'Priya Sharma' AND k.name IN ('React', 'Node.js', 'AWS', 'Communication')) OR
(s.full_name = 'Rahul Verma' AND k.name IN ('Java', 'SQL', 'Data Structures', 'Communication')) OR
(s.full_name = 'Sneha Gupta' AND k.name IN ('SQL', 'Python', 'Communication')) OR
(s.full_name = 'Aman Yadav' AND k.name IN ('React', 'Node.js', 'Python', 'Docker', 'Data Structures')) OR
(s.full_name = 'Isha Mehta' AND k.name IN ('Node.js', 'Express', 'MySQL', 'React'));

INSERT INTO jobs (company_id, title, description, location, job_type, salary_package, experience_required, minimum_cgpa, maximum_backlogs, eligible_branches, graduation_year, application_deadline, openings, status) VALUES
(1, 'SDE Intern', 'Build scalable product features with React and Node.js.', 'Bengaluru', 'Internship', '12 LPA', 0, 7.5, 1, 'CSE,IT', 2027, '2026-10-20', 12, 'ACTIVE'),
(2, 'Cloud Engineer Intern', 'Work on cloud automation, APIs and developer tooling.', 'Hyderabad', 'Internship', '10 LPA', 0, 7.0, 1, 'CSE,IT,ECE', 2027, '2026-10-25', 8, 'ACTIVE'),
(3, 'Trainee Engineer', 'Graduate trainee role for software delivery.', 'Pune', 'Full-time', '4.5 LPA', 0, 6.0, 2, 'CSE,IT,ECE,EEE', 2027, '2026-10-18', 80, 'ACTIVE'),
(4, 'System Engineer', 'Enterprise application development and support.', 'Mysuru', 'Full-time', '5 LPA', 0, 6.5, 1, 'CSE,IT,ECE', 2027, '2026-10-28', 45, 'ACTIVE'),
(5, 'Product Developer', 'Build SaaS products with strong problem solving.', 'Chennai', 'Full-time', '8 LPA', 0, 7.0, 0, 'CSE,IT', 2027, '2026-11-05', 10, 'ACTIVE');

INSERT INTO job_skills (job_id, skill_id)
SELECT j.id, k.id FROM jobs j JOIN skills k ON
(j.title = 'SDE Intern' AND k.name IN ('React', 'Node.js', 'MySQL')) OR
(j.title = 'Cloud Engineer Intern' AND k.name IN ('Python', 'AWS', 'Docker')) OR
(j.title = 'Trainee Engineer' AND k.name IN ('Java', 'SQL', 'Communication')) OR
(j.title = 'System Engineer' AND k.name IN ('SQL', 'Python', 'Communication')) OR
(j.title = 'Product Developer' AND k.name IN ('React', 'Node.js', 'Data Structures'));

INSERT INTO applications (student_id, job_id, company_id, status, eligibility_score, eligibility_snapshot) VALUES
(1, 1, 1, 'APPLIED', 83.33, JSON_OBJECT('eligible', true, 'matchedSkills', JSON_ARRAY('React', 'Node.js', 'MySQL'))),
(3, 3, 3, 'SELECTED', 88.00, JSON_OBJECT('eligible', true)),
(2, 2, 2, 'SHORTLISTED', 75.00, JSON_OBJECT('eligible', true)),
(5, 1, 1, 'INTERVIEW_SCHEDULED', 70.00, JSON_OBJECT('eligible', true));

INSERT INTO interviews (application_id, student_id, company_id, job_id, interview_date, interview_time, mode, location_or_link, round_name, notes, status) VALUES
(4, 5, 1, 1, '2026-10-13', '11:30:00', 'Online', 'https://meet.example.com/google-sde', 'Technical Round', 'DSA and React discussion', 'SCHEDULED'),
(3, 2, 2, 2, '2026-10-12', '14:00:00', 'Online', 'https://teams.example.com/cloud', 'Manager Round', 'Cloud basics', 'SCHEDULED');

INSERT INTO notifications (user_id, title, message, is_read) VALUES
(1, 'Application submitted', 'Your Google SDE Intern application was submitted successfully.', FALSE),
(1, 'Interview scheduled', 'Your upcoming interview details are available.', FALSE),
(2, 'New application', 'A student applied to your job.', FALSE);

INSERT INTO placement_results (application_id, student_id, job_id, company_id, result, package_offered) VALUES
(2, 3, 3, 3, 'SELECTED', '4.5 LPA');
