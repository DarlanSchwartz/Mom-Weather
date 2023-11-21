import styled from 'styled-components';

export default function Sidebar() {
  return (
    <SidebarContainer>

    </SidebarContainer>
  )
}

const SidebarContainer = styled.aside`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 662px;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    color: #fff;
    padding: 46px 56px 56px 56px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
`;  
