# Nuxt Blog with MySQL & Drizzle ORM

A modern blog platform built with Nuxt 4, MySQL database, and Drizzle ORM. Includes a complete admin panel for managing posts, categories, authors, and comments.

## Features

- 🚀 **Nuxt 4** - Latest Vue 3 framework
- 🗄️ **MySQL Database** - Reliable data storage with Drizzle ORM
- 📊 **Admin Dashboard** - Full-featured admin panel
- 📝 **Post Management** - Create, edit, and publish blog posts
- 🏷️ **Categories** - Organize posts with categories
- 👥 **Authors** - Manage multiple blog authors
- 💬 **Comments** - Moderate user comments
- 🎨 **Dark Theme** - Modern dark UI with Tailwind CSS & Nuxt UI

## Prerequisites

- **Node.js** - v18 or higher
- **MySQL** - Running on 127.0.0.1:3306
- **npm** or **pnpm** - Package manager

## Database Setup

See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for complete database configuration instructions.

### Quick Start

1. **Configure Environment**

   ```bash
   cp .env.example .env
   # Edit .env with your MySQL credentials
   ```

2. **Create Database**

   ```sql
   CREATE DATABASE nuxt_blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Generate and Run Migrations**

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Seed Sample Data (Optional)**

   ```bash
   npm run db:seed
   ```

   This will populate your database with:
   - 3 sample authors
   - 6 categories (Web Development, JavaScript, Vue.js, Database, DevOps, Tutorial)
   - 8 sample blog posts (mix of published and draft)
   - Post-category relationships

6. **Start Development Server**
   npm run db:migrate

   ```

   ```

7. **Start Development Server**

   ```bash
   npm run dev
   ```

8. **Access Admin Panel**
   - Navigate to `http://localhost:3000/admin`
   - Dashboard displays database statistics
   - Use sidebar to navigate between sections

## Project Structure

```
app/
├── layouts/
│   └── admin.vue          # Admin layout with sidebar
├── pages/
│   ├── index.vue          # Blog home page
│   └── admin/
│       ├── index.vue      # Dashboard
│       ├── posts/
│       │   ├── index.vue  # Posts list
│       │   ├── new.vue    # New/edit post
│       │   └── [id].vue   # Edit existing post
│       ├── categories/    # Category management
│       ├── authors/       # Author management
│       └── comments/      # Comment moderation
├── components/            # Reusable components
└── assets/
    └── css/
        └── main.css       # Tailwind styles

server/
├── api/
│   ├── health.ts          # DB health check
│   └── admin/
│       ├── stats.ts       # Dashboard statistics
│       ├── posts/         # Posts CRUD endpoints
│       ├── categories/    # Categories CRUD endpoints
│       ├── authors/       # Authors CRUD endpoints
│       └── comments/      # Comments CRUD endpoints
└── db/
    ├── index.ts           # MySQL connection pool
    ├── client.ts          # Drizzle ORM instance
    ├── schema.ts          # Database schema
    └── migrations/        # Auto-generated SQL migrations
```

## Database Schema

### Tables

- **posts** - Blog posts with title, content, status, author
- **authors** - Blog authors with name, email, bio, avatar
- **categories** - Post categories
- **post_categories** - Many-to-many relationship between posts and categories
- **comments** - Blog comments with status for moderation

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run db:generate  # Generate migrations from schema
npm run db:migrate   # Run pending migrations
npm run db:seed      # Seed database with sample data
npm run lint         # Lint code with ESLint
npm run lint:fix     # Auto-fix linting issues
npm run format       # Format code with Prettier
npm run typecheck    # TypeScript type checking
```

## API Endpoints

### Health Check

- `GET /api/health` - Test database connection

### Dashboard

- `GET /api/admin/stats` - Get dashboard statistics

### Posts

- `GET /api/admin/posts` - List all posts
- `POST /api/admin/posts` - Create new post
- `GET /api/admin/posts/:id` - Get post details
- `PUT /api/admin/posts/:id` - Update post
- `DELETE /api/admin/posts/:id` - Delete post

### Authors

- `GET /api/admin/authors` - List all authors
- `POST /api/admin/authors` - Create new author
- `PUT /api/admin/authors/:id` - Update author
- `DELETE /api/admin/authors/:id` - Delete author

### Categories

- `GET /api/admin/categories` - List all categories
- `POST /api/admin/categories` - Create new category
- `PUT /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category

### Comments

- `GET /api/admin/comments` - List all comments
- `PUT /api/admin/comments/:id` - Update comment status
- `DELETE /api/admin/comments/:id` - Delete comment

## Development Tips

### Adding a New Feature

1. Update schema in `server/db/schema.ts`
2. Generate migrations: `npm run db:generate`
3. Create API endpoints in `server/api/admin/`
4. Create UI pages in `app/pages/admin/`

### Database Debugging

- Check connection: `GET /api/health`
- View all migrations: `server/db/migrations/`
- Update credentials in `.env`

## Technology Stack

- **Frontend**: Vue 3, Nuxt 4, TypeScript
- **UI Framework**: Nuxt UI, Tailwind CSS
- **Database**: MySQL
- **ORM**: Drizzle ORM
- **Linting**: ESLint

## License

See LICENSE file for details
