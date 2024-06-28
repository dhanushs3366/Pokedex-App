import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface CarouselProps {
  items: number[];
  active: number;
}

const Carousel: React.FC<CarouselProps> = ({ items, active }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(active);
  const [direction, setDirection] = useState<string>('');

  const generateItems = () => {
    const itemElements: JSX.Element[] = [];
    for (let i = currentIndex - 2; i < currentIndex + 3; i++) {
      let index = i;
      if (i < 0) {
        index = items.length + i;
      } else if (i >= items.length) {
        index = i % items.length;
      }
      const level = currentIndex - i;
      itemElements.push(<Item key={index} id={items[index]} level={level} />);
    }
    return itemElements;
  };

  const moveLeft = () => {
    const newActive = currentIndex - 1;
    setCurrentIndex(newActive < 0 ? items.length - 1 : newActive);
    setDirection('left');
  };

  const moveRight = () => {
    const newActive = (currentIndex + 1) % items.length;
    setCurrentIndex(newActive);
    setDirection('right');
  };

  return (
    <div id="carousel" className="noselect">
      <div className="arrow arrow-left" onClick={moveLeft}>
        <i className="fi-arrow-left"></i>
      </div>
      <TransitionGroup className="carousel-container" component={null}>
        {generateItems().map((item, index) => (
          <CSSTransition
            key={index}
            timeout={500}
            classNames={direction}
          >
            {item}
          </CSSTransition>
        ))}
      </TransitionGroup>
      <div className="arrow arrow-right" onClick={moveRight}>
        <i className="fi-arrow-right"></i>
      </div>
    </div>
  );
};

interface ItemProps {
  id: number;
  level: number;
}

const Item: React.FC<ItemProps> = ({ id, level }) => {
  const className = `item level${level}`;
  return <div className={className}>{id}</div>;
};

export default Carousel;
