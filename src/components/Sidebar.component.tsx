import styled from 'styled-components';
import Logo from './Logo.mini';
import { CiSearch } from "react-icons/ci";

export default function Sidebar() {
    return (
        <SidebarContainer>
            <Logo />
            <SearchContainer>
                <CiSearch className="icon" />
                <SearchInput
                    type="text"
                    placeholder="Procure por uma cidade"
                    autoFocus
                />
                
            </SearchContainer>
        </SidebarContainer>
    )
}

const SidebarContainer = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 34.63%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    color: #fff;
    padding: 20px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
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
