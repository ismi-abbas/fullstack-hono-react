import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/test">Test</Link>
        <Link to="/users">Users</Link>
      </nav>
      <Outlet />
    </React.Fragment>
  )
}
