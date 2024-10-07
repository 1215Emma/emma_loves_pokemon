import styles from './page.module.css'
import { Memory } from '@/components/Memory'

const memory = () => {
  return (
    <div className={styles.background}>
      <h1 className={styles.heading}>Memory</h1>
      <Memory />
    </div>
  )
}

export default memory
