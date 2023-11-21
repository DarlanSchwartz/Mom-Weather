import styled from "styled-components";

type MyClimateProps = {
    temperature: number;
    farenheit: boolean;
    image: string;
    temperatureColor: string;
    weather: string;
    date: Date;
}

export default function SidebarClimate({ temperature, farenheit, image, temperatureColor, weather, date }: MyClimateProps) {
    const dateFormatter = new Intl.DateTimeFormat(navigator.language, { weekday: 'long' });
    const dayName = dateFormatter.format(date);
    function addLeadingZero(number: number) {
        return number < 10 ? `0${number}` : number;
    }
    return (
        <MyClimateContainer>
            <TemperatureContainer color={temperatureColor} >
                <img src={image} alt="" />
                <h1>{temperature}<sup>°{farenheit ? "F" : "C"}</sup></h1>
            </TemperatureContainer>
            <h2>{weather}</h2>
            <h3>{date.toLocaleDateString()}</h3>
            <h4>{dayName} {addLeadingZero(date.getHours())}:{addLeadingZero(date.getMinutes())}</h4>
        </MyClimateContainer>
    )
}

type TemperatureContainerProps = {
    color: string;
}

const TemperatureContainer = styled.div<TemperatureContainerProps>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 5%;
    img{
        width: 100%;
        max-width: 4.375rem;
        max-height: 4.375rem;
    }
    h1{
        font-size: 8rem;
        font-style: normal;
        font-weight: 600;
        line-height: 100%;
        color: ${p => p.color};
        font-weight: 300;
        sup{
            font-size: 50%;
            font-style: normal;
            font-weight: 300;
            line-height: 100%;
        }

        @media (max-height: 660px){
            font-size: 6rem;
        }
    }
`;

const MyClimateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    h2{
        width: 100%;
        color: ${({ theme }) => theme.colors.textMainBlack};
        font-size: 32px;
        font-style: normal;
        font-weight: 400;
        line-height: 48px;
        padding-bottom: 30px;
        border-bottom: 1px solid #E0E0E0;
        text-align: center;
        @media (max-height: 660px){
            font-size: 25px;
        }
    }

    h3{
        color: ${({ theme }) => theme.colors.textMainBlack};
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        text-align: center;
        line-height: 24px;
        padding-top: 30px;
    }
    h4{
        color: ${({ theme }) => theme.colors.textMainBlack};
        font-size: 16px;
        font-style: normal;
        text-align: center;
        font-weight: 400;
        line-height: 24px;
    }
`;