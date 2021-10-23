import avatarImg from "../../assets/avatar.png";

import { UserPhoto as StyledUserPhoto } from "./styles";

interface UserPhotoProps {
  user?: {
    name: string;
    avatar_url: string;
  } | null;
  size?: number;
}

export function UserPhoto({ user, size = 30 }: UserPhotoProps) {
  return (
    <StyledUserPhoto size={size}>
      <img src={user?.avatar_url || avatarImg} alt={user?.name || "Avatar"} />
    </StyledUserPhoto>
  );
}
