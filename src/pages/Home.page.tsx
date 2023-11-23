import styled from "styled-components";
import Sidebar from "../components/Sidebar/Sidebar.component";
import Forecast from "../components/Forecast/Forecast.component";

export default function PageHome() {
    return (
        <PageContainer>
            <Sidebar />
            <Forecast />
        </PageContainer>
    )
}

const PageContainer = styled.main`
    display: flex;
    background-color: ${({ theme }) => theme.colors.background};
    width: 100%;
    min-height: 100dvh;
    @media (max-width: 660px){
        flex-direction: column;
    }
`;