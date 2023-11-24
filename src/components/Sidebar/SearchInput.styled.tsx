import styled from "styled-components";

export const SidebarInput = styled.input`
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