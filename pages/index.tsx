import Layout from "../components/layout"
import styles from "./index.module.css"

export default function IndexPage() {
  return (
    <Layout>
      <div className={styles.homeContainer}>
        <h2>Welcome to product catalogue</h2>
        <p>Here, you can browse products, view product details and signin to see your dashboard.</p>
      </div>
    </Layout>
  )
}
