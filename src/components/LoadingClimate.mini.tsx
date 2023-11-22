import styled from 'styled-components';
import loadingGif from '/images/loading.gif';
export default function LoadingClimate() {
  return (
    <LoadingClimateImage src={loadingGif} alt="" />
  )
}

const LoadingClimateImage = styled.img`
    filter: blur(1px);
    width: 300px;
    height: 300px;
`;
