import { useWindowSize } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface RainProps {
  dropCount: number;
}

interface Drop {
  id: string;
  left: number;
  top: number;
}

export default function SnowDrops({ dropCount }: RainProps) {
  const [drops, setDrops] = useState<Drop[]>([]);
  const windowSize = useWindowSize();
  function startRain() {
    const newDrops: Drop[] = [];
    for (let i = 1; i < dropCount; i++) {
      const dropLeft = randRange(0, windowSize.width || 2000);
      const dropTop = randRange(-1000, windowSize.height || 1000);
      newDrops.push({ id: `drop${i}`, left: dropLeft, top: dropTop });
    }
    setDrops(newDrops);
  }

  function stopRain() {
    setDrops([]);
  }

  function randRange(minNum: number, maxNum: number) {
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  }

  useEffect(() => {
    startRain();
    return () => stopRain();
  }, [dropCount]);

  function getRandomImage() {
    const images = [
      "https://static.vecteezy.com/system/resources/thumbnails/028/536/500/small/simple-white-circle-and-drop-shadow-png.png",
      "https://openweathermap.org/img/wn/13n@2x.png",
      "https://openweathermap.org/img/wn/13n@2x.png",
      "https://openweathermap.org/img/wn/13n@2x.png",
      "https://openweathermap.org/img/wn/13n@2x.png",
    ];
    return images[Math.floor(Math.random() * images.length)];
  }

  function getRandomOpacity() {
    const opacity = ["0.2", "0.4", "0.6", "0.8"];
    return opacity[Math.floor(Math.random() * opacity.length)];
  }

  function getRandomSize() {
    const sizes = ["30px", "40px", "50px"];
    let size = sizes[Math.floor(Math.random() * sizes.length)];
    return { width: size, height: size };
  }

  return (
    <RainContainer>
      {drops.map((drop) => (
        <RainDrop key={drop.id} src={getRandomImage()}
          className="drop"
          style={{
            left: `${drop.left}px`,
            top: `${drop.top}px`,
            ...getRandomSize(),
            opacity: getRandomOpacity(),
            animationDuration: `${randRange(10, 20)}s`,
          }} 
          draggable={false}
          />
      ))}
    </RainContainer>
  );
}

const RainContainer = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  @-webkit-keyframes fall {
    to {margin-top:900px;}
  }
  @-moz-keyframes fall {
    to {margin-top:900px;}
  }

  @keyframes fall {
    to {
      margin-top:900px;
      opacity: 0;
    }
  }
`;

const RainDrop = styled.img`
	position: absolute;
  filter: brightness(0) invert(1);
	bottom:200px;
	-webkit-animation: fall 15.63s linear infinite;
  -moz-animation: fall 15.63s linear infinite;
  animation: fall 15.63s linear infinite;
  overflow: hidden;
  user-select: none;
`;