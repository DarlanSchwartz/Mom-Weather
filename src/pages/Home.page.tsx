import styled from "styled-components"
import Sidebar from "../components/Sidebar.component";

export default function Home() {
    return (
        <PageContainer>
            <Sidebar />
        </PageContainer>
    )
}

const PageContainer = styled.main`
    display: flex;
    background-color: ${({ theme }) => theme.colors.background};
    width: 100%;
    min-height: 100dvh;
`;
