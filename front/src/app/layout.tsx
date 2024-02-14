'use client'

import './globals.css'
import { usePathname } from 'next/navigation'
import { checkIsPublicRoute } from '@/functions/check-is-public-route'
import PrivateRoute from '@/components/PrivateRoute'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathName = usePathname();

  const isPublicPage = checkIsPublicRoute(pathName!)
  return (
    <html lang="en">
      <body style={{
        padding: 0,
        margin: 0,
      }}>
        {isPublicPage && children}  
        {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}  
      </body>
    </html>
  )
}
