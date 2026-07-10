# Smart Attendance Management System (SAMS)

A web-based attendance management platform that replaces manual sign-in sheets with secure, location-verified digital attendance. Lecturers generate a time-limited OTP for each session; students submit the OTP along with their GPS location, which is verified against the lecturer's location before attendance is recorded.

Built as part of a DevOps-focused software engineering module, demonstrating Agile development, containerization, and CI/CD practices.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running with Docker](#running-with-docker)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Branching & Contribution Workflow](#branching--contribution-workflow)
- [Commit Convention](#commit-convention)
- [Versioning](#versioning)
- [Documentation](#documentation)
- [Contributors](#contributors)
- [License](#license)

---

## Features

**Admin**
- Manage users, subjects, and system-wide configuration
- View attendance analytics across sessions and courses

**Lecturer**
- Create attendance sessions with a time-limited OTP
- Monitor attendance submissions in real time
- Export attendance reports

**Student**
- View active sessions and submit attendance using the session OTP
- Location verified automatically via the Haversine distance formula
- View personal attendance history and percentage

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, Tailwind CSS |
| Backend | Node.js, Express |
| Database | PostgreSQL (Supabase) |
| Auth | JWT-based authentication |
| Containerization | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| Deployment | Vercel (frontend), Render (backend) |

---

## Project Structure

```
sams-attendance-system/
├── sams-frontend/                 # Next.js application
│   ├── app/
│   │   ├── auth/                  # Login, registration
│   │   ├── student/               # Student dashboard, attendance, history
│   │   ├── lecturer/              # Session creation, live monitoring
│   │   └── admin/                 # User, subject, and analytics management
│   ├── components/                # Shared and role-specific UI components
│   ├── lib/                       # API client, shared utilities
│   ├── hooks/                     # Custom React hooks
│   └── Dockerfile
│
├── sams-backend/                  # Express application
│   ├── src/
│   │   ├── routes/                # auth, sessions, attendance, admin
│   │   ├── controllers/           # Request handling — parses input, calls services, sends response
│   │   ├── services/              # Core business logic, database queries
│   │   ├── middleware/            # Authentication and role-based access control
│   │   ├── utils/                 # OTP generation, distance calculation, CSV export
│   │   └── config/                # Database and environment configuration
│   └── Dockerfile
│
├── docker-compose.yml
├── .github/workflows/             # CI/CD pipeline definitions
├── docs/                          # Project charter, SRS, SDD, test plan
└── README.md
```

---

### Backend Layering

The backend follows a routes → controllers → services pattern:

- **routes/** define the API endpoints and map them to controllers
- **controllers/** handle HTTP request/response — validate input, call the relevant service, return a response
- **services/** contain the actual business logic and database interaction (e.g. creating a session, verifying an OTP, calculating attendance)
- **utils/** hold pure, reusable helper functions with no database or request dependency

---

## Getting Started

### Prerequisites

- Node.js v18+
- Docker and Docker Compose
- A Supabase project (or PostgreSQL instance)

### Installation

```bash
git clone https://github.com/<org>/sams-attendance-system.git
cd sams-attendance-system
```

Install dependencies for each service:

```bash
cd sams-frontend && npm install
cd ../sams-backend && npm install
```

---

## Environment Variables

Each service includes a `.env.example` file. Copy it and provide your own values before running locally:

```bash
cp sams-backend/.env.example sams-backend/.env
cp sams-frontend/.env.example sams-frontend/.env.local
```

`.env` files are excluded from version control via `.gitignore`.

---

## Running with Docker

```bash
docker-compose up --build
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

---

## Testing

```bash
# Backend
cd sams-backend && npm test

# Frontend
cd sams-frontend && npm test
```

---

## CI/CD Pipeline

GitHub Actions workflows in `.github/workflows/` handle:

- **Continuous Integration (CI):** Triggers on all Pull Requests to `develop` and `main`. Installs dependencies, runs linting, and executes test suites.
- **Continuous Deployment (CD) - Staging:** Automatically builds and deploys to a staging environment upon merge to the `develop` branch.
- **Continuous Deployment (CD) - Production:** Automatically builds and deploys to production upon merge to the `main` branch.

---

## Branching & Contribution Workflow

We use a standard **GitFlow** approach to isolate in-progress work from stable production code.

```
main (Production environment)
 └── develop (Staging/Integration environment)
      ├── feature/<description> (e.g., feature/student-login)
      ├── fix/<description>     (e.g., fix/otp-validation)
      └── docs/<description>
```

1. **Never commit directly to `main` or `develop`.**
2. Branch off `develop` for all new features or bug fixes.
3. Once your work is complete, open a Pull Request (PR) against the `develop` branch.
4. CI checks will run automatically. Wait for them to pass.
5. At least one team member must review and approve the PR.
6. Merge using **Squash and Merge** to keep the history clean.
7. Periodically, `develop` is merged into `main` to trigger a production release.

---

## Commit Convention

Commits follow the [Conventional Commits](https://www.conventionalcommits.org/) style:

```
type: short description
```

| Type | Purpose |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `style` | Formatting or UI changes with no logic impact |
| `refactor` | Code restructuring with no behavior change |
| `test` | Adding or updating tests |
| `docs` | Documentation changes |
| `devops` | Docker, CI/CD, or deployment configuration |
| `chore` | Dependency or config updates |

Example: `feat: add OTP verification for student attendance`

---

## Versioning

We use [Semantic Versioning](https://semver.org/) (MAJOR.MINOR.PATCH) for releases.

- **MAJOR**: Incompatible API changes or major overhauls.
- **MINOR**: Adding functionality in a backwards-compatible manner.
- **PATCH**: Backwards-compatible bug fixes.

Stable milestones are tagged accordingly:

```bash
git tag -a v1.0.0 -m "Initial stable release"
git push origin v1.0.0
```

---

## Documentation

Detailed project documentation is available in the [`docs/`](./docs) folder, including the project charter, software requirements specification, software design document, and test plan.

---

