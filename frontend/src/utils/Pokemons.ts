export function GetAllPokemonIDs():number[]{
    const IDs:number[]=[]
    const TOTAL_POKEMONS=151
    for(let i=0;i<TOTAL_POKEMONS;i++){
        IDs.push(i+1)
    }
    return IDs
}