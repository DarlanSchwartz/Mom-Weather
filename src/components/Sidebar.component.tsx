import styled from 'styled-components';
import Logo from './Logo.mini';
import { CiSearch } from "react-icons/ci";
import MyClimate from './MyClimate.component';
import { useState, useContext } from 'react';
import Toggle from './Toggle.mini';
import ThemeContext from '../contexts/Theme.context';

export default function Sidebar() {
    const [farenheit, setFarenheit] = useState(false);
    const { darkModeEnabled, setDarkModeEnabled } = useContext(ThemeContext);
    return (
        <SidebarContainer>
            <MainContent>
                <Logo />
                <SearchContainer>
                    <CiSearch className="icon" />
                    <SearchInput
                        type="text"
                        placeholder="Procure por uma cidade"
                        autoFocus
                    />
                </SearchContainer>
                <MyClimate
                    date={new Date()}
                    farenheit={false}
                    image={'/images/coat.png'}
                    temperature={31}
                    weather='Ensolarado'
                    temperatureColor={'orange'}
                />
            </MainContent>
            <BottomContent>
                <ActionsContainer>
                    <ToggleContainer>
                        <Toggle
                            enabled={farenheit}
                            onToggle={setFarenheit}
                        />
                        <span>°F</span>
                    </ToggleContainer>
                    <ToggleContainer>
                        <Toggle
                            enabled={darkModeEnabled}
                            onToggle={setDarkModeEnabled}
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
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
        width: 130px;

        @media (max-height: 660px){
            font-size: 18px;
        }
    }
`;

const ActionsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const SidebarContainer = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 34.63%;
    height: 100dvh;
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    color: #fff;
    padding: 20px;
    min-width: 370px;
`;

const SearchContainer = styled.div`
    width: 100%;
    margin-top: 20px;
    position: relative;
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
    box-shadow: 0px 24px 48px 0px rgba(49, 79, 124, 0.08);
    padding-left: 45px;
    border: 0;
    background-color: ${({ theme }) => theme.colors.searchBackground};
`;

const CopyrightText = styled.span`
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    color: ${({ theme }) => theme.colors.textMainBlack};
`;