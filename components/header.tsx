import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <header className={styles.pageHeader}>
      <div className={styles.wrappedContainer}>
        <div className={styles.leftSection}>
          <h2 className={styles.logoText}>Product Catalogue</h2>
          <nav className={styles.navWrapper}>
            <ul className={styles.navItems}>
              <li className={styles.navItem}>
                <Link href="/" className={styles.navLink}>Home</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/products" className={styles.navLink}>Products</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.rightSection}>
          <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
          {
            !session ?
              <a href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
                className={styles.navLink}
              >
                Sign in
              </a> :
              <a
                className={styles.navLink}
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
          }
        </div>
      </div>
    </header>
  )
}
