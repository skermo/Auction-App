# Auction-App

<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/skermo/Auction-App">
    <img src="https://github.com/skermo/Auction-App/blob/main/frontend/src/resources/icons/appLogo.svg" alt="Logo" height="50">
  </a>
  <p align="center">
    <br />
    <strong>Project for my three month internship at 
      <a href = "https://www.atlantbh.com">Atlantbh</a>
    </strong>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#tech-stack">Tech Stack</a>
    </li>
    <li>
      <a href="#requirements">Requirements</a>
    </li>
    <li>
      <a href="#installation">Installation</a>
    </li>
    <li>
      <a href="#usage">Usage</a>
    </li>
    <li>
      <a href="#development-process-and-features">Development process and features</a>
    </li>
    <li>
      <a href="#testing-strategy">Testing strategy</a>
    </li>
    <li>
      <a href="#live-application">Live application</a>
    </li>
    <li>
      <a href="#contact">Contact</a>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Auction app is an web application that serves as an online marketplace. It enables users to sell and bid on, potentially buy, a wide range of products in real time.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TECH STACK -->

## Tech Stack

- **Spring Boot**
- **React.js**
- **PostgreSQL**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- REQUIREMENTS -->

## Requirements

- Java 17
- Node 18
- Postgres with database named `auctionapp`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- INSTALLATION -->

## Installation

### Backend

1. Navigate to the backend directory `cd auctionapp`
2. Setup necessary enviroment variables (`db_url`, `db_username`, `db_password`, `jwt_secret` (should be hashed), `stripe_secret_key`, `aws_access_key`, `aws_secret_key`)
3. Install Maven dependencies `./mvnw clean install`
4. Run the application `./mvnw spring-boot:run`

### Frontend

1. Navigate to the frontend directory `cd frontend`
2. Install npm packages `npm install`
4. Run the application `npm start`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE -->

## Usage

### Backend
Backend is started at `http://localhost:8080` and for testing purposes, Swagger is available at `http://localhost:8080/swagger-ui/index.html`.

### Frontend
Frontend is started at `http://localhost:3000`.

### Database
For easier setup of the database, a docker-compose file is added. 
Steps to start database with Docker:

1. Download Docker
2. Navigate to the backend directory `cd auctionapp`
3. Run `docker compose up`

NOTE: After starting the backend, all of the neccessary database migrations will automatically be executed and test data will be seeded.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FEATURES -->

## Development process and features

### First month

- Project skeleton & create Github repository
- Understand domain & create ERD
- Implement Navbar & Footer
- Initial version of Landing Page
- Product overview Page
- Shop page with basic search
- Add 'Did you mean?' feature to the search

### Second month

- Secure Login & Registration - backend
- Secure Login & Registration - frontend
- User Profile Page
- Bidding process
- Add new item as seller
- Enable payment method for the highest bidder

### Third month

- Implement sorting on Shop Page
- Recommended products section on Landing Page
- Make dates in app timezone agnostic (UTC)
- Implement notifications
- Enable adding products via CSV
- Add loader in places where client is waiting on the backend
- Deployment

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TESTING STRATEGY -->

## Testing Strategy

The project follows a layered testing approach to ensure quality, maintainability, and correctness of both frontend and backend components. The main testing types include:

- Unit Testing: Focused on individual functions, methods, and classes in isolation.
- Integration Testing: Ensured proper communication between modules, components, and services.
- Static Testing: Detected issues early through linting and code analysis without executing the code.
- Regression Testing: Performed after bug fixes to ensure no new issues were introduced.
- Test Coverage Analysis: Assessed which parts of the codebase are covered by automated tests.

 ### Frontend
 Tools used:
 - **Jest** and **React Testing Library** for unit and integration tests
 - **ESLint** for static code analysis
 - **@testing-library/jest-dom** for custom matchers

Running the tests:
- Run unit/integration tests with: `npm test`
- Run static analysis with `npx eslint . --ext .js,.jsx`
- Run test coverage report with `npm test -- --coverage --watchAll=false`

 ### Backend
 Tools used:
 - **JUnit 5**, **Mockito** and **MockMvc* for unit and integration tests
 - **PMD** for static code analysis
 - **JaCoCo** for test coverage report

Running the tests:
- Run unit/integration tests with: `./mvnw test`
- Run static analysis with `./mvnw pmd:check`
- Run test coverage report with `./mvnw test` after which the coverage report will be located at `target/site/jacoco/index.html`
 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LIVE APPLICATION -->

## Live application
The application can be accessed at https://auction-app-xppu.onrender.com. 

NOTE: Because free tiers were used when deploying the application, the first time you access the website, it might be a bit slow, but after the initial load, it should be okay.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Semra Kermo - kermosemra@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>
