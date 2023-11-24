import styled from 'styled-components';
import React from 'react';
type ToggleProps = {
    enabled: boolean;
    onToggle: React.Dispatch<React.SetStateAction<boolean>>;
    enabledIcon?: React.ReactNode;
    disabledIcon?: React.ReactNode;
    useBackground?: boolean;
}

export default function Toggle({ enabled, onToggle, enabledIcon, disabledIcon, useBackground}: ToggleProps) {
    return (
        <ToggleContainer onClick={() => onToggle(!enabled)}>
            <ToggleCircle $enabled={enabled} $useBackground={(!enabledIcon && !disabledIcon) || useBackground} >
                {enabled ?  enabledIcon : disabledIcon}
            </ToggleCircle>
        </ToggleContainer>
    )
}
const ToggleContainer = styled.div`
    width: 40px;
    height: 20px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.toggleBackground};
    color: ${({ theme }) => theme.colors.textMainBlack};
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;

    @media (max-width: 1140px){
        width: 55px;
        height: 32px;
        flex-shrink: 0;
    }

    @media (min-height: 950px) and (min-width: 1140px){
        width: 50px;
        height: 30px;
    }
`;

type ToggleCircleProps = {
    $enabled: boolean;
    $useBackground?: boolean;
}

const ToggleCircle = styled.div<ToggleCircleProps>`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
   ${p => p.$useBackground ? `background-color: ${p.theme.colors.toggleHandle};` : ''}
    position: absolute;
    left: ${p => p.$enabled ? '55%' : '2px'};
    top: 50%;
    transform: translateY(-50%);
    transition: all 200ms ease;

    @media (max-width: 1140px){
        width: 30px;
        height: 30px;
        left: ${p => p.$enabled ? '38%' : '2px'};
    }

    @media (min-height: 950px) and (min-width: 1366px){
        width: 26px;
        height: 26px;
        left: ${p => p.$enabled ? '44%' : '2px'};
    }
`;
