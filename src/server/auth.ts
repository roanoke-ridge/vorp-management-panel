import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";

import DiscordProvider, { type DiscordProfile } from "next-auth/providers/discord";
import { env } from "@/env.mjs";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    isAuthorized: boolean;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  callbacks: {
    signIn({ user }) {
      return user.isAuthorized;
    },

    session({ session }) {
      return session
    },

    jwt({ token, user }) {
      return { ...token, ...user }
    },
  },

  debug: true,
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: "identify guilds guilds.members.read" } },

      async profile(profile: DiscordProfile, tokens): Promise<{ id: string; name: string; email: string; image: string; isAuthorized: boolean }> {
        let isAuthorized = false;

        const response = await fetch("https://discord.com/api/users/@me/guilds", {
          headers: { Authorization: `Bearer ${tokens.access_token as string}` },
        });

        const guilds = await response.json() as { id: string }[];
        const targetGuild = guilds.find(
          (guild) => guild.id === env.DISCORD_SERVER_ID
        );

        if (targetGuild) {
          // Fetch the member data from our auth server
          const memberResponse = await fetch(`https://discord.com/api/users/@me/guilds/${env.DISCORD_SERVER_ID}/member`, {
            headers: { Authorization: `Bearer ${tokens.access_token as string}` }
          });

          const memberData = await memberResponse.json() as { roles: string[] };
          isAuthorized = memberData.roles.includes(env.DISCORD_ROLE_ID);
        }

        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
          isAuthorized,
        };
      }
    })
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
