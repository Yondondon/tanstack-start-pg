import { createMiddleware } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { createFileRoute } from '@tanstack/react-router'
import { User } from '@/utils'

const userLoggerMiddleware = createMiddleware().server(async ({ next }) => {
  console.info('In: /users')
  console.info('Request Headers:', getRequestHeaders())
  const result = await next()
  result.response.headers.set('x-users', 'true')
  console.info('Out: /users')
  return result
})

export const Route = createFileRoute('/api/users')({
  server: {
    middleware: [userLoggerMiddleware],
    handlers: {
      GET: async ({ request }) => {
        console.info('GET /api/users @', request.url)
        console.info('Fetching users... @', request.url)
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!res.ok) {
          throw new Error('Failed to fetch users')
        }

        const data = (await res.json()) as User[]
        const sliced = data.slice(0, 10)

        return Response.json(
          sliced.map((u) => ({ id: u.id, name: u.name, email: u.email })),
        )
      },
    },
  },
})
