import React from 'react';
import styled from 'styled-components';


interface ApplicationModalProps extends React.FormHTMLAttributes<HTMLFormElement> {
    children?: React.ReactNode;
}

export default function ApplicationModal({ children, ...props }: ApplicationModalProps) {
  return (
    <ModalContainer {...props}>
        {children}
    </ModalContainer>
  )
}
const ModalContainer = styled.form`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.modalBackground};
    z-index: 999;
    display: flex;
    padding: 20px;
`;