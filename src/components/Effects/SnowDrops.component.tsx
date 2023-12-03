import { useWindowSize } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Drop {
  id: number;
  left: number;
  top: number;
  width: string;
  height: string;
  image: string;
}

const SNOW_FLAKE_IMAGE = "/images/snowflake.png";
const BLURP_IMAGE = "/images/blurp.png";
const BLURP2_IMAGE = "/images/blurp2.png";
const SNOW_IMAGES = [
  BLURP_IMAGE,
  BLURP_IMAGE,
  BLURP2_IMAGE,
  BLURP2_IMAGE,
  SNOW_FLAKE_IMAGE,
  SNOW_FLAKE_IMAGE,
  SNOW_FLAKE_IMAGE,
  SNOW_FLAKE_IMAGE,
  SNOW_FLAKE_IMAGE,
  SNOW_FLAKE_IMAGE,
  SNOW_FLAKE_IMAGE,
  SNOW_FLAKE_IMAGE,
  SNOW_FLAKE_IMAGE,
  SNOW_FLAKE_IMAGE,
];
export default function SnowDrops({ snowCount }: { snowCount: number; }) {
  const [snowflakes, setSnowflakes] = useState<Drop[]>([]);
  const windowSize = useWindowSize();
  function startSnow() {
    const newSnowflakes: Drop[] = [];
    for (let id = 1; id < snowCount; id++) {
      const left = randRange(0, windowSize.width || 2000);
      const top = randRange(windowSize && windowSize.height ? windowSize.height : -1000, windowSize.height || 1000);
      const size = `${Math.floor(randRange(5, 8))}px`;
      newSnowflakes.push({
        id,
        left,
        top,
        width: size,
        height: size,
        image: SNOW_IMAGES[Math.floor(Math.random() * SNOW_IMAGES.length)]
      });
    }
    setSnowflakes(newSnowflakes);
  }

  function randRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    startSnow();
    return () => setSnowflakes([]);
  }, [snowCount]);

  return (
    <RainContainer>
      {snowflakes.map((drop) => (
        <RainDrop
          key={drop.id}
          src={drop.image}
          draggable={false}
          style={{
            left: `${drop.left}px`,
            top: `${drop.top}px`,
            width: drop.width,
            height: drop.height,
            opacity: randRange(0.6, 0.8),
            animationDuration: `${randRange(10, 20)}s`,
          }}

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