import { useWindowSize } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { randomRange } from '../../utils/utils';

interface SnowFlake {
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
  const [snowflakes, setSnowflakes] = useState<SnowFlake[]>([]);
  const windowSize = useWindowSize();
  function startSnow() {
    const newSnowflakes: SnowFlake[] = [];
    for (let id = 1; id < snowCount; id++) {
      const left = randomRange(0, windowSize.width || 2000);
      const top = randomRange(windowSize && windowSize.height ? windowSize.height : -1000, windowSize.height || 1000);
      const size = `${randomRange(5, 8)}px`;
      newSnowflakes.push({
        id,
        left,
        top,
        width: size,
        height: size,
        image: SNOW_IMAGES[randomRange(0, SNOW_IMAGES.length - 1)]
      });
    }
    setSnowflakes(newSnowflakes);
  }

  useEffect(() => {
    startSnow();
    return () => setSnowflakes([]);
  }, [snowCount]);

  return (
    <SnowContainer>
      {snowflakes.map((drop) => (
        <SnowFlake
          key={drop.id}
          src={drop.image}
          draggable={false}
          style={{
            left: `${drop.left}px`,
            top: `${drop.top}px`,
            width: drop.width,
            height: drop.height,
            opacity: randomRange(0.6, 0.8),
            animationDuration: `${randomRange(10, 20)}s`,
          }} />
      ))}
    </SnowContainer>
  );
}

const SnowContainer = styled.div`
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

const SnowFlake = styled.img`
	position: absolute;
  filter: brightness(0) invert(1);
	bottom:200px;
	-webkit-animation: fall 15.63s linear infinite;
  -moz-animation: fall 15.63s linear infinite;
  animation: fall 15.63s linear infinite;
  overflow: hidden;
  user-select: none;
`;