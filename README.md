# To Be A Woman

A simple, elegant website celebrating femininity and womanhood.

🌐 **Live site:** [https://femininewoman.netlify.app/](https://femininewoman.netlify.app/)
📦 **GitHub Repository:** [https://github.com/KeruboNancy/To-Be-A-Woman.git](https://github.com/KeruboNancy/To-Be-A-Woman.git)

**To Be A Woman** is a web platform dedicated to empowering women through coaching sessions, testimonials, and community engagement. It provides a space for booking one-on-one or group sessions, sharing empowering testimonials, and participating in polls to express sentiments about femininity. This project fulfills two objectives: a complete MySQL database management system and a CRUD API using Node.js + Express.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Database Schema](#database-schema)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview
This repository hosts a full-stack application for managing coaching sessions and community feedback. It includes:
1. **Database Management System**: A MySQL database with tables for users, bookings, testimonials, poll options, and votes, featuring primary/foreign keys, constraints, and sample data.
2. **CRUD API**: A RESTful API built with Node.js + Express, enabling Create, Read, Update, and Delete operations on testimonials and votes, integrated with MySQL.

The project fosters a safe space for women to embrace their femininity and grow through coaching and community.

## Features
- **Session Booking**: Book one-on-one coaching, group workshops, or healing sessions.
- **Testimonials**: Share and view empowering user experiences.
- **Polls**: Participate in polls to express sentiments (e.g., "Softness & Grace").
- **Responsive Design**: Accessible on desktop and mobile.
- **Secure API**: CRUD operations with MySQL backend.

## Database Schema
The MySQL database includes five tables:
- **users**: User information (1-M with bookings, testimonials).
- **bookings**: Coaching session bookings.
- **testimonials**: User testimonials.
- **poll_options**: Poll options with vote counts.
- **votes**: User sentiment votes.

**Constraints**:
- Primary Keys (e.g., `user_id`, `booking_id`, `option_id`).
- Foreign Keys (e.g., `user_id` in `bookings` references `users`).
- NOT NULL (e.g., `name`, `email`, `message`).
- UNIQUE (e.g., `email`, `option_text`).
- ENUM (e.g., `vote_type` in `votes`).

**Entity-Relationship Diagram (ERD)**:

[users]  user_id (PK)  name  email (UNIQUE)   | 1   | M   |----[bookings]   |      booking_id (PK)   |      user_id (FK)   |      session_type   |      booking_date   |   | 1   | M   |----[testimonials]   |      testimonial_id (PK)   |      user_id (FK)   |      message   |      created_at[poll_options]  option_id (PK)  option_text  votes[votes]  id (PK)  vote_type (ENUM)  created_at

**Generating the Graphical ERD**:
To visualize the database schema, generate a graphical ERD using MySQL Workbench:
1. Install MySQL Workbench (available at [https://www.mysql.com/products/workbench/](https://www.mysql.com/products/workbench/)).
2. Open MySQL Workbench and connect to your MySQL server using your credentials (e.g., `your_username`, `your_password`).
3. Import the database schema:
   - Go to "File" > "Import" > "Reverse Engineer MySQL Create Script."
   - Select `database/schema.sql` from the project’s `database/` folder.
   - Follow the wizard to import the `femininity_platform` database.
4. Create the EER diagram:
   - Go to "Database" > "Reverse Engineer."
   - Select the `femininity_platform` database and proceed through the wizard.
   - Ensure all tables (`users`, `bookings`, `testimonials`, `poll_options`, `votes`) are included.
5. Arrange the diagram:
   - Drag tables to clarify relationships (e.g., show `users` connected to `bookings` and `testimonials` via `user_id` foreign keys).
   - Verify that 1-M relationships are displayed (lines with crow’s foot notation).
6. Export the diagram:
   - Go to "File" > "Export" > "Export as PNG."
   - Save as `docs/erd.png` in the project’s `docs/` folder (create the folder if it doesn’t exist).
7. Commit the ERD to the repository:
   - Add `docs/erd.png` to version control (`git add docs/erd.png`).
   - Commit and push to GitHub.

The graphical ERD is referenced as `docs/erd.png` in this README. You must generate and save this file manually, as it is not included in the repository by default.

## Installation
### Prerequisites
- Node.js (v16+)
- MySQL (v8+)
- Git
- Visual Studio Code (recommended for development)
- MySQL Workbench (for ERD generation)

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/KeruboNancy/To-Be-A-Woman.git
   cd To-Be-A-Woman


Install Dependencies:
npm install


## Set Up MySQL Database:

Create a database:CREATE DATABASE femininity_platform;


Import the schema and sample data:mysql -u your_username -p femininity_platform < database/schema.sql


The database/schema.sql file includes CREATE TABLE statements and sample data.


Configure Environment Variables:Create a .env file in the root:
DATABASE_URL=mysql://your_username:your_password@localhost:3306/femininity_platform
PORT=3000

Replace your_username and your_password with your MySQL credentials.

Run the Application:
npm start

The API runs at http://localhost:3000.


Usage

Book a Session: Use the API or frontend to schedule coaching sessions.
Share Testimonials: Submit or view testimonials via the API.
Participate in Polls: Vote on poll options to express sentiments.
Test API: Use Postman or cURL to interact with endpoints.

API Endpoints
The API supports CRUD operations for testimonials and partial CRUD for votes:

POST /api/votes: Create a vote (requires vote_type).
GET /api/votes: List all votes.
POST /api/testimonials: Create a testimonial (requires user_id, message).
GET /api/testimonials: List all testimonials.
PUT /api/testimonials/:id: Update a testimonial.
DELETE /api/testimonials/:id: Delete a testimonial.

Example:
curl -X POST http://localhost:3000/api/testimonials \
-H "Content-Type: application/json" \
-d '{"user_id":1,"message":"This platform helped me embrace my femininity with confidence."}'

Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a branch:git checkout -b feature/your-feature


Commit changes:git commit -m "Add your feature"


Push and submit a pull request.


# License
Licensed under the MIT License.
Contact

Maintainer: Nancy Kerubo
Email: nancykerry77@gmail.com
GitHub Issues: Open an issue for questions or suggestions.

Join us in creating a safe space for women to embrace their femininity!```
