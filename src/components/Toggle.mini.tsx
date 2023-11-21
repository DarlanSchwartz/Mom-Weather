import styled from 'styled-components';
import React from 'react';

type ToggleProps = {
    enabled: boolean;
    onToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Toggle({ enabled, onToggle }: ToggleProps) {
    return (
        <ToggleContainer onClick={() => onToggle(!enabled)}>
            <ToggleCircle $enabled={enabled} />
        </ToggleContainer>
    )
}
const ToggleContainer = styled.div`
    width: 40px;
    height: 20px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.toggleBackground};
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
`;

type ToggleCircleProps = {
    $enabled: boolean;
}

const ToggleCircle = styled.div<ToggleCircleProps>`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.toggleHandle};
    
    position: absolute;
    left: ${p => p.$enabled ? '55%' : '2px'};
    top: 50%;
    transform: translateY(-50%);
    transition: all 200ms ease;
`;
