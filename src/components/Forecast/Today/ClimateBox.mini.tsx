import styled from "styled-components";
import { ForecastUnit } from "../../../protocols/Application.types";

type ClimateBoxProps = {
    label: string;
    value: number;
    unit: ForecastUnit;
}

export default function ClimateBox({ label, value, unit }: ClimateBoxProps) {
    return (
        <ClimateBoxContainer>
            <h2>{label}</h2>
            <span>{value}{(unit === ForecastUnit.CELSIUS || unit === ForecastUnit.FAHRENHEIT) && '°'}{unit}</span>
        </ClimateBoxContainer>
    )
}

const ClimateBoxContainer = styled.div`
    
    background-color: ${({ theme }) => theme.colors.climateBox};
    color: ${({ theme }) => theme.colors.textWhite};
    max-width: 380px;
    max-height: 100px;
    padding: 24px;
    border-radius: 16px;
    min-width: 209px;
    background: linear-gradient(117deg, ${({ theme }) => theme.colors.climateBox} 22.83%, ${({ theme }) => theme.colors.climateBox} 90.03%);
    display: flex;
    flex-direction: column;
    gap: 10px;
   
    flex-basis: calc(50% - 10px);
    margin: 5px;
    overflow-wrap:unset;

    h2{
        color: ${({ theme }) => theme.colors.textWhite};
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
    }

    span{
        color: ${({ theme }) => theme.colors.textWhite};
        font-weight: 700;
        font-size: 26px;
        line-height: 28px;
    }
    @media (min-height: 900px) and (max-width: 520px){
        max-width: 500px;
        max-height: 180px;
        width:100%;
        height: 100%;
        padding: 45px;
        border-radius: 32px;

        h2{
            font-size: 22px;
            font-weight: 600;
            line-height: 33px;
         }

        span{
            font-size: 48px;
            font-weight: 700;
            line-height: 24px;
        }
    }
    @media (max-width: 520px){
       max-width: 80px;
       padding: 10px;
       border-radius: 16px;
       flex-grow: 0;
       margin: 0;
       min-width: 150px;
       h2{
            font-size: 14px;
            line-height: 18px;
            white-space: nowrap;
        }

        span{
            font-size: 24px;
            line-height: 24px;
            white-space: nowrap;
        }
    }  
    @media (max-width: 750px) and (min-width: 520px){
        max-width: 200px;
        flex-basis: auto;
        padding: 15px;
        border-radius: 16px;

        h2{
            font-size: 14px;
            line-height: 18px;
        }

        span{
            font-size: 24px;
            line-height: 24px;
        }
    }

    @media (max-width: 1360px) and (min-width: 750px){
        max-width: 300px;
        max-height: 80px;
        padding: 15px;
        border-radius: 16px;

        h2{
            font-size: 14px;
            line-height: 18px;
        }

        span{
            font-size: 24px;
            line-height: 24px;
        }
    }
`;