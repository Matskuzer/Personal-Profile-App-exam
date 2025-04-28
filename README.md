# Personal Profile Application

## Description
A simple web application to display personal student information and manage a list of courses with grades.

Built with React (frontend) and Node.js (backend). Supports full CRUD operations using a REST API.

## Running the Application Locally

1. Clone the repository:

```bash
git clone <your-repo-link>
cd personal-profile-app
```

2. Install and run the backend:

```bash
cd backend
npm install
npm start
```

Backend will run on http://localhost:5000.

3. Install and run the frontend:

```bash
cd frontend
npm install
npm start
```

Frontend will run on http://localhost:3000.

## Running the Application on Debian VM

1. SSH into your VM.
2. Ensure Node.js and npm are installed:

```bash
node -v
npm -v
```

If not installed:

```bash
sudo apt update
sudo apt install nodejs npm
```

3. Clone your repository:

```bash
git clone <your-repo-link>
```

4. Install and run backend:

```bash
cd backend
npm install
npm start
```

5. Install and build frontend:

```bash
cd frontend
npm install
npm run build
npm install -g serve
serve -s build
```

6. Access the app via the VM's IP address in your browser.

## Screenshots

- Courses list visible
- Adding a new course
- Editing a course
- Deleting a course
- Running on Debian VM