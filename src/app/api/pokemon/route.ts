import { NextResponse } from 'next/server'
import capitalizeFirstLetter from '@/lib/capitalizeFirstLetter'

interface Type {
  name: string
  url: string
}

interface TypeEntry {
  slot: number
  type: Type
}

type PokemonData = {
  id: number
  name: string
  types: TypeEntry[]
  sprite: string
}
export async function GET() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/1/`)
  if (!res.ok) throw new Error('Error fetching pokemon')
  const data = await res.json()
  const pokemonData: PokemonData = {
    id: data.id,
    name: capitalizeFirstLetter(data.name),
    types: data.types.map((typeEntry: TypeEntry) => typeEntry.type.name),
    sprite: data.sprites.other['official-artwork'].front_default,
  }

  return NextResponse.json({ pokemonData })
}
