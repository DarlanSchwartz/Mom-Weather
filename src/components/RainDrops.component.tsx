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

export default function Rain({ dropCount }: RainProps) {
  const [drops, setDrops] = useState<Drop[]>([]);
  const size = useWindowSize();
  function startRain() {
    const newDrops: Drop[] = [];
    for (let i = 1; i < dropCount; i++) {
      const dropLeft = randRange(0, size.width || 2000);
      const dropTop = randRange(-1000, size.height || 1000);
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

  return (
    <RainContainer>
      {drops.map((drop) => (
        <RainDrop key={drop.id} className="drop" style={{ left: `${drop.left}px`, top: `${drop.top}px` }} />
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
    to {margin-top:900px;}
  }
`;

const RainDrop = styled.div`
  background:-webkit-gradient(linear,0% 0%,0% 100%, from(${({ theme }) => theme.colors.rainColor1}), to(${({ theme }) => theme.colors.rainColor2}));
  background: -moz-linear-gradient(top, ${({ theme }) => theme.colors.rainColor1} 0%, ${({ theme }) => theme.colors.rainColor2} 100%);
  background: -webkit-linear-gradient(top,  ${({ theme }) => theme.colors.rainColor1} 0%,${({ theme }) => theme.colors.rainColor2} 100%);
	width:1px;
	height:89px;
	position: absolute;
	bottom:200px;
	-webkit-animation: fall .63s linear infinite;
  -moz-animation: fall .63s linear infinite;
  animation: fall .63s linear infinite;
  overflow: hidden;
`;