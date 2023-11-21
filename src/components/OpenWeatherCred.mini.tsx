import styled from 'styled-components'

export default function OpenWeatherCred() {
  return <OpenWeatherCredText>Dados fornecidos pela <a href="https://openweathermap.org/">Open Weather API</a></OpenWeatherCredText>
}

const OpenWeatherCredText = styled.span`
    color: ${({ theme }) => theme.colors.textMainBlack};
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    padding-bottom: 20px;
    a{
        color: ${({ theme }) => theme.colors.link};
        text-decoration: none;
        &:hover{
            text-decoration: underline;
        }
    }

    @media (max-width: 1360px){
        font-size: 18px;
    }
`;