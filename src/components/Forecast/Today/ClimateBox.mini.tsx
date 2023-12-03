import styled from "styled-components";
import { ForecastUnit } from "../../../protocols/Application.types";

type ClimateBoxProps = {
    label: string;
    value: number;
    unit: ForecastUnit;
};

export default function ClimateBox({ label, value, unit }: ClimateBoxProps) {
    return (
        <ClimateBoxContainer>
            <h2>{label}</h2>
            <span>{value}{(unit === ForecastUnit.CELSIUS || unit === ForecastUnit.FAHRENHEIT) && '°'}{unit}</span>
        </ClimateBoxContainer>
    );
}

const ClimateBoxContainer = styled.div`
    
    background-color: ${({ theme }) => theme.colors.climateBox};
    color: ${({ theme }) => theme.colors.textWhite};
    width:100%;
    max-width: calc(100% - 20px);
    max-height: 180px;
    padding: 24px;
    border-radius: 16px;
    min-width: 150px !important;
    background: linear-gradient(117deg, ${({ theme }) => theme.colors.climateBox} 22.83%, ${({ theme }) => theme.colors.climateBox} 90.03%);
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-shrink: 0;
    
   
    flex-basis: calc(50% - 20px);
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
      
       padding: 15px;
       border-radius: 16px;
       flex-grow: 0;
       margin: 0;
       min-width: 150px;
       padding-right: 0;
       width: 100%;
       h2{
            font-size: 12px;
            line-height: 18px;
            white-space: nowrap;
        }

        span{
            font-size: 18px;
            line-height: 18px;
            white-space: nowrap;
        }
    }  
    @media (max-width: 770px) and (min-width: 520px){
       
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

    @media (max-width: 1366px) and (min-width: 750px){
       
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
    @media (max-width: 2500px) and (min-width: 1366px){
        max-width: 600px;
    }   
`;