import styled from "styled-components";
import { addLeadingZero, capitalizeWords, convertCelciusToFarenheit } from "../../utils/utils";
import { useWindowSize } from "@uidotdev/usehooks";

type MyClimateProps = {
    temperature: number;
    farenheit: boolean;
    image: string;
    temperatureColor: string;
    weatherDescription: string;
    date: Date;
}

export default function SidebarClimate({ temperature, farenheit, image, temperatureColor, weatherDescription, date }: MyClimateProps) {
    const dateFormatter = new Intl.DateTimeFormat(navigator.language, { weekday: 'long' });
    const dayName = capitalizeWords(dateFormatter.format(date));
    const size = useWindowSize();
    return (
        <MyClimateContainer>
            {
                image && temperature !== undefined && temperature !== null && weatherDescription && temperatureColor &&
                <>
                    <TemperatureContainer $color={temperatureColor} >
                        <img src={image} alt="" />
                        <h1>{farenheit ? convertCelciusToFarenheit(temperature) : temperature}<sup>°{farenheit ? "F" : "C"}</sup></h1>
                    </TemperatureContainer>
                    <h2>{weatherDescription}</h2>
                    <h3>{date.toLocaleDateString()}</h3>
                    <h4>{(size && size.width !== null && size.width > 1060 )? dayName : dayName.slice(0,3)} {addLeadingZero(date.getHours())}:{addLeadingZero(date.getMinutes())}</h4>
                </>
            }
        </MyClimateContainer>
    )
}

type TemperatureContainerProps = {
    $color: string;
}

const TemperatureContainer = styled.div<TemperatureContainerProps>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 5%;
    @media (max-width: 660px){
        margin-top: 0;
        flex-direction: row;
        width: fit-content;
    } 
    @media (max-width: 1060px) and (min-width: 660px){
        flex-direction: column;
    }
    img{
        width: 100%;
        max-width: 9.375rem;
        max-height: 9.375rem;
        @media (max-width: 660px){
            width: 60px;
            height: 60px;
            flex-shrink: 0;
        }
        @media (max-width: 1060px) and (min-width: 660px){
            max-width: 5rem;
            max-height: 5rem;
        }
        @media (max-width: 1200px){
            max-width: 7.375rem;
            max-height: 7.375rem;
        }
    }
    h1{
        font-size: 8rem;
        font-style: normal;
        font-weight: 600;
        line-height: 100%;
        color: ${p => p.$color};
        font-weight: 300;
        sup{
            font-size: 50%;
            font-style: normal;
            font-weight: 300;
            line-height: 100%;
        }
       
        @media (max-width: 1061px){
            font-size: 30px;
        }

        @media (max-width: 1200px) and (min-width: 1061px){
            font-size: 90px;
        }

        @media (min-height: 950px) and (min-width: 1360px){
            font-size: 150px;
            margin-top: 0px;
            sup{
                font-size: 120px;
            }
        }
    }
`;

const MyClimateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    @media (max-width: 660px){
        flex-direction: row;
        width: fit-content;
    } 

    h2{
        width: 100%;
        color: ${({ theme }) => theme.colors.textMainBlack};
        font-size: 32px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
        padding-bottom: 30px;
        border-bottom: 3px solid #E0E0E0;
        text-align: center;
        max-width: 420px;
       
        @media (max-width: 1060px){
           display: none;
        }
        @media (max-width: 1200px)  and (min-width: 1060px){
            font-size: 28px;
        }
        @media (max-height: 660px){
            font-size: 25px;
        }

        @media (min-height: 950px) and (min-width: 1360px){
            font-size: 32px;
            margin-top: 50px;
        }
    }

    h3{
        color: ${({ theme }) => theme.colors.textMainBlack};
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        text-align: center;
        line-height: 100%;
        padding-top: 30px;
        @media (max-width: 660px){
            display: none;
        }
        @media (max-width: 1060px) and (min-width: 660px){
            font-size: 12px;
        }
        @media (max-width: 1200px) and (min-width: 1060px){
            font-size: 16px;
        }
        @media (min-height: 950px) and (min-width: 1360px){
            font-size: 24px;
            margin-top: 50px;
        }
    }
    h4{
       
        color: ${({ theme }) => theme.colors.textMainBlack};
        font-size: 20px;
        font-style: normal;
        text-align: center;
        font-weight: 400;
        line-height: 100%;
        margin-top: 6px;

        @media (max-width: 660px){
            display: none;
        }

        @media (max-width: 1060px) and (min-width: 660px){
            font-size: 13px;
            line-height: 18px;
        }

        @media (max-width: 1200px) and (min-width: 1060px){
            font-size: 16px;
        }
        @media (min-height: 950px) and (min-width: 1360px){
            font-size: 24px;
            margin-top: 9px;
        }
    }
`;