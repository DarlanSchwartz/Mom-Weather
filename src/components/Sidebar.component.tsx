import styled from 'styled-components';
import Logo from './Logo.mini';
import { CiSearch } from "react-icons/ci";
import SidebarClimate from './SidebarClimate.component';
import { useContext } from 'react';
import Toggle from './Toggle.mini';
import ThemeContext from '../contexts/Theme.context';
import ApplicationContext from '../contexts/Application.context';
import { useState } from 'react';

export default function Sidebar() {
    const { darkModeEnabled, enableDarkMode, disableDarkMode } = useContext(ThemeContext);
    const { currentWeather, useFarhenheit, setUseFarhenheit, searchWeather } = useContext(ApplicationContext);
    const [cityName, setCityName] = useState<string>("");
    return (
        <SidebarContainer>
            <MainContent>
                <Logo />
                <SearchForm onSubmit={(e) => {
                    e.preventDefault();
                    searchWeather(cityName);
                }}>
                    <div className='input-container'>
                        <CiSearch className="icon" />
                        <SearchInput
                            type="text"
                            placeholder="Procure por uma cidade"
                            autoFocus
                            id='city'
                            name='city'
                            lang={navigator.language}
                            value={cityName}
                            onChange={(e) => setCityName(e.currentTarget.value)}
                            autoComplete='on'
                        />
                    </div>
                </SearchForm>
                <SidebarClimate
                    date={new Date()}
                    farenheit={useFarhenheit}
                    image={currentWeather.icon}
                    temperature={currentWeather.currentTemperature}
                    weatherDescription={currentWeather.description}
                    temperatureColor={currentWeather.color}
                />
            </MainContent>
            <BottomContent>
                <ActionsContainer>
                    <ToggleContainer>
                        <Toggle
                            enabled={useFarhenheit}
                            onToggle={setUseFarhenheit}
                        />
                        <span>°F</span>
                    </ToggleContainer>
                    <ToggleContainer>
                        <Toggle
                            enabled={darkModeEnabled}
                            onToggle={() => {
                                if (darkModeEnabled) disableDarkMode();
                                else enableDarkMode();
                            }}
                        />
                        <span>Dark Mode</span>
                    </ToggleContainer>
                </ActionsContainer>
                <CopyrightText>Todos os direitos reservados. {new Date().getFullYear()}.</CopyrightText>
            </BottomContent>
        </SidebarContainer>
    )
}

const MainContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BottomContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const ToggleContainer = styled.div`
    display: flex;
    gap: 5%;
    width: 100%;
    justify-content: center;
    span{
        color: ${({ theme }) => theme.colors.textMainBlack};
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
        width: 130px;

        @media (max-width: 1060px){
           display: none;
        }

        @media (max-width: 1200px){
            font-size: 16px;
        }

        @media (min-height: 660px) and (min-width: 1360px){
            font-size: 20px;
        }

        @media (min-height: 950px) and (min-width: 1360px){
            font-size: 24px;
        }
    }
`;

const ActionsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 40px;

    @media (min-height: 950px) and (min-width: 1360px){
        gap: 30px;
    }

    @media (min-height: 1000px){
        margin-bottom: 60px;
    }
`;

const SidebarContainer = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 34.63%;
    min-height: 100dvh;
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    color: #fff;
    padding: 20px;
    min-width: 370px;

    @media (max-width: 1060px){
        width: 80px;
        min-width: 80px;
    }
`;

const SearchForm = styled.form`
    width: 100%;
    margin-top: 20px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .input-container{
        width: 100%;
        max-width: 500px;
        position: relative;
        display: flex;
        justify-content: center;
        @media (min-height: 950px) and (min-width: 1360px){
            margin-top: 40px;
        }
    }
    .icon{
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #8B9CAF;
        font-size: 25px;
    }
`;
const SearchInput = styled.input`
    width: 100%;
    height: 60px;
    border-radius: 20px;
    box-shadow: 0px 24px 48px 0px ${({ theme }) => theme.colors.sidebarInputBoxshadow};
    padding-left: 45px;
    border: 0;
    background-color: ${({ theme }) => theme.colors.searchBackground};
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    font-family: 'Montserrat', sans-serif;
    max-width: 500px;
    color: ${({ theme }) => theme.colors.textMainBlack};
    &::placeholder{
        color: ${({ theme }) => theme.colors.inputPlaceholder};
    }
    @media (max-width: 1200px){
        font-size: 16px;
    }
`;

const CopyrightText = styled.span`
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    color: ${({ theme }) => theme.colors.textMainBlack};
    @media (max-width: 1060px){
           display: none;
        }
    @media (max-width: 1200px){
        font-size: 16px;
    }
    @media (min-height: 950px) and (min-width: 1360px){
        font-size: 24px;
    }
`;