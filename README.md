# NPCI AI Course

A full-stack application for an AI course platform, featuring a React frontend and FastAPI backend.

## Project Overview

This project provides a platform for AI course delivery, combining modern web technologies with a robust backend system. It's designed to offer an interactive learning experience for AI education.

## Tech Stack

### Frontend
- React 18 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Vite as the build tool and development server

### Backend
- FastAPI framework
- SQLAlchemy ORM with PostgreSQL
- Pydantic for data validation
- Alembic for database migrations
- Redis for caching
- Authentication with JWT (python-jose)

## Project Structure

```
ai-course/
├── backend/                # FastAPI backend
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Core configurations
│   │   ├── db/             # Database models and connections
│   │   ├── models/         # Data models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── services/       # Business logic
│   │   └── main.py         # Application entry point
│   └── requirements.txt    # Python dependencies
└── frontend/               # React frontend
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Page components
    │   ├── styles/         # CSS styles
    │   ├── App.tsx         # Main application component
    │   └── main.tsx        # Entry point
    ├── index.html          # HTML template
    └── package.json        # JavaScript dependencies
```

## Getting Started

### Prerequisites
- Python 3.10+
- PostgreSQL
- Redis
- Docker (for PostgreSQL and Redis containers)
- Docker Compose (optional, for easier container management)

### Docker Setup for PostgreSQL and Redis

#### Using Docker CLI

1. Create a Docker network for the application:
   ```bash
   docker network create ai-course-network
   ```

2. Start PostgreSQL container:
   ```bash
   docker run -d \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=postgres \
     -e POSTGRES_DB=gff \
     -p 5432:5432 \
     -v postgres_data:/var/lib/postgresql/data \
     postgres:15
   ```

3. Start Redis container:
   ```bash
   docker run -d \
     -p 6379:6379 \
     -v redis_data:/data \
     redis:7
   ```

#### Using Docker Compose

Create a `docker-compose.yml` file in the project root:

```yaml

```

Then run:
```bash
docker-compose up -d
```

### Environment Configuration

Update your `.env` file with the following database and Redis connection details:

```
# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=gff
POSTGRES_PORT=5432

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_URL=redis://localhost:6379/0
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=upiproductdevelopers@gmail.com
SMTP_PASSWORD=lzfqatcsodwenkbj
SMTP_FROM_EMAIL=upiproductdevelopers@gmail.com
CERTIFICATE_BG_PATH=
CORS_ORIGINS=["http://localhost:5173","http://127.0.0.1:5173","http://localhost:5173","http://localhost:5174"]
AES_ENCRYPTION_KEY="RsasTp@pintgration$2024 "
JWT_SECRET="1foAvUr5UsKVAjAHSWBV4V7nQtEeoA6NPw0krTX0UXl8di4U21VJpBIUibSMxAJmn96leMeYWwKrHfm2CYt2QA"
JWT_EXP_MINUTES=15
APP_NAME=AI Mini Course
```

If you're running the application inside Docker as well, use the service names instead of localhost:

```
POSTGRES_SERVER=ai-course-postgres
REDIS_HOST=ai-course-redis
```
### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd ai-course/backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file and configure your environment variables.

5. Run the development server:
   ```bash
   uvicorn app.main:app --reload
   ```
or 
    ```bash
    lsof -ti:8080 | xargs -r kill -9 && uvicorn app.main:app --reload --port 8080
    ```
### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ai-course/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
or 
   ```bash
   npm i --silent && npm run dev --silent
   ```
## Features

- User authentication and authorization
- Course content management
- Interactive learning materials
- Progress tracking
- Responsive design for desktop and mobile

## Development

### Backend Development

- API documentation is available at `/docs` or `/redoc` when the server is running


### Frontend Development

- Components follow a modular structure
- Tailwind CSS is used for styling
- TypeScript ensures type safety

## Deployment

### Backend Deployment

1. Set up a production-ready database
2. Configure environment variables for production
3. Deploy using Gunicorn or a similar WSGI server

### Frontend Deployment

1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Deploy the contents of the `dist` directory to your web server



