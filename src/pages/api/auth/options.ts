import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import jwt from 'jsonwebtoken';
import { Manager } from '@/backend/models/engine';
import { UserType } from '@/backend/Types/UserType';
import { checkPassword } from '@/helper/generateHash';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: { label: 'password', type: 'password', placeholder: 'password' },
        username: { label: 'username', type: 'text', placeholder: 'username' }
      },
      async authorize(credentials: any) {
        const { username, password } = credentials
        const user_data = (await Manager().User.findOne({
          where: {
            isRemove: false,
            username: username,
          }
        })).toJSON() as UserType

        if (!user_data) {
          throw new Error("Nombre de usuario no existe")
        }

        const match = await checkPassword(password, user_data.password_hash)

        if (!match) {
          throw new Error("Contraseña no coincide")
        }

        const user = {
          id: user_data.id,
          username: user_data.username,
          first_name: user_data.first_name,
          last_name: user_data.last_name,
          ci: user_data.ci,
          email: user_data.email,
          phone: user_data.phone,

        } as User

        // Generar el token JWT
        const secretKey = process.env.SECRET_KEY as string;
        const accessToken = jwt.sign(user, secretKey, { expiresIn: '1d' });

        if (!accessToken) {
          return false
        }
        user.accessToken = accessToken;
        console.log(user)
        return { ...user }
      },
    }),
  ],
  pages: {
    signIn: '/home',
    signOut: '/auth',
  },
  callbacks: {
    async jwt(props) {
      const { token, user, trigger, session } = props
      if (user) {
        token.accessToken = (user as any).accessToken;
      }
      return { ...user, ...token }
    },

    async session(props) {
      const { session, token, trigger, newSession, user } = props
      session.user = token as any
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 // 1 day //7 * 24 * 60 * 60, // 7 days
  },
  jwt: {
    maxAge: 24 * 60 * 60 // 1 day //7 * 24 * 60 * 60, // 7 days
  },
}
