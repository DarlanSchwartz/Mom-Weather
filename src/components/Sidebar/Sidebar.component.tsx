import styled from 'styled-components';
import Logo from './Logo.mini';
import { CiSearch } from "react-icons/ci";
import SidebarClimate from './SidebarClimate.component';
import { useContext } from 'react';
import Toggle from './Toggle.mini';
import ThemeContext from '../../contexts/Theme.context';
import ApplicationContext from '../../contexts/Application.context';
import { useState , useEffect } from 'react';
import LoadingClimate from '../LoadingClimate.mini';
import { useWindowSize } from '@uidotdev/usehooks';
import { IoSearchOutline } from "react-icons/io5";
import 'animate.css';

export default function Sidebar() {
    const { darkModeEnabled, enableDarkMode, disableDarkMode } = useContext(ThemeContext);
    const { currentWeather, useFarhenheit, setUseFarhenheit, searchWeather, loading , cityName, setCityName } = useContext(ApplicationContext);
    const [searchEnabled, setSearchEnabled] = useState<boolean>(false);
    const [isFocusedSearch, setIsFocusedSearch] = useState<boolean>(false);
    const [currentClassName, setCurrentClassName] = useState<string>("");
    const size = useWindowSize();
    function openModal() {
        setSearchEnabled(true);
        setCurrentClassName("");
    }
    function closeModal() {
        setCurrentClassName("animate__animated animate__fadeOut");
        setTimeout(() => {
            setSearchEnabled(false);
            setCurrentClassName("");
        }, 1000);
    }

    useEffect(() => {
      if(size && size.width !== null && size.width <= 660){
        closeModal();
      }
    }, [size])
    

    return (
        <SidebarContainer>
            <MainContent>
                <Logo />

                {
                    (size && size.width !== null && !(size.width <= 1140 && size.width >= 660)) &&
                    <SearchForm onSubmit={(e) => {
                        e.preventDefault();
                        searchWeather();
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
                                onFocus={() => setIsFocusedSearch(true)}
                                onBlur={() => setIsFocusedSearch(false)}
                            />
                        </div>
                    </SearchForm>
                }
                {
                    loading ?
                        <>
                            {
                                (size && size.width !== null && size.width > 1140) &&
                                <LoadingClimate />
                            }
                        </>
                        :
                        <>
                            {
                                (!isFocusedSearch || (size && size.width !== null && size.width > 660)) &&
                                < SidebarClimate
                                    key={new Date().getTime()}
                                    date={new Date()}
                                    farenheit={useFarhenheit}
                                    image={currentWeather.icon}
                                    temperature={currentWeather.currentTemperature}
                                    weatherDescription={currentWeather.description}
                                    temperatureColor={currentWeather.color}
                                />
                            }
                        </>
                }
                {
                    (size && size.width !== null && size.width <= 1140 && size.width >= 660) &&
                    <IoSearchOutline
                        className="icon-search"
                        onClick={openModal}
                    />
                }
                {
                    searchEnabled &&
                    <ModalSearch className={currentClassName} onSubmit={(e) => {
                        e.preventDefault();
                        searchWeather();
                        closeModal();
                    }}
                        onClick={closeModal}>
                        <input
                            type="text"
                            className='animate__animated animate__bounceInLeft'
                            placeholder='Procure por uma cidade, estado , país ou continente'
                            value={cityName}
                            onChange={(e) => setCityName(e.currentTarget.value)}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                        />
                    </ModalSearch>
                }
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

const ModalSearch = styled.form`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;
    background-color: rgba(0,0,0,0.8);
    z-index: 999;
    display: flex;
    padding: 20px;
    input {
        border-radius: 20px;
        width: 100%;
        padding: 10px;
        border: 0;
        flex-grow: 0;
        height: 50px;
    }
`;

const MainContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon-search{
        font-size: 32px;
        box-sizing: border-box;
        margin-top: 20px;
        margin-bottom: 10px;
        color: ${({ theme }) => theme.colors.textMainBlack};
        cursor: pointer;
    }
    @media (max-width: 660px){
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100vw;
        gap: 20px;
    } 
`;

const BottomContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    @media (max-width: 660px){
        display: none;
    }
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

        @media (max-width: 1140px){
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

    @media (max-width: 660px){
        width: 100%;
        min-width: auto;
        flex-direction: row;
        max-width: 100%;
        max-height: 80px;
        height: 80px;
        min-height: 80px;
        transition: all 200ms;
    }

    @media (max-width: 1140px) and (min-width: 660px){
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
    
    @media (max-width: 660px){
        margin-top: 0;
        min-width: 100px;
        transition: all 200ms;
    } 
    .input-container{
        width: 100%;
        max-width: 500px;
        position: relative;
        display: flex;
        justify-content: center;
        @media (min-height: 950px) and (min-width: 1360px){
            margin-top: 40px;
        }

        @media (max-width: 660px){
            margin-top: 0;
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
    transition: all 200ms;
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
    @media (max-width: 1140px){
        display: none;
    }
    @media (max-width: 1200px) and (min-width: 1140px){
        font-size: 16px;
    }
    @media (min-height: 950px) and (min-width: 1200px){
        font-size: 24px;
    }
`;