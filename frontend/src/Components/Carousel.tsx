import React, { useState, useEffect } from "react";
import DetailsRenderer from "./DetailsRenderer";

interface CarouselProps {
  items: number[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(5);
  const itemsLength = items.length;

  const [slicedItems, setSlicedItems] = useState<number[]>(items.slice(start, end));
  const [carouselItems,setCarouselItems]=useState<typeof DetailsRenderer[]>()

  useEffect(() => {
    setSlicedItems(items.slice(start, end)); //render the components
  }, [start, end, items]);

  const handleRightClick = () => {
    let newStart = (start + 1) % itemsLength;
    let newEnd = (end + 1) % itemsLength;

    if(newEnd<newStart){
      
      newEnd=newEnd+newStart
      newStart=newEnd-newStart
      newEnd=newEnd-newStart

    }

    setStart(newStart);
    setEnd(newEnd);
  };

  const handleLeftClick = () => {
    const newStart = (start - 1 + itemsLength) % itemsLength;
    const newEnd = (end - 1 + itemsLength) % itemsLength;
    setStart(newStart);
    setEnd(newEnd);
  };

  

  return (
    <div className="carousel flex relative justify-center w-full gap-2 items-center">
      <button onClick={handleLeftClick} className="rounded-full size-8 bg-green-500 text-white font-bold">
        &larr;
      </button>

      <div className="w-poke-viewer relative h-[480px] rounded-2xl left-[150px] overflow-hidden main-item z-40 opacity-50">
        <DetailsRenderer key={slicedItems[1]} ID={slicedItems[slicedItems.length-1]} parentEleHeight={480} />
      </div>
      <div className="w-poke-viewer h-pokemon-details-card-h main-item z-50">
        <DetailsRenderer key={slicedItems[2]} ID={slicedItems[0]} parentEleHeight={573} />
      </div>
      <div className="w-poke-viewer relative h-[480px] rounded-2xl right-[150px] overflow-hidden main-item z-40 opacity-50">
        <DetailsRenderer key={slicedItems[3]} ID={slicedItems[1]} parentEleHeight={480} />
      </div>

      <button onClick={handleRightClick} className="rounded-full size-8 bg-green-500 text-white font-bold">
        &rarr;
      </button>
    </div>
  );
};

export default Carousel;
