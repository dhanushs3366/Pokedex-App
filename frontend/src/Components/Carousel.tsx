import React from "react";
import DetailsRenderer from "./DetailsRenderer";

interface CarouselProps {
  items: number[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  let start, end;
  (start = 0), (end = start + 5); // One will be in the middle, two will be behind, the other two will be hidden
  const slicedItems = items.slice(start, end);

  return (
    <div className="carousel flex relative justify-center w-full gap-2 items-center">
      <button className="rounded-full size-8 bg-green-500 text-white font-bold"> &larr; </button>


      <div className="w-poke-viewer relative h-[480px] rounded-2xl left-[150px] overflow-hidden main-item z-40">
        <DetailsRenderer pokemonID={slicedItems[1]} parentEleHeight={480} />
      </div>
      <div className="w-poke-viewer h-pokemon-details-card-h main-item z-50">
        <DetailsRenderer pokemonID={slicedItems[2]} parentEleHeight={573} />
      </div>
      <div className="w-poke-viewer relative h-[480px] rounded-2xl right-[150px] overflow-hidden main-item z-40">
        <DetailsRenderer pokemonID={slicedItems[3]} parentEleHeight={480} />
      </div>


      <button className="rounded-full size-8 bg-green-500 text-white font-bold"> &rarr; </button>
    </div>
  );
};

export default Carousel;
