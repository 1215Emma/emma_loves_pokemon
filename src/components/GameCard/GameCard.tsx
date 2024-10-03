'use client'
import { games } from '../../app/api/games/games'
import styles from './GameCard.module.css'

export const GameCard = () => {
  return (
    <div className={styles.gamesCardContainer}>
      {games.map((game) => (
        <button
          type="button"
          className={styles.imageButton}
          onClick={() => {
            console.log('test')
          }}
        >
          {game.name}
        </button>
      ))}
    </div>
  )
}
