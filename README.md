# Fullstack Project - Library
![Emoji](https://img.shields.io/badge/IN_PROGRESS-YES-red)

## Introduction

This work is a full-stack application made as an assignment for Integrify. This project uses react on front end and .NET EF Core on back end with PostgreSQL database. Architecture in the back end follows clean architecture principles. The project is a library management system for book borrowing.

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

## Project Structure
```
.
├── backend
│ ├── Controller
│ │ └── src
│ │ └── Controllers
│ ├── Domain
│ │ └── src
│ │ ├── Abstractions
│ │ ├── Entities
│ │ └── Shared
│ ├── Infrastructure
│ │ ├── Migrations
│ │ ├── Properties
│ │ └── src
│ │ ├── AuthorizationRequirements
│ │ ├── Configurations
│ │ ├── Database
│ │ ├── Repoimplementations
│ │ └── Program.cs
│ └── Service
│ └── src
│ ├── Abstractions
│ ├── Dtos
│ ├── Implementations
│ └── Shared
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

Library inventory.

## Known Bugs
