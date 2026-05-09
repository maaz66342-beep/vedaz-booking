# VEDAZ Booking System

Full-stack appointment booking platform built with React and Django.

### Project Structure
- **backend/** - Django REST API. Handles authentication, bookings, admin APIs
- **client/** - React Admin Dashboard. Main working frontend for this project
- **frontend/** - Legacy/Experimental. Not used in current deployment

### Features
- User Registration & Authentication
- Real-time Slot Booking via Client Dashboard
- Admin Dashboard for Management
- Email Notifications

### Tech Stack
**Backend:** Django, Django REST Framework, SQLite
**Client:** React.js, Axios, Tailwind CSS

### Setup
1. Clone: `git clone https://github.com/maaz66342-beep/vedaz-booking.git`
2. Backend: `cd backend && pip install -r requirements.txt && python manage.py runserver`
3. Client: `cd client && npm install && npm start`

### Note
The `frontend/` directory is kept for reference only and is not part of the active application. All user-facing functionality is handled by the `client/` directory.
