'use client'
import Image from 'next/image'
import { eeveelutions } from '../../app/api/games/eeveelutions'
import styles from './memory.module.css'

export const Memory = () => {
  return (
    <div className={styles.memoryContainer}>
      {eeveelutions.map((eeveelution) => {
        return (
          <div className={styles.imageContainer}>
            <Image
              src={eeveelution.sprite}
              width={150}
              height={150}
              alt={eeveelution.name}
            />
          </div>
        )
      })}
    </div>
  )
}
