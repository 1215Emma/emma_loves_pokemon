import styles from './page.module.css'
import { Memory } from '@/components/Memory'

const memory = () => {
  return (
    <div className={styles.background}>
      <Memory />
    </div>
  )
}

export default memory
