import styled from 'styled-components';
import { Weather } from '../../../protocols/Application.types';

export default function ForecastMap({ weather, useFarhenheit, width, heigth }: { weather: Weather, useFarhenheit: boolean, width: string, heigth: string; }) {
    return (
        <IframeContainer width={width} height={heigth} src={
            `https://embed.windy.com/embed2.html?lat=${weather.latitude}&lon=${weather.longitude}&detailLat=${weather.latitude}&detailLon=${weather.longitude}&width=${width.replace("%", "")}&height=${heigth.replace("%", "")}&zoom=9&level=surface&overlay=temp&product=ecmwf&menu=&message=""&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=${useFarhenheit ? "mph" : "m%2Fs"}&metricTemp=${useFarhenheit ? "%C2%B0F" : "%C2%B0C"}&radarRange=-1`
        }></IframeContainer>
    );
}

const IframeContainer = styled.iframe`
    padding-right: 30px;
    height: 100% !important;
    min-height: 300px !important;
    height:calc(100% - 500px)!important;
    @media (max-width: 660px){
        padding: 0;
        height:auto !important;
    }
`;