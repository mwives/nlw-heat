import axios from "axios";
import { Secret, sign } from "jsonwebtoken";

import prismaClient from "../prisma";

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  login: string;
  id: number;
  name: string;
  avatar_url: string;
}

export class AuthenticateUserService {
  async execute(githubCode: string) {
    const url = "https://github.com/login/oauth/access_token";

    const { data: acessTokenResponse } = await axios.post<IAccessTokenResponse>(
      url,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: githubCode,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    const { data: userResponse } = await axios.get<IUserResponse>(
      "https://api.github.com/user",
      {
        headers: {
          authorization: `Bearer ${acessTokenResponse.access_token}`,
        },
      }
    );

    const { login, id, name, avatar_url } = userResponse;

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          login,
          github_id: id,
          name,
          avatar_url,
        },
      });
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET as Secret,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { token, user };
  }
}
