import styled, {css, keyframes} from 'styled-components';

const commonAnimationStyles = css`
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`

const semiOrbitAnimationForward = keyframes`
  from { transform:rotate(0deg) }
  to { transform:rotate(180deg) }
`;

const semiOrbitAnimationBackward = keyframes`
  from { transform:rotate(180deg) }
  to { transform:rotate(0deg) }
`;

const rotatingAnimationForward = keyframes`
  from { transform:rotate(0deg) }
  to { transform:rotate(360deg) }
`;

const rotatingAnimationBackward = keyframes`
  from { transform:rotate(360deg) }
  to { transform:rotate(0deg) }
`;

export const FormContainer = styled.div`
  padding-top: 3rem;
`;

export const ImageContainerPlaceholder = styled.div`
  position: relative;
  height: 200px;
  width: 200px;
  margin-bottom: 2rem;
`;

export const ImageContainer = styled.div`
  height: 550px;
  position: absolute;
  z-index: 0;
  ${({ shouldAnimateForward }: any) => shouldAnimateForward && css`animation-name: ${semiOrbitAnimationForward}`};
  ${({ shouldAnimateBackward }: any) => shouldAnimateBackward && css`animation-name: ${semiOrbitAnimationBackward}`};
  ${commonAnimationStyles}
`;

export const Image = styled.img`
  width: 200px;
  height: 200px;
  ${({ shouldAnimateForward }: any) => shouldAnimateForward && css`animation-name: ${rotatingAnimationForward}`};
  ${({ shouldAnimateBackward }: any) => shouldAnimateBackward && css`animation-name: ${rotatingAnimationBackward}`};
  ${commonAnimationStyles}
`;
