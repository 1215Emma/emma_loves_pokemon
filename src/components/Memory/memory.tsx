'use client'
import { useState } from 'react'
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
    shuffleArray([...eeveelutions, ...eeveelutions]),
  )
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedCards, setMatchedCards] = useState<number[]>([])
  const [difficulty, setDifficulty] = useState<string[]>()
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
        }, 1000)
      }
    }
  }

  return (
    <div className={styles.memoryContainer}>
      {shuffledMemory.map((eeveelution, index) => {
        const isFlipped =
          matchedCards.includes(eeveelution.id) || flippedCards.includes(index)

        return (
          <button
            type="button"
            className={styles.imageContainer}
            onClick={() => {
              handleCardClick(index)
            }}
            disabled={matchedCards.includes(eeveelution.id)}
          >
            {isFlipped ? (
              <Image
                src={eeveelution.sprite}
                width={150}
                height={150}
                alt={eeveelution.name}
              />
            ) : (
              <Image src={MemoryCardBack} fill={true} alt={'card back'} />
            )}
          </button>
        )
      })}
    </div>
  )
}
