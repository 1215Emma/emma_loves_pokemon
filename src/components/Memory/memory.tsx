'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  eeveelutions,
  EeveelutionsType,
} from '../../app/api/games/eeveelutions'
import shuffleArray from '@/lib/shuffleArray'
import styles from './memory.module.css'
import MemoryCardBack from '../../assets/backgrounds/memoryCardBack.webp'
export const Memory = () => {
  const [shuffledMemory, setShuffledMemory] = useState<EeveelutionsType[]>(
    shuffleArray([...eeveelutions.slice(0, 3), ...eeveelutions.slice(0, 3)]),
  )
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedCards, setMatchedCards] = useState<number[]>([])
  const [level, setLevel] = useState<number>(1)
  const [failedAttempts, setFailedAttempts] = useState<number>(0)
  const [maxAttempts, setMaxAttempts] = useState<number>(2)

  const handleCardClick = (index: number) => {
    // If two cards are already flipped or the card is already matched, do nothing
    if (
      flippedCards.length >= 2 ||
      flippedCards.includes(index) ||
      matchedCards.includes(shuffledMemory[index].id)
    ) {
      return
    }

    // Add the clicked card to the flippedCards array
    setFlippedCards((prev) => [...prev, index])

    // If it's the first card being flipped
    if (flippedCards.length === 1) {
      const firstCardIndex = flippedCards[0]
      const firstCard = shuffledMemory[firstCardIndex]
      const secondCard = shuffledMemory[index]

      // Check if the two cards match
      if (firstCard.id === secondCard.id) {
        setMatchedCards((prev) => [...prev, firstCard.id])
        // Clear the flippedCards after a successful match
        setFlippedCards([])
      } else {
        // If no match, wait for a second before resetting
        setTimeout(() => {
          setFlippedCards([])
          setFailedAttempts(failedAttempts + 1)
          if (failedAttempts >= maxAttempts) {
            setMatchedCards([])
            setLevel(1)
            setFailedAttempts(0)
            setMaxAttempts(2)
            setShuffledMemory(
              shuffleArray([
                ...eeveelutions.slice(0, 3),
                ...eeveelutions.slice(0, 3),
              ]),
            )
          }
        }, 1000)
      }
    }
  }
  if (
    level === 1 &&
    failedAttempts <= maxAttempts &&
    matchedCards.length === 3
  ) {
    setTimeout(() => {
      setLevel(2)
      setFailedAttempts(0)
      setMaxAttempts(5)
      setFlippedCards([])
      setMatchedCards([])
      setShuffledMemory(
        shuffleArray([
          ...eeveelutions.slice(0, 6),
          ...eeveelutions.slice(0, 6),
        ]),
      )
    }, 1500)
  }
  if (
    level === 2 &&
    failedAttempts <= maxAttempts &&
    matchedCards.length === 6
  ) {
    setTimeout(() => {
      setLevel(3)
      setFailedAttempts(0)
      setMaxAttempts(9)
      setFlippedCards([])
      setMatchedCards([])
      setShuffledMemory(shuffleArray([...eeveelutions, ...eeveelutions]))
    }, 1500)
  }

  return (
    <div className={styles.memoryContainer}>
      {shuffledMemory.map((eeveelution, index) => {
        const isFlipped =
          matchedCards.includes(eeveelution.id) || flippedCards.includes(index)

        return (
          <div className={styles.cardContainer} key={index}>
            <button
              type="button"
              className={`${styles.imageContainer} ${
                isFlipped ? styles.flipped : ''
              }`}
              onClick={() => {
                handleCardClick(index)
              }}
              disabled={matchedCards.includes(eeveelution.id)}
            >
              {isFlipped ? (
                <Image
                  src={eeveelution.sprite}
                  width={200}
                  height={200}
                  alt={eeveelution.name}
                  className={styles.flipCardFront}
                />
              ) : (
                <Image
                  src={MemoryCardBack}
                  fill={true}
                  alt={'card back'}
                  className={styles.flipCardBack}
                />
              )}
            </button>
          </div>
        )
      })}
    </div>
  )
}
