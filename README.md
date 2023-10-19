# Assignment-9 full stack

# Build a Home Tutor website backend

### Live Link: https://home-tutor-backend.vercel.app/

### Live Website: https://home-tutor-frontend.vercel.app/

### Application Routes:

#### User

- api/v1/users/create-user (POST)
- api/v1/users/login(POST)
- api/v1/users (GET) (only for supper admin and admin)
- api/v1/users/a342ee2f-f1ac-4915-96be-77c0de770b84 (PATCH) (only for admin)
- api/v1/users/a342ee2f-f1ac-4915-96be-77c0de770b84 (DELETE) (only for admin)
- api/v1/profile (GET)
- api/v1/profile (PATCH)

### Tutors

- api/v1/tutors/create-tutors (POST) (only for admin and uper admin)
- api/v1/tutors (GET)
- api/v1/tutors/53ba68ac-07f2-4283-aed9-8f67eb9e958c (Single GET)

### Bookings

- api/v1/bookings/create-booking (POST)
- api/v1/bookings (GET)
- api/v1/books/3275c768-97ae-48f0-b487-a5097cd651bc (DELETE)

### Reviews

- api/v1/reviews/create-review (POST)
- api/v1/reviews (GET)
