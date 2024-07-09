
import PokeListItem from "../Components/PokeListItem"
import "../css/global.css"

interface PokemonListProps{
    items:number[]
}

const PokeList:React.FC<PokemonListProps>=function({items}){
    return (
        <div className="w-[75%] mx-auto  grid grid-cols-4 gap-4 mb-3">
            {items.map((item,index)=>{
                const listItem=<PokeListItem ID={item}/>
                return (<div key={index+1}>{listItem}</div>)
            })}
        </div>
    )
}


export default PokeList