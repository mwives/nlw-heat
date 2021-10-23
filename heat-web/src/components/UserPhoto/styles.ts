import styled from "styled-components";

interface UserPhotoProps {
  size: number
}

export const UserPhoto = styled.div<UserPhotoProps>`
  padding: 2px;
  border-radius: 50%;
  line-height: 0;
  background: linear-gradient(100deg, var(--pink) 0%, var(--yellow) 100%);

  img {
    width: ${({size}) => `${size}px`};
    height: ${({size}) => `${size}px`};
    border-radius: 50%;
    border: 4px solid var(--background);
  }
`;
