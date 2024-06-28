import DetailsRenderer from "../Components/DetailsRenderer"

function PokeDetails(){
    return(
        <div className="poke-details w-auto h-auto mx-auto">
            <div className="w-poke-viewer-holder h-auto">
                <DetailsRenderer/>
            </div>
        </div>
    )
}

export default PokeDetails