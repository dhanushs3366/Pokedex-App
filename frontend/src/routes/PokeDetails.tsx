import DetailsRenderer from "../Components/DetailsRenderer"

function PokeDetails(){
    return(
        <div className="poke-details w-auto h-auto mx-auto">
            <div className="w-poke-viewer h-auto ">
                <DetailsRenderer ID={69}/>
            </div>
        </div>
    )
}

export default PokeDetails