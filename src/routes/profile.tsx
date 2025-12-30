import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div>Hello "/profile"!</div>
      <Link to={'/'}>Index</Link>
    </>
  )
}
