import { EeveelutionsType } from '@/app/api/games/eeveelutions'

function shuffleArray(array: EeveelutionsType[]) {
  // Create a copy of the array to avoid modifying the original
  const shuffledArray = array.slice()

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    const randomIndex = Math.floor(Math.random() * (i + 1))

    // Swap elements at index i and randomIndex
    ;[shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ]
  }

  return shuffledArray
}

export default shuffleArray
