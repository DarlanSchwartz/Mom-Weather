import styled from "styled-components";

export const CopyrightText = styled.span`
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