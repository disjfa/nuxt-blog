# AGENTS

## Project Context

- Nuxt 4 blog with MySQL and Drizzle ORM.
- Admin UI in `app/pages/admin/` with posts, authors, categories, comments, and dashboard.
- Drizzle schema in `server/db/schema.ts` with migrations in `server/db/migrations/`.

## Current Setup (as of 2026-03-04)

- ESLint + Prettier configured in `eslint.config.mjs` and `.prettierrc`.
- Seed script available at `server/db/seed.ts` with `db:seed` script.
- Pagination added to posts list API and UI.
- Posts list API joins authors to return `author` names.
- `useFetch` used in admin pages for stats and posts list.
- `getErrorMessage` centralized in `server/utils/error.ts`.
- Request body types centralized in `server/types/`.

## Key Scripts

- `npm run dev` - start dev server.
- `npm run db:generate` - generate migrations.
- `npm run db:migrate` - run migrations.
- `npm run db:seed` - seed sample data (24 posts, 6 categories, 3 authors).
- `npm run lint` / `npm run lint:fix` - linting.
- `npm run format` - prettier.

## Important Files

- `nuxt.config.ts`
- `server/db/schema.ts`
- `server/db/seed.ts`
- `server/api/admin/posts/index.ts` (pagination + author join)
- `app/pages/admin/posts/index.vue` (UTable + pagination)

## Notes / Decisions

- Posts table uses Nuxt UI `UTable` with column `id` fields.
- Light/dark styling is applied to the posts table container.
- Pagination is server-side (page/limit) with client-side search/status filter.

## Known Follow-ups

- If needed, move client-side search/status filter into the API so pagination respects filters.
- Consider adding validation for post create/update endpoints.
- Consider seeding comments and post_categories for all posts (currently 47 links for 24 posts).
