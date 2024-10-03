'use client'
import Image from 'next/image'
import styles from './GameCard.module.css'

export const GameCard = () => {
  return (
    <button
      type="button"
      className={styles.imageButton}
      onClick={() => {
        console.log('test')
      }}
    >
      Memory
    </button>
  )
}
