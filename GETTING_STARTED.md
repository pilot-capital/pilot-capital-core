# Getting Started: Pilot Capital Monorepo

This guide explains how to set up, run, and develop with both the Vite React TypeScript frontend and Django backend in your monorepo.

---

## Prerequisites

-   Node.js (latest LTS recommended)
-   pnpm (installed globally)
-   Python 3.10+
-   pip (Python package manager)

---

## 1. Install dependencies

### Backend (Django) — Using PostgreSQL

To use PostgreSQL as your database:

1. Install the PostgreSQL driver:
    ```powershell
    pip install psycopg2
    ```
2. Create a PostgreSQL database and user using `psql`:

    ```powershell
    # Open psql (replace 'postgres' with your admin username if needed)
    psql -U postgres

    # In the psql prompt, run:
    CREATE DATABASE pilotcapital;
    CREATE USER pilotuser WITH PASSWORD 'yourpassword';
    GRANT ALL PRIVILEGES ON DATABASE pilotcapital TO pilotuser;
    \q
    ```

3. Add your database credentials to a `.env` file in `apps/api` (see example below).
4. Update `PCCore/settings.py` to read from environment variables (see below).
5. Run migrations to set up tables:
    ```powershell
    python manage.py migrate
    ```

If you skip these steps, Django will use SQLite by default (no setup required for development).

#### Example .env file for Django (place in `apps/api/.env`):

```
DJANGO_DB_NAME=pilotcapital
DJANGO_DB_USER=pilotuser
DJANGO_DB_PASSWORD=yourpassword
DJANGO_DB_HOST=localhost
DJANGO_DB_PORT=5432
```

#### Example settings.py snippet to use .env variables:

```python
import os
from dotenv import load_dotenv
load_dotenv()

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DJANGO_DB_NAME'),
        'USER': os.getenv('DJANGO_DB_USER'),
        'PASSWORD': os.getenv('DJANGO_DB_PASSWORD'),
        'HOST': os.getenv('DJANGO_DB_HOST', 'localhost'),
        'PORT': os.getenv('DJANGO_DB_PORT', '5432'),
    }
}
```

You may need to install `python-dotenv`:

```powershell
pip install python-dotenv
```

### Frontend (React)

```powershell
cd apps\web
pnpm install
```

### Backend (Django)

```powershell
cd apps\api
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt  # If you have a requirements.txt
# Or, if not:
pip install django djangorestframework
```

---

## 2. Running the apps

### Start the React frontend

```powershell
cd apps\web
pnpm dev
```

-   The app will run at http://localhost:5173 (default Vite port)

### Start the Django backend

```powershell
cd apps\api
.\venv\Scripts\activate
python manage.py runserver
```

-   The backend will run at http://127.0.0.1:8000
-   Django admin is at http://127.0.0.1:8000/admin

---

## 3. Connecting frontend and backend

-   The React app can make API requests to the Django backend (e.g., http://127.0.0.1:8000/api/).
-   For local development, you may need to configure CORS in Django. Add `'corsheaders'` to `INSTALLED_APPS` and set allowed origins in `settings.py`.

---

## 4. Useful commands

### Create Django superuser (for admin login)

```powershell
cd apps\api
.\venv\Scripts\activate
python manage.py createsuperuser
```

### Install new npm packages (frontend)

```powershell
cd apps\web
pnpm add <package-name>
```

### Install new Python packages (backend)

```powershell
cd apps\api
.\venv\Scripts\activate
pip install <package-name>
```

---

## 5. Tips

-   Keep both servers running in separate terminal windows.
-   Use environment variables for secrets and config (see `.env` files).
-   For production, deploy frontend and backend separately or use Docker Compose.

---

## 6. Troubleshooting

-   If you see port conflicts, change the port in Vite config or Django settings.
-   If you get CORS errors, configure Django CORS settings.
-   For dependency issues, delete `node_modules` and run `pnpm install` again.

---

For more details, see the main `README.md`.
