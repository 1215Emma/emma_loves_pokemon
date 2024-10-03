import { GameCard } from '../components/GameCard'
import { HeroBanner } from '@/components/HeroBanner'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.landingContainer}>
      <HeroBanner />
      <GameCard />
    </div>
  )
}
