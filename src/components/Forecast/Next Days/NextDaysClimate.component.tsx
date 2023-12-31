
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { APIForecastResponse } from '../../../protocols/WeatherAPI.types';
import { convertCelciusToFarenheit, formatDateString } from '../../../utils/utils';
import styled from 'styled-components';
import ThemeContext from '../../../contexts/Theme.context';
import { useContext } from 'react';
import { DarkColors, LightColors } from '../../../styles/Colors';

export default function NextDaysClimate({ forecast, useFarheinheit }: { forecast: APIForecastResponse[], useFarheinheit: boolean; }) {
    const { darkModeEnabled } = useContext(ThemeContext);
    function formatForecastData() {
        return forecast.map((item) => {
            return {
                weekDay: formatDateString(item.dt_txt, navigator.language, { weekday: 'long' }),
                temperature: useFarheinheit ? convertCelciusToFarenheit(item.main.temp) : item.main.temp,
            };
        });
    }
    return (
        <NextDaysClimateContainer>
            <ResponsiveContainer width="100%" height="100%" className="chart-container">
                <LineChart
                    width={500}
                    height={300}
                    data={formatForecastData()}
                    margin={{
                        top: 5,
                        right: 50,
                        left: 10,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="0 0" fill={darkModeEnabled ? DarkColors.backgroundLight : LightColors.backgroundLight} />
                    <XAxis
                        dataKey="weekDay"
                        allowDuplicatedCategory={true}
                        tickCount={8}
                        tickMargin={5}
                        tickSize={10}
                        minTickGap={60}
                        tick={{
                            stroke: darkModeEnabled ? DarkColors.chartTickText : LightColors.chartTickText,
                            strokeWidth: 0.1
                        }}
                    />
                    <YAxis
                        domain={[0, 'dataMax + 5']}
                        allowDecimals={false}
                        tickFormatter={(value) => `${Math.round(Number(value))}°${useFarheinheit ? "F" : "C"}`}
                        tick={{
                            stroke: darkModeEnabled ? DarkColors.chartTickText : LightColors.chartTickText,
                            strokeWidth: 0.1
                        }}
                    />
                    <Tooltip
                        viewBox={{ x: 0, y: 0, width: 400, height: 400 }}
                        formatter={(value: string) => [<span style={{ marginTop: '20px' }}>{`${value} °${useFarheinheit ? "F" : "C"}`}</span>]}
                        wrapperStyle={{
                            height: '100px'
                        }}
                    />

                    <Line type="monotone" dataKey="temperature" stroke={LightColors.climateBox} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </NextDaysClimateContainer>
    );
}

const NextDaysClimateContainer = styled.div`
    width: 100%;
    height: 100% !important;
    padding-right: 30px;
    
    @media (max-width: 660px){
        padding-right: 0;
        height: 100% !important;
        min-height: 300px !important;
        flex-shrink: 0;
    }

    .chart-container{
        background-color: ${({ theme }) => theme.colors.backgroundLight};
        padding-top: 40px;
        padding-bottom: 40px;
        border: 1px solid ${({ theme }) => theme.colors.chartBorder};
        height: calc(100% - 19px) !important;
        min-height: 300px !important;
        @media (max-width: 660px){
            border: 0;
            height: 100%;
        }

        @media (max-width: 1366px) and (min-width: 660px){
            border: 0;
            height: 100%;
        }
        @media (min-width: 1400px){
            max-height: 450px !important;
        }
    }
    
    .recharts-default-tooltip{
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 30px;
		justify-content: center;
		background-color: ${({ theme }) => theme.colors.backgroundLight} !important;
        border: 0 !important;
        border-radius: 5px !important;
        p{
            color: ${({ theme }) => theme.colors.textMainBlack};
        }
        span{
            color: ${({ theme }) => theme.colors.climateBox};
        }
	}
`;