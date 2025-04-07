# flask_app

Team32's Midterm project Project Goal (Recap) Deploy a secure Flask web app via HTTPS using: • Let's Encrypt (Nginx + Certbot) • MongoDB with starter data • Artifact integrity check (SHA-256 hash from Jenkins) • Ansible for deployment • Jenkins master (Amazon Linux), Agent (CentOS 9), App Server (Ubuntu 20.04) Team – Suggested Roles Member Role Key Focus

Yaro Infrastructure & Ansible Lead Jenkins setup, EC2, Nginx, Certbot, Integrity check Wole & MJ App & Database Deployment Specialist Flask/MongoDB setup, Jenkins pipeline, DB seeding

Project Plan 🔹 Phase 1: Setup Infrastructure (Yaro) • Provision EC2 Instances • Amazon Linux → Jenkins master • CentOS 8 → Jenkins agent • Ubuntu 20.04 → Target Flask app server • Configure Jenkins Master • Install Java & Jenkins on Amazon Linux • Install required Jenkins plugins (Ansible, SSH, Git, Pipeline) • Set up credentials & agents • Connect Jenkins Agent (CentOS 8) • Add agent node in Jenkins • Configure SSH key-based access • Install Ansible, Git, Python

🔹 Phase 2: Build the App (Wole) • Test Flask App Locally • Ensure app.py, init_db.js, and index.html (inside /templates) run correctly • Confirm MongoDB connection • Validate app returns:"Secure DevOps app deployed with verified artifact!" • Create MongoDB Ansible Role • MongoDB installed on target EC2 or via Docker • Insert starter records via init_db.js

🔹 Phase 3: Jenkins CI/CD Pipeline (Both) • Write Jenkinsfile • Clone repo • Archive Flask app files (e.g., app.py, init_db.js, templates/) • Generate hash.txt with SHA-256 hashes of all artifacts • Configure Jenkins Job • Use Jenkinsfile to automate build + artifact creation • Store artifacts and hash.txt

🔹 Phase 4: Ansible Deployment (Yaro) • Develop Ansible Playbook • Role 1: Install and configure Nginx + Certbot on Ubuntu 20.04 • Role 2: Set up MongoDB + seed data (if not Dockerized earlier) • Role 3: Deploy Flask App • Unarchive artifacts • Verify hash against hash.txt • Start the app (via Gunicorn or similar) • Implement Artifact Integrity Check • Use sha256sum to verify hashes before deploy • Abort play if hash fails

🔹 Phase 5: HTTPS Configuration & Test (Both) • Certbot + HTTPS • Use Ansible role to install Certbot • Configure Nginx with SSL (port 443) • Set up automatic renewal if needed • Test Deployment • Confirm: • HTTPS is active on port 443 • App displays success message • MongoDB is seeded • Integrity check passed before deploy !
