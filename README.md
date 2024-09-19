# Nuxt 3 Backend Features Demo

This project demonstrates key backend capabilities in Nuxt 3:

## Features

### RESTful API
- Easy API creation using the `server/api/` directory
- Examples:
  - `server/api/typesExample.get.ts`: Demonstrates basic API endpoint
  - `server/api/cachedExample.get.ts`: Shows caching implementation
  - `server/api/tasks/demoRun.post.ts`: Illustrates POST request handling

### Background Tasks
- Implemented using Nitro tasks
- Example: `server/tasks/demo/nitrotask.ts`

### WebSocket
- Real-time communication using Socket.IO
- Implementation details in `server/middleware/socket.middleware.ts`

### Cron Jobs
- Scheduled tasks using `server/plugins/pluginScheduler.ts`

### Caching
- Server-side caching example: `server/api/cachedExample.get.ts`

## Getting Started

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Set up your environment variables (copy `.env.example` to `.env` and fill in the values)
4. Run the development server: `pnpm run dev`

## Project Structure

- `server/`: Contains all server-side code
  - `api/`: API routes
  - `tasks/`: Background tasks
  - `plugins/`: Nuxt plugins
  - `middleware/`: Server middleware
- `components/`: Vue components
- `pages/`: Nuxt pages
- `prisma/`: Prisma ORM configuration and migrations

## Additional Information

- This project uses Prisma ORM for database operations. Run `npx prisma db push` to sync your database schema.
- WebSocket functionality is implemented using Socket.IO. See `server/middleware/socket.middleware.ts` for details.
- For authentication, check `server/api/auth/[...].ts` which uses `@sidebase/nuxt-auth`.