import styled from 'styled-components';
import Logo from './Logo.mini';
import { CiSearch } from "react-icons/ci";
import SidebarClimate from './SidebarClimate.component';
import { useContext } from 'react';
import Toggle from './Toggle.mini';
import ThemeContext from '../../contexts/Theme.context';
import ApplicationContext from '../../contexts/Application.context';
import { useState, useEffect } from 'react';
import LoadingClimate from '../LoadingClimate.mini';
import { useWindowSize } from '@uidotdev/usehooks';
import { IoSearchOutline } from "react-icons/io5";
import 'animate.css';
import { FaMoon } from 'react-icons/fa';
import { LuSunMoon } from 'react-icons/lu';
import { TbTemperatureFahrenheit } from "react-icons/tb";
import { TbTemperatureCelsius } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import ApplicationModal from '../ApplicationModal.modal';
import { SidebarInput } from './SearchInput.styled';
import { ModalSearchInput } from '../ModalInput.styled';
import { CopyrightText } from './CopyrightText.styled';
import { FaCog } from "react-icons/fa";
export default function Sidebar() {
    const { darkModeEnabled, enableDarkMode, disableDarkMode } = useContext(ThemeContext);
    const { currentWeather, useFarhenheit, setUseFarhenheit, searchWeather, loading, cityName, setCityName } = useContext(ApplicationContext);
    const [searchEnabled, setSearchEnabled] = useState<boolean>(false);
    const [isFocusedSearch, setIsFocusedSearch] = useState<boolean>(false);
    const [currentClassName, setCurrentClassName] = useState<string>("");
    const [mobileConfigEnabled, setMobileConfigEnabled] = useState<boolean>(false);
    
    const windowSize = useWindowSize();
    const [closingModal, setClosingModal] = useState<boolean>(false);
    function openModalMobileConfig() {
        setMobileConfigEnabled(true);
        setCurrentClassName("animate__animated animate__fadeIn");
    }
    function openModalSearch() {
        setSearchEnabled(true);
        setCurrentClassName("animate__animated animate__fadeIn");
    }

    function searchWeatherViaModal(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        searchWeather();
        closeModal();
    }

    function closeModal() {
        if (closingModal) return;
        setCurrentClassName("animate__animated animate__fadeOut");
        setClosingModal(true);
        setTimeout(() => {
            setSearchEnabled(false);
            setMobileConfigEnabled(false);
            setCurrentClassName("");
            setClosingModal(false);
        }, 1000);
    }

    useEffect(() => {
        if (windowSize && windowSize.width !== null && windowSize.width <= 660) {
            closeModal();
        }
    }, [windowSize])

    return (
        <SidebarContainer>
            <MainContent>
                {
                    (windowSize && windowSize.width && windowSize.width > 660 || (windowSize && windowSize.width && windowSize.width <= 660 && !isFocusedSearch)) &&
                    <Logo />
                }
                {
                    !isFocusedSearch && (windowSize && windowSize.width !== null && windowSize.width <= 660) &&
                    <CiSearch
                        className="icon-search-mobile"
                        onClick={() => setIsFocusedSearch(!isFocusedSearch)}
                    />
                }
                {
                    ((isFocusedSearch && windowSize && windowSize.width !== null && !(windowSize.width <= 1140 && windowSize.width >= 660)) || windowSize && windowSize.width && windowSize.width > 1140) &&
                    <SearchForm onSubmit={(e) => {
                        e.preventDefault();
                        searchWeather();
                    }}>
                        <div className='input-container'>
                            <CiSearch className="icon" />
                            <SidebarInput
                                type="text"
                                placeholder="Procure por uma cidade"
                                autoFocus
                                id='city'
                                name='city'
                                lang={navigator.language}
                                value={cityName}
                                onChange={(e) => setCityName(e.currentTarget.value)}
                                autoComplete='on'
                                onBlur={() => setIsFocusedSearch(false)}
                            />
                        </div>
                    </SearchForm>
                }
                {
                    loading ?
                        <>
                            {
                                (windowSize && windowSize.width !== null && windowSize.width > 1140) &&
                                <LoadingClimate />
                            }
                        </>
                        :
                        <>
                            {
                                (!isFocusedSearch || (windowSize && windowSize.width !== null && windowSize.width > 660)) &&
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
                    (windowSize && windowSize.width !== null && windowSize.width <= 1140 && windowSize.width >= 660) &&
                    <IoSearchOutline
                        className="icon-search"
                        onClick={openModalSearch}
                    />
                }
                {
                    (windowSize && windowSize.width !== null && windowSize.width <= 660) &&
                    <RxHamburgerMenu
                        className="hamburger-menu"
                        onClick={openModalMobileConfig}
                    />
                }
                {
                    searchEnabled &&
                    <ApplicationModal
                        className={currentClassName}
                        onSubmit={searchWeatherViaModal}
                        onClick={closeModal}>
                        <ModalSearchInput
                            type="text"
                            className='animate__animated animate__bounceInLeft'
                            placeholder='Procure por uma cidade, estado , país ou continente'
                            value={cityName}
                            onChange={(e) => setCityName(e.currentTarget.value)}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                        />
                    </ApplicationModal>
                }
                {
                    windowSize && windowSize.width !== null && windowSize.width <= 660 &&
                    mobileConfigEnabled &&
                    <ApplicationModal
                        className={currentClassName}
                        onSubmit={(e) => e.preventDefault()}
                        onClick={closeModal}>
                        <MobileConfigContainer onClick={(e)=> e.stopPropagation()}>
                            <h1><FaCog className="config-icon" />Configuração</h1>
                            <ToggleContainer className='toogle-config' onClick={(e) => e.stopPropagation()}>
                                <Toggle
                                    enabled={useFarhenheit}
                                    onToggle={setUseFarhenheit}
                                    enabledIcon={windowSize && windowSize.width !== null && windowSize.width <= 1140 ?
                                        <TbTemperatureFahrenheit size={18} /> : undefined
                                    }
                                    disabledIcon={windowSize && windowSize.width !== null && windowSize.width <= 1140 ?
                                        <TbTemperatureCelsius size={18} /> : undefined
                                    }
                                    useBackground={true}
                                />
                                <p>{useFarhenheit ? "Fahrenheit" : "Celsius"}</p>

                            </ToggleContainer>
                            <ToggleContainer className='toogle-config'  onClick={(e) => e.stopPropagation()}>
                                <Toggle
                                    enabled={darkModeEnabled}
                                    enabledIcon={windowSize && windowSize.width !== null && windowSize.width <= 1140 ?
                                        <FaMoon size={18} /> : undefined
                                    }
                                    disabledIcon={windowSize && windowSize.width !== null && windowSize.width <= 1140 ?
                                        <LuSunMoon size={18} /> : undefined
                                    }
                                    onToggle={() => {
                                        if (darkModeEnabled) disableDarkMode();
                                        else enableDarkMode();
                                    }}
                                />
                                <p>Dark Mode</p>
                            </ToggleContainer>
                        </MobileConfigContainer>
                    </ApplicationModal>
                }

            </MainContent>
            <BottomContent>
                <ActionsContainer>
                    <ToggleContainer>
                        <Toggle
                            enabled={useFarhenheit}
                            onToggle={setUseFarhenheit}
                            enabledIcon={windowSize && windowSize.width !== null && windowSize.width <= 1140 ?
                                <TbTemperatureFahrenheit size={18} /> : undefined
                            }
                            disabledIcon={windowSize && windowSize.width !== null && windowSize.width <= 1140 ?
                                <TbTemperatureCelsius size={18} /> : undefined
                            }
                            useBackground={true}
                        />
                        <span>°F</span>
                    </ToggleContainer>
                    <ToggleContainer>
                        <Toggle
                            enabled={darkModeEnabled}
                            enabledIcon={windowSize && windowSize.width !== null && windowSize.width <= 1140 ?
                                <FaMoon size={18} /> : undefined
                            }
                            disabledIcon={windowSize && windowSize.width !== null && windowSize.width <= 1140 ?
                                <LuSunMoon size={18} /> : undefined
                            }
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

const MobileConfigContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 20px;
    height: 190px;
    h1{
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
        color: ${({ theme }) => theme.colors.textMainBlack};
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 30px;
        svg{
            color: ${({ theme }) => theme.colors.textMainBlack};
        }
    }
    .toogle-config{
        width: 180px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p{
            white-space: nowrap;
            color: ${({ theme }) => theme.colors.textMainBlack};
        }
    }
`;

const MainContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .hamburger-menu{
        color: ${({ theme }) => theme.colors.textMainBlack};
        font-size: 32px;
        box-sizing: border-box;
        cursor: pointer;
    }
    .icon-search-mobile{
        color: ${({ theme }) => theme.colors.textMainBlack};
        font-size: 32px;
    }
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

        @media (min-height: 660px) and (min-width: 1366px){
            font-size: 20px;
        }

        @media (min-height: 950px) and (min-width: 1366px){
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

    @media (min-height: 950px) and (min-width: 1366px){
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
    min-height: 100svh;
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
        @media (min-height: 950px) and (min-width: 1366px){
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