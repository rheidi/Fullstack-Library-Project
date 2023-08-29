# Fullstack Project - Library
![Emoji](https://img.shields.io/badge/IN_PROGRESS-YES-red)

## Introduction

This work is a full-stack application made as an assignment for Integrify. This project uses react on front end and .NET EF Core on back end with PostgreSQL database. Architecture in the back end follows clean architecture principles. The project is a library management system for book borrowing for every home library.

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

Books and single book information as well as list of all authors can be viewed by anyone. If user wants to borrow books, user has to register first. User can also view users own loans, and return books. If registered user has administrator rights, new book or author can be added to the system. Admin can also edit books and authors. Administrator can view all users and loans. Because I considered this to be an application for to keep track of to whom I loan my own books and for other homelibraries, only admin can return books.

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

Clone  the  repository from GitHub with `git clone` Then `npm install` for the node module packages in /frontend and lastly `npm start` and go to your http://localhost:3000 to see the website. In /backend install necessary packages with `dotnet restore`, and start back end server with `dotnet run`. 

### Deployment

This project has been deployed in ???

## Missing Functionalities

Library needs an inventory.
Books could have multiple authors.
User should be able to unregister.
Addind reviews would be nice.

## Known Bugs

Search from genre doesn't work.
