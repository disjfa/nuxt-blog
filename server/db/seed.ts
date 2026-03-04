import 'dotenv/config'
import { db } from './client'
import { authors, categories, posts, postCategories } from './schema'

async function seed() {
  console.log('🌱 Seeding database...')

  try {
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('Clearing existing data...')
    await db.delete(postCategories)
    await db.delete(posts)
    await db.delete(categories)
    await db.delete(authors)

    // Seed Authors
    console.log('Creating authors...')
    const authorsToInsert = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Senior developer and tech blogger with 10+ years of experience in web development.',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        bio: 'Full-stack developer passionate about Vue.js and modern web technologies.',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=6366F1&color=fff',
      },
      {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        bio: 'DevOps engineer and cloud architecture enthusiast.',
        avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=10B981&color=fff',
      },
    ]
    await db.insert(authors).values(authorsToInsert)
    console.log(`✅ Created ${authorsToInsert.length} authors`)

    // Seed Categories
    console.log('Creating categories...')
    const categoriesToInsert = [
      {
        name: 'Web Development',
        slug: 'web-development',
        description: 'Articles about modern web development, frameworks, and best practices.',
      },
      {
        name: 'JavaScript',
        slug: 'javascript',
        description: 'Deep dives into JavaScript, TypeScript, and related technologies.',
      },
      {
        name: 'Vue.js',
        slug: 'vuejs',
        description: 'Everything about Vue.js, Nuxt, and the Vue ecosystem.',
      },
      {
        name: 'Database',
        slug: 'database',
        description: 'Database design, ORMs, and data management strategies.',
      },
      {
        name: 'DevOps',
        slug: 'devops',
        description: 'CI/CD, deployment, monitoring, and infrastructure topics.',
      },
      {
        name: 'Tutorial',
        slug: 'tutorial',
        description: 'Step-by-step guides and tutorials for developers.',
      },
    ]
    await db.insert(categories).values(categoriesToInsert)
    console.log(`✅ Created ${categoriesToInsert.length} categories`)

    // Get inserted IDs (we'll use sequential IDs for simplicity)
    const allAuthors = await db.select().from(authors)
    const allCategories = await db.select().from(categories)

    // Seed Posts
    console.log('Creating posts...')
    const postsData = [
      {
        title: 'Getting Started with Nuxt 4',
        slug: 'getting-started-with-nuxt-4',
        content: `# Getting Started with Nuxt 4

Nuxt 4 brings exciting new features and improvements to the Vue.js ecosystem. In this comprehensive guide, we'll explore the key changes and how to get started with your first Nuxt 4 project.

## Key Features

- **Enhanced Performance**: Nuxt 4 is faster than ever with optimized build times and runtime performance.
- **Better TypeScript Support**: First-class TypeScript integration out of the box.
- **Improved DevEx**: Enhanced developer experience with better error messages and debugging tools.

## Installation

\`\`\`bash
npx nuxi@latest init my-nuxt-app
cd my-nuxt-app
npm install
npm run dev
\`\`\`

Start building amazing applications today!`,
        excerpt: 'Learn how to get started with Nuxt 4 and explore its exciting new features.',
        status: 'published',
        authorId: allAuthors[0].id,
        publishedAt: new Date('2024-01-15'),
      },
      {
        title: 'Vue 3 Reactive System Explained',
        slug: 'vue-3-reactive-system-explained',
        content: `# Vue 3 Reactive System Explained

Understanding Vue 3's reactivity system is crucial for building efficient applications. Let's dive deep into how it works.

## The Proxy-based System

Vue 3 uses JavaScript Proxies for reactivity:

\`\`\`javascript
const state = reactive({
  count: 0,
  user: { name: 'John' }
})
\`\`\`

## Reactive vs Ref

- \`reactive()\` for objects
- \`ref()\` for primitives
- Both create reactive state

Master Vue's reactivity!`,
        excerpt: 'A deep dive into Vue 3 reactive system and how it powers your applications.',
        status: 'published',
        authorId: allAuthors[0].id,
        publishedAt: new Date('2024-01-10'),
      },
      {
        title: 'CSS Grid vs Flexbox: When to Use Each',
        slug: 'css-grid-vs-flexbox',
        content: `# CSS Grid vs Flexbox: When to Use Each

Both CSS Grid and Flexbox are powerful layout tools. Here's when to use each one.

## Flexbox for One-Dimensional Layouts

\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## Grid for Two-Dimensional Layouts

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

Choose the right tool for the job!`,
        excerpt: 'Learn when to use CSS Grid or Flexbox for your layout needs.',
        status: 'published',
        authorId: allAuthors[1].id,
        publishedAt: new Date('2024-01-12'),
      },
      {
        title: 'Mastering Drizzle ORM with MySQL',
        slug: 'mastering-drizzle-orm-mysql',
        content: `# Mastering Drizzle ORM with MySQL

Drizzle ORM is a lightweight, TypeScript-first ORM that makes working with databases a breeze. In this article, we'll dive deep into using Drizzle with MySQL.

## Why Drizzle?

- **Type-Safe**: Full TypeScript support with automatic type inference
- **Lightweight**: No unnecessary abstractions
- **Migration System**: Built-in migration tools
- **Performance**: Optimized queries and connection pooling

## Setting Up

\`\`\`typescript
import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

const connection = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'mydb',
})

const db = drizzle(connection)
\`\`\`

Happy querying!`,
        excerpt: 'A comprehensive guide to using Drizzle ORM with MySQL databases.',
        status: 'published',
        authorId: allAuthors[1].id,
        publishedAt: new Date('2024-02-01'),
      },
      {
        title: 'Modern JavaScript ES2024 Features',
        slug: 'modern-javascript-es2024-features',
        content: `# Modern JavaScript ES2024 Features

JavaScript continues to evolve with exciting new features. Let's explore what ES2024 brings to the table.

## Array Grouping

\`\`\`javascript
const users = [
  { name: 'John', role: 'admin' },
  { name: 'Jane', role: 'user' }
]

const grouped = Object.groupBy(users, user => user.role)
\`\`\`

## Promise.withResolvers

\`\`\`javascript
const { promise, resolve, reject } = Promise.withResolvers()
\`\`\`

Stay modern!`,
        excerpt: 'Explore the latest JavaScript features introduced in ES2024.',
        status: 'published',
        authorId: allAuthors[1].id,
        publishedAt: new Date('2024-01-25'),
      },
      {
        title: 'Docker for Web Developers',
        slug: 'docker-for-web-developers',
        content: `# Docker for Web Developers

Docker simplifies development and deployment. Here's everything web developers need to know.

## Why Docker?

- Consistent environments
- Easy dependency management
- Simplified deployment
- Isolation and security

## Basic Dockerfile

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

Containerize everything!`,
        excerpt: 'Learn Docker fundamentals every web developer should know.',
        status: 'published',
        authorId: allAuthors[2].id,
        publishedAt: new Date('2024-02-10'),
      },
      {
        title: 'Building Admin Panels with Nuxt UI',
        slug: 'building-admin-panels-nuxt-ui',
        content: `# Building Admin Panels with Nuxt UI

Nuxt UI provides beautiful, accessible components perfect for building admin panels. Let's explore how to create a professional admin interface.

## Component Library

Nuxt UI includes:
- Form components (Input, Select, Textarea)
- Data display (Tables, Cards, Lists)
- Navigation (Sidebar, Breadcrumbs)
- Feedback (Modals, Notifications)

## Example Admin Layout

\`\`\`vue
<template>
  <UApp>
    <USidebar>
      <UNavigationTree :links="links" />
    </USidebar>
    <UMain>
      <slot />
    </UMain>
  </UApp>
</template>
\`\`\`

Build beautiful admin interfaces quickly!`,
        excerpt: 'Learn how to create professional admin panels using Nuxt UI components.',
        status: 'published',
        authorId: allAuthors[0].id,
        publishedAt: new Date('2024-02-15'),
      },
      {
        title: 'Git Workflow Best Practices',
        slug: 'git-workflow-best-practices',
        content: `# Git Workflow Best Practices

Effective Git workflows improve team collaboration and code quality.

## Feature Branch Workflow

\`\`\`bash
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
\`\`\`

## Commit Message Convention

\`\`\`
feat: add user authentication
fix: resolve login redirect issue
docs: update API documentation
\`\`\`

Master version control!`,
        excerpt: 'Essential Git workflow practices for better collaboration.',
        status: 'published',
        authorId: allAuthors[2].id,
        publishedAt: new Date('2024-01-18'),
      },
      {
        title: 'Responsive Web Design Principles',
        slug: 'responsive-web-design-principles',
        content: `# Responsive Web Design Principles

Creating responsive websites is essential in today's multi-device world.

## Mobile-First Approach

\`\`\`css
/* Mobile styles first */
.container {
  padding: 1rem;
}

/* Desktop styles */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}
\`\`\`

## Flexible Grids

Use relative units like percentages and rem instead of fixed pixels.

Design for all screens!`,
        excerpt: 'Learn core principles of responsive web design.',
        status: 'published',
        authorId: allAuthors[1].id,
        publishedAt: new Date('2024-01-22'),
      },
      {
        title: 'API Authentication with JWT',
        slug: 'api-authentication-jwt',
        content: `# API Authentication with JWT

JSON Web Tokens (JWT) provide a secure way to authenticate API requests.

## How JWT Works

1. User logs in with credentials
2. Server generates JWT token
3. Client stores token
4. Client sends token with each request

## Implementation

\`\`\`javascript
import jwt from 'jsonwebtoken'

const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
)
\`\`\`

Secure your APIs!`,
        excerpt: 'Implement secure API authentication using JSON Web Tokens.',
        status: 'published',
        authorId: allAuthors[2].id,
        publishedAt: new Date('2024-02-05'),
      },
      {
        title: 'Tailwind CSS Tips and Tricks',
        slug: 'tailwind-css-tips-tricks',
        content: `# Tailwind CSS Tips and Tricks

Maximize your productivity with these Tailwind CSS tips.

## Custom Utilities

\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
      }
    }
  }
}
\`\`\`

## Group Modifiers

\`\`\`html
<div class="group">
  <span class="group-hover:text-blue-500">Hover me</span>
</div>
\`\`\`

Style faster!`,
        excerpt: 'Pro tips for working efficiently with Tailwind CSS.',
        status: 'published',
        authorId: allAuthors[1].id,
        publishedAt: new Date('2024-02-12'),
      },
      {
        title: 'Testing Vue Components with Vitest',
        slug: 'testing-vue-components-vitest',
        content: `# Testing Vue Components with Vitest

Vitest makes testing Vue components fast and enjoyable.

## Setup

\`\`\`bash
npm install -D vitest @vue/test-utils
\`\`\`

## Example Test

\`\`\`typescript
import { mount } from '@vue/test-utils'
import MyComponent from './MyComponent.vue'

test('renders properly', () => {
  const wrapper = mount(MyComponent)
  expect(wrapper.text()).toContain('Hello')
})
\`\`\`

Test with confidence!`,
        excerpt: 'Learn how to test Vue components effectively with Vitest.',
        status: 'published',
        authorId: allAuthors[0].id,
        publishedAt: new Date('2024-02-18'),
      },
      {
        title: 'Node.js Performance Optimization',
        slug: 'nodejs-performance-optimization',
        content: `# Node.js Performance Optimization

Optimize your Node.js applications for better performance.

## Use Clustering

\`\`\`javascript
import cluster from 'cluster'
import os from 'os'

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
}
\`\`\`

## Caching Strategies

Implement Redis caching for frequently accessed data.

Speed up your apps!`,
        excerpt: 'Essential techniques for optimizing Node.js application performance.',
        status: 'published',
        authorId: allAuthors[2].id,
        publishedAt: new Date('2024-02-22'),
      },
      {
        title: 'Web Accessibility Fundamentals',
        slug: 'web-accessibility-fundamentals',
        content: `# Web Accessibility Fundamentals

Building accessible websites ensures everyone can use your application.

## Semantic HTML

\`\`\`html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>
\`\`\`

## ARIA Labels

\`\`\`html
<button aria-label="Close dialog">×</button>
\`\`\`

## Keyboard Navigation

Ensure all interactive elements are keyboard accessible.

Build for everyone!`,
        excerpt: 'Learn the fundamentals of web accessibility for inclusive design.',
        status: 'published',
        authorId: allAuthors[0].id,
        publishedAt: new Date('2024-02-25'),
      },
      {
        title: 'TypeScript Best Practices for 2024',
        slug: 'typescript-best-practices-2024',
        content: `# TypeScript Best Practices for 2024

TypeScript continues to evolve. Here are the best practices you should follow in 2024.

## Type Safety First

Always prefer strict type checking:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
\`\`\`

## Use Type Inference

Let TypeScript infer types when possible:

\`\`\`typescript
// Good
const user = { name: 'John', age: 30 }

// Unnecessary
const user: { name: string; age: number } = { name: 'John', age: 30 }
\`\`\`

Write better TypeScript code!`,
        excerpt: 'Essential TypeScript best practices every developer should follow in 2024.',
        status: 'published',
        authorId: allAuthors[1].id,
        publishedAt: new Date('2024-02-20'),
      },
      {
        title: 'Deploying Nuxt Apps to Production',
        slug: 'deploying-nuxt-apps-production',
        content: `# Deploying Nuxt Apps to Production

Ready to deploy your Nuxt application? This guide covers everything you need to know.

## Hosting Options

- **Vercel**: Zero-config deployments
- **Netlify**: Great for static sites
- **Docker**: Full control with containers
- **VPS**: Traditional server deployment

## Build for Production

\`\`\`bash
npm run build
npm run preview
\`\`\`

## Environment Variables

\`\`\`
NUXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=mysql://...
\`\`\`

Deploy with confidence!`,
        excerpt: 'A complete guide to deploying Nuxt applications to production environments.',
        status: 'published',
        authorId: allAuthors[2].id,
        publishedAt: new Date('2024-03-01'),
      },
      {
        title: 'Understanding Vue Composition API',
        slug: 'understanding-vue-composition-api',
        content: `# Understanding Vue Composition API

The Composition API is a game-changer for Vue development. Let's understand why and how to use it effectively.

## What is Composition API?

A new way to organize component logic:

\`\`\`vue
<script setup lang="ts">
const count = ref(0)
const doubled = computed(() => count.value * 2)

function increment() {
  count.value++
}
</script>
\`\`\`

## Benefits

- Better code organization
- Improved TypeScript support
- Easier code reuse
- Better logic composition

Master the Composition API!`,
        excerpt: 'Deep dive into Vue Composition API and learn how to use it effectively.',
        status: 'draft',
        authorId: allAuthors[0].id,
      },
      {
        title: 'Database Migrations Made Easy',
        slug: 'database-migrations-made-easy',
        content: `# Database Migrations Made Easy

Database migrations don't have to be scary. Learn how to manage schema changes confidently.

## Migration Basics

Migrations are versioned schema changes:

\`\`\`bash
npm run db:generate
npm run db:migrate
\`\`\`

## Best Practices

1. Always test migrations locally first
2. Keep migrations small and focused
3. Never edit old migrations
4. Always have rollback plans

Stay in control of your schema!`,
        excerpt: 'Learn how to manage database migrations effectively with modern tools.',
        status: 'draft',
        authorId: allAuthors[1].id,
      },
      {
        title: 'REST API Design Principles',
        slug: 'rest-api-design-principles',
        content: `# REST API Design Principles

Designing great APIs requires following proven principles. Let's explore REST API best practices.

## Core Principles

- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Design clear resource URLs
- Return appropriate status codes
- Version your API

## Example Structure

\`\`\`
GET    /api/posts
POST   /api/posts
GET    /api/posts/:id
PUT    /api/posts/:id
DELETE /api/posts/:id
\`\`\`

Build better APIs!`,
        excerpt: 'Essential principles for designing clean and maintainable REST APIs.',
        status: 'published',
        authorId: allAuthors[2].id,
        publishedAt: new Date('2024-01-20'),
      },
      {
        title: 'GraphQL vs REST: Making the Right Choice',
        slug: 'graphql-vs-rest',
        content: `# GraphQL vs REST: Making the Right Choice

Both GraphQL and REST have their place. Learn when to use each.

## GraphQL Advantages

- Flexible data fetching
- Single endpoint
- Strong typing
- No over-fetching

## REST Advantages

- Simple and proven
- Better caching
- Easier to learn
- Wide tooling support

Choose wisely!`,
        excerpt: 'Compare GraphQL and REST to make informed API design decisions.',
        status: 'published',
        authorId: allAuthors[1].id,
        publishedAt: new Date('2024-01-28'),
      },
      {
        title: 'Serverless Functions with Nitro',
        slug: 'serverless-functions-nitro',
        content: `# Serverless Functions with Nitro

Nitro powers Nuxt's server engine and makes serverless deployment easy.

## API Routes

\`\`\`typescript
// server/api/hello.ts
export default defineEventHandler(() => {
  return { message: 'Hello from serverless!' }
})
\`\`\`

## Deploy Anywhere

Nitro can deploy to:
- Vercel
- Netlify
- Cloudflare Workers
- AWS Lambda

Go serverless!`,
        excerpt: 'Learn how to build and deploy serverless functions with Nitro.',
        status: 'published',
        authorId: allAuthors[0].id,
        publishedAt: new Date('2024-02-08'),
      },
      {
        title: 'Optimizing Images for the Web',
        slug: 'optimizing-images-web',
        content: `# Optimizing Images for the Web

Image optimization is crucial for web performance.

## Modern Formats

Use WebP or AVIF for better compression:

\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description">
</picture>
\`\`\`

## Lazy Loading

\`\`\`html
<img loading="lazy" src="image.jpg" alt="Lazy loaded">
\`\`\`

Faster page loads!`,
        excerpt: 'Best practices for optimizing images to improve web performance.',
        status: 'published',
        authorId: allAuthors[1].id,
        publishedAt: new Date('2024-02-14'),
      },
      {
        title: 'WebSockets with Nuxt',
        slug: 'websockets-nuxt',
        content: `# WebSockets with Nuxt

Real-time communication is essential for modern web apps.

## Socket.io Integration

\`\`\`typescript
// server/plugins/socket.ts
import { Server } from 'socket.io'

export default defineNitroPlugin(() => {
  const io = new Server()

  io.on('connection', (socket) => {
    console.log('Client connected')
  })
})
\`\`\`

Build real-time features!`,
        excerpt: 'Implement WebSocket communication in your Nuxt applications.',
        status: 'draft',
        authorId: allAuthors[2].id,
      },
      {
        title: 'SEO Best Practices for Vue Apps',
        slug: 'seo-vue-apps',
        content: `# SEO Best Practices for Vue Apps

Optimize your Vue applications for search engines.

## Meta Tags

\`\`\`typescript
useSeoMeta({
  title: 'My Page Title',
  description: 'Page description',
  ogImage: '/og-image.jpg'
})
\`\`\`

## Structured Data

\`\`\`html
<script type="application/ld+json">
{
  "@type": "Article",
  "headline": "Article Title"
}
</script>
\`\`\`

Rank higher!`,
        excerpt: 'Essential SEO techniques for Vue and Nuxt applications.',
        status: 'published',
        authorId: allAuthors[0].id,
        publishedAt: new Date('2024-02-28'),
      },
    ]

    await db.insert(posts).values(postsData)
    console.log(`✅ Created ${postsData.length} posts`)

    // Get all posts to link with categories
    const allPosts = await db.select().from(posts)

    // Link posts to categories
    console.log('Linking posts to categories...')
    const postCategoryLinks = [
      // Post 0: Getting Started with Nuxt 4
      { postId: allPosts[0].id, categoryId: allCategories[2].id }, // Vue.js
      { postId: allPosts[0].id, categoryId: allCategories[5].id }, // Tutorial
      // Post 1: Vue 3 Reactive System
      { postId: allPosts[1].id, categoryId: allCategories[2].id }, // Vue.js
      { postId: allPosts[1].id, categoryId: allCategories[1].id }, // JavaScript
      // Post 2: CSS Grid vs Flexbox
      { postId: allPosts[2].id, categoryId: allCategories[0].id }, // Web Development
      { postId: allPosts[2].id, categoryId: allCategories[5].id }, // Tutorial
      // Post 3: Mastering Drizzle ORM
      { postId: allPosts[3].id, categoryId: allCategories[3].id }, // Database
      { postId: allPosts[3].id, categoryId: allCategories[5].id }, // Tutorial
      // Post 4: Modern JavaScript ES2024
      { postId: allPosts[4].id, categoryId: allCategories[1].id }, // JavaScript
      { postId: allPosts[4].id, categoryId: allCategories[0].id }, // Web Development
      // Post 5: Docker for Web Developers
      { postId: allPosts[5].id, categoryId: allCategories[4].id }, // DevOps
      { postId: allPosts[5].id, categoryId: allCategories[5].id }, // Tutorial
      // Post 6: Building Admin Panels
      { postId: allPosts[6].id, categoryId: allCategories[2].id }, // Vue.js
      { postId: allPosts[6].id, categoryId: allCategories[0].id }, // Web Development
      // Post 7: Git Workflow Best Practices
      { postId: allPosts[7].id, categoryId: allCategories[4].id }, // DevOps
      { postId: allPosts[7].id, categoryId: allCategories[5].id }, // Tutorial
      // Post 8: Responsive Web Design
      { postId: allPosts[8].id, categoryId: allCategories[0].id }, // Web Development
      { postId: allPosts[8].id, categoryId: allCategories[5].id }, // Tutorial
      // Post 9: API Authentication with JWT
      { postId: allPosts[9].id, categoryId: allCategories[0].id }, // Web Development
      { postId: allPosts[9].id, categoryId: allCategories[5].id }, // Tutorial
      // Post 10: Tailwind CSS Tips
      { postId: allPosts[10].id, categoryId: allCategories[0].id }, // Web Development
      // Post 11: Testing Vue Components with Vitest
      { postId: allPosts[11].id, categoryId: allCategories[2].id }, // Vue.js
      { postId: allPosts[11].id, categoryId: allCategories[5].id }, // Tutorial
      // Post 12: Node.js Performance Optimization
      { postId: allPosts[12].id, categoryId: allCategories[1].id }, // JavaScript
      { postId: allPosts[12].id, categoryId: allCategories[4].id }, // DevOps
      // Post 13: Web Accessibility Fundamentals
      { postId: allPosts[13].id, categoryId: allCategories[0].id }, // Web Development
      { postId: allPosts[13].id, categoryId: allCategories[5].id }, // Tutorial
      // Post 14: TypeScript Best Practices
      { postId: allPosts[14].id, categoryId: allCategories[1].id }, // JavaScript
      { postId: allPosts[14].id, categoryId: allCategories[0].id }, // Web Development
      // Post 15: Deploying Nuxt Apps
      { postId: allPosts[15].id, categoryId: allCategories[4].id }, // DevOps
      { postId: allPosts[15].id, categoryId: allCategories[2].id }, // Vue.js
      // Post 16: Understanding Vue Composition API
      { postId: allPosts[16].id, categoryId: allCategories[2].id }, // Vue.js
      { postId: allPosts[16].id, categoryId: allCategories[1].id }, // JavaScript
      // Post 17: Database Migrations
      { postId: allPosts[17].id, categoryId: allCategories[3].id }, // Database
      { postId: allPosts[17].id, categoryId: allCategories[5].id }, // Tutorial
      // Post 18: REST API Design
      { postId: allPosts[18].id, categoryId: allCategories[0].id }, // Web Development
      { postId: allPosts[18].id, categoryId: allCategories[5].id }, // Tutorial
      // Post 19: GraphQL vs REST
      { postId: allPosts[19].id, categoryId: allCategories[0].id }, // Web Development
      { postId: allPosts[19].id, categoryId: allCategories[1].id }, // JavaScript
      // Post 20: Serverless Functions with Nitro
      { postId: allPosts[20].id, categoryId: allCategories[2].id }, // Vue.js
      { postId: allPosts[20].id, categoryId: allCategories[4].id }, // DevOps
      // Post 21: Optimizing Images
      { postId: allPosts[21].id, categoryId: allCategories[0].id }, // Web Development
      { postId: allPosts[21].id, categoryId: allCategories[5].id }, // Tutorial
      // Post 22: WebSockets with Nuxt
      { postId: allPosts[22].id, categoryId: allCategories[2].id }, // Vue.js
      { postId: allPosts[22].id, categoryId: allCategories[0].id }, // Web Development
      // Post 23: SEO Best Practices
      { postId: allPosts[23].id, categoryId: allCategories[2].id }, // Vue.js
      { postId: allPosts[23].id, categoryId: allCategories[0].id }, // Web Development
    ]

    await db.insert(postCategories).values(postCategoryLinks)
    console.log(`✅ Created ${postCategoryLinks.length} post-category links`)

    console.log('\n🎉 Database seeded successfully!')
    console.log(`
Summary:
- ${authorsToInsert.length} authors
- ${categoriesToInsert.length} categories
- ${postsData.length} posts
- ${postCategoryLinks.length} post-category links
    `)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log('✅ Seed completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  })
