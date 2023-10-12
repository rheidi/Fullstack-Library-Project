# Fullstack Project - Library

![Emoji](https://img.shields.io/badge/IN_PROGRESS-YES-red)

## Introduction

This project is a library management system for book borrowing for every home library. It is a full-stack application made as an assignment for Integrify. The project uses React on front end and .NET EF Core on back end with PostgreSQL database. Architecture in the back end follows clean architecture principles.

This image has inspired me when I chose colors for the front end.
![color palette image](color-palette-2595.png)

## Table of Content

- [Technologies and languages](#technologies-and-languages)
- [Features](#features)
- [Project Structure](#project-strucutre)
- [Getting Started](#getting-started)
- [Missing Functionalities](#missing-functionalities)
- [Known Bugs](#known-bugs)

## Technologies and Languages

- Frontend: TypeScript, React, Redux Toolkit, SASS

- Backend: C#, ASP .NET Core, Entity Framework Core

- Database: PostgreSQL

## Features

Books and single book information as well as list of all authors and single author info can be viewed by anyone. If user wants to borrow books, user has to register first. Borrowing a book is done by adding the book in to a cart first, and then cart can be viewed, and then deside what books to borrow. User can also view users own loans, both currently loaned and returned. If registered user has administrator rights, new book or author can be added to the system. Admin can also edit books and authors. Administrator can view all users and loans. Because I considered this to be an application for to keep track of to whom I loan my own books and for other home libraries, only admin can return books.

There is a ready-made admin account for testing purposes (the token expires in 10 minutes after logging in). Email: admin@mail.com, password: admin123.

## Project Structure

```
.
├── backend
│ ├── Controller
│ │ └── src
│ │  └── Controllers
│ ├── Domain
│ │ └── src
│ │  ├── Abstractions
│ │  ├── Entities
│ │  └── Shared
│ ├── Infrastructure
│ │ ├── Migrations
│ │ ├── Properties
│ │ └── src
│ │  ├── AuthorizationRequirements
│ │  ├── Configurations
│ │  ├── Database
│ │  ├── Repoimplementations
│ │  └── Program.cs
│ └── Service
│ └── src
│  ├── Abstractions
│  ├── Dtos
│  ├── Implementations
│  └── Shared
└── frontend
├── public
├── scr
│ ├── components
│ ├── hooks
│ ├── pages
│ ├── redux
│ │ ├── actions
│ │ └── reducers
│ ├── styles
│ ├── tests
│ ├── types
│ └── utils
├── App.tsx
├── config.ts
└── index.txt
```

## Getting Started

### Cloning from GitHub

Clone the repository from GitHub with `git clone` Then `npm install` for the node module packages in /frontend and lastly `npm start` and go to your http://localhost:3000 to see the website. In /backend install necessary packages with `dotnet restore`, and start back end server with `dotnet run`. Requires a postgreSQL database with a connection string in appsettings.json in Infrastructure layer.

### Deployment

The back end of this project has been deployed in
[azure cloud services](https://home-library-management-application.azurewebsites.net)

and the routes can be viewed and tested in
[swagger](https://home-library-management-application.azurewebsites.net/swagger/index.html)

The front end has been deployed in [vercel](https://fullstack-library-project.vercel.app/)

It is really slow to start, maybe due to the back end residing in low priority tier computing because it is a free service. It might take up to 20-30 seconds to start, but then it should operate normally.

There is one user with admin rights created already, with email admin@mail.com and password admin123.

## Missing Functionalities

- Library needs an inventory.
- Books could have multiple authors.
- Deleting books or authors is not done in the front end yet.
- Addind reviews would be nice.
- Loans should have return date

## Known Bugs

- User can still borrow same book multiple times
- There is no indicator if book is added to a cart or not
- If User has loans, and user removes own cart, loans just evaporate
