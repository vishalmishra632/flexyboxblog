# FlexBox Blog - Full Stack Blogging Platform

A comprehensive blogging platform built using .NET Core 8 and Angular 18, demonstrating clean architecture, modern development practices, and responsive design.

## Architecture Overview

### Backend Architecture (.NET Core)

The backend follows Clean Architecture principles with three distinct layers:

1. **Core Layer (BlogAPI.Core)**
   - Domain entities and business models
   - Interface definitions for repositories and services
   - DTOs (Data Transfer Objects) for data transfer
   - Core business logic and validation rules

2. **Infrastructure Layer (BlogAPI.Infrastructure)**
   - Entity Framework Core implementations
   - Repository pattern implementations
   - Database context and configurations
   - Service implementations
   - Data access patterns and database migrations

3. **API Layer (BlogAPI.API)**
   - REST API controllers with versioning
   - Swagger documentation integration
   - Global error handling
   - Cross-cutting concerns (logging, validation)
   - API response wrappers for consistent responses

### Frontend Architecture (Angular)

The frontend implements a modular architecture focusing on component reusability:

1. **Core Module**
   ```
   /core
   ├── models/
   │   └── blog-post.model.ts
   ├── services/
   │   └── blog.service.ts
   └── interceptors/
       └── error.interceptor.ts
   ```

2. **Feature Modules**
   ```
   /features
   └── blog/
       ├── components/
       │   ├── blog-list/
       │   ├── blog-form/
       │   └── blog-detail/
       └── blog.module.ts
   ```

3. **Shared Module**
   ```
   /shared
   ├── components/
   │   └── loading-spinner/
   |   └── notification/
   └── pipes/
       └── format-date.pipe.ts
   ```

## Key Features and Implementation Details

### Backend Features

1. **Clean Architecture Implementation**
   - Clear separation of concerns
   - Domain-driven design principles
   - Dependency injection
   - Repository pattern

2. **Database Design**
   ```sql
   CREATE TABLE BlogPosts (
       Id INT IDENTITY(1,1) PRIMARY KEY,
       Title NVARCHAR(200) NOT NULL,
       Content NVARCHAR(MAX) NOT NULL,
       CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
       LastModifiedDate DATETIME2 NULL
   )
   ```

3. **API Endpoints**
   ```
   GET    /api/v1/blogposts     - Get all posts
   GET    /api/v1/blogposts/{id} - Get single post
   POST   /api/v1/blogposts     - Create post
   PUT    /api/v1/blogposts/{id} - Update post
   DELETE /api/v1/blogposts/{id} - Delete post
   ```

### Frontend Features

1. **Component Architecture**
   - Smart and presentational component pattern
   - Lazy-loaded feature modules
   - Shared component library
   - Custom modal implementation using Tailwind CSS

2. **State Management**
   - Service-based state management
   - Observable data streams
   - Proper error handling
   - Loading state management

3. **UI/UX Features**
   - Responsive design using Tailwind CSS
   - Custom modal dialogs
   - Loading spinners and error states
   - Clean and intuitive interface

## Getting Started

### Prerequisites
- .NET 8 SDK
- SQL Server (or LocalDB)
- Node.js (version 16+)
- Angular CLI (version 16+)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/vishalmishra632/flexyboxblog.git
   cd flexyboxblog
   ```

2. Update database connection string in `appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=BlogDb;Trusted_Connection=True"
     }
   }
   ```

3. Apply database migrations:
   ```bash
   cd BlogAPI
   dotnet ef database update
   ```

4. Run the API:
   ```bash
   dotnet run
   ```

### Frontend Setup

1. Navigate to the Angular project:
   ```bash
   cd blog-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update API URL in `environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'https://localhost:7084'
   };
   ```

4. Start the application:
   ```bash
   ng serve
   ```

## Development Guidelines

### Backend Guidelines

1. **Adding New Features**
   - Create entities in Core layer
   - Implement interfaces in Infrastructure
   - Add controller endpoints in API layer
   - Follow REST principles

2. **Database Changes**
   - Add new migration: `dotnet ef migrations add MigrationName`
   - Update database: `dotnet ef database update`

### Frontend Guidelines

1. **Component Creation**
   - Use feature-based organization
   - Implement smart/presentational pattern
   - Follow Angular style guide
   - Use Tailwind CSS for styling

2. **State Management**
   - Services for data management
   - Observable patterns
   - Proper error handling
   - Loading state management

## Technical Decisions and Trade-offs

1. **Clean Architecture**
   - Pros: Maintainable, testable, scalable
   - Cons: Initial setup complexity

2. **Angular + Tailwind CSS**
   - Pros: Component-based, responsive design
   - Cons: Learning curve for Tailwind

3. **Entity Framework Core**
   - Pros: Strong ORM, LINQ support
   - Cons: Performance overhead for complex queries

## Future Enhancements

1. **Planned Features**
   - User authentication
   - Rich text editor
   - Image upload
   - Comments system
   - Social sharing

2. **Technical Improvements**
   - Caching implementation
   - Real-time updates
   - Performance optimizations
   - Unit test coverage

## Project Structure

```
flexyboxblog/
├── backend/
│   ├── BlogAPI.Core/
│   ├── BlogAPI.Infrastructure/
│   └── BlogAPI.API/
└── frontend/
    └── blog-client/
        ├── src/
        │   ├── app/
        │   ├── assets/
        │   └── environments/
        └── angular.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contact

Vishal Mishra
Project Link: https://github.com/vishalmishra632/flexyboxblog

## License

This project is licensed under the MIT License.
