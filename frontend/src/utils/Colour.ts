import PokemonTypes from "../enums/PokemonTypes";
import PrimaryColour from "../enums/PrimaryColour";

export function hexToRgb(hex: string): number[] {
  hex = hex.replace(/^#/, "");

  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return [r, g, b];
}

export function getPrimaryColour(pokemonType: PokemonTypes): PrimaryColour {
  switch (pokemonType) {
    case PokemonTypes.BUG:
      return PrimaryColour.BUG;
    case PokemonTypes.DARK:
      return PrimaryColour.DARK;
    case PokemonTypes.DRAGON:
      return PrimaryColour.DRAGON;
    case PokemonTypes.ELECTRIC:
      return PrimaryColour.ELECTRIC;
    case PokemonTypes.FAIRY:
      return PrimaryColour.FAIRY;
    case PokemonTypes.FIGHTING:
      return PrimaryColour.FIGHTING;
    case PokemonTypes.FIRE:
      return PrimaryColour.FIRE;
    case PokemonTypes.FLYING:
      return PrimaryColour.FLYING;
    case PokemonTypes.GHOST:
      return PrimaryColour.GHOST;
    case PokemonTypes.GRASS:
      return PrimaryColour.GRASS;
    case PokemonTypes.GROUND:
      return PrimaryColour.GROUND;
    case PokemonTypes.ICE:
      return PrimaryColour.ICE;
    case PokemonTypes.NORMAL:
      return PrimaryColour.NORMAL;
    case PokemonTypes.POISON:
      return PrimaryColour.POISON;
    case PokemonTypes.PSYCHIC:
      return PrimaryColour.PSYCHIC;
    case PokemonTypes.ROCK:
      return PrimaryColour.ROCK;
    case PokemonTypes.STEEL:
      return PrimaryColour.STEEL;
    case PokemonTypes.WATER:
      return PrimaryColour.WATER;
  }
}
