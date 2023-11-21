import styled from "styled-components";
import { ForecastUnit } from "../protocols/Application.types";

type ClimateBoxProps = {
    label: string;
    value: number;
    unit: ForecastUnit;
}

export default function ClimateBox({ label, value, unit }: ClimateBoxProps) {
    return (
        <ClimateBoxContainer>
            <h2>{label}</h2>
            <span>{value}{unit == ForecastUnit.CELSIUS && '°'}{unit}</span>
        </ClimateBoxContainer>
    )
}

const ClimateBoxContainer = styled.div`
    width:100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.climateBox};
    color: ${({ theme }) => theme.colors.textWhite};
    max-width: 500px;
    max-height: 180px;
    border-radius: 32px;
    background: linear-gradient(117deg, ${({ theme }) => theme.colors.climateBox} 22.83%, ${({ theme }) => theme.colors.climateBox} 90.03%);

    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 45px;

    h2{
        color: ${({ theme }) => theme.colors.textWhite};
        font-size: 22px;
        font-weight: 600;
        line-height: 36px;
    }

    span{
        color: ${({ theme }) => theme.colors.textWhite};
        font-size: 48px;
        font-weight: 700;
        line-height: 24px;
    }

    @media (max-width: 1360px){
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
