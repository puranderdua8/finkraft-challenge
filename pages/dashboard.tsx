import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import AccessDenied from "../components/access-denied"

export default function ProtectedPage() {
  const { data: session } = useSession();
  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  // If session exists, display content
  return (
    <Layout>
      <p>
        You are signed in as: <strong>{session.user.email}</strong>
      </p>
    </Layout>
  )
}
