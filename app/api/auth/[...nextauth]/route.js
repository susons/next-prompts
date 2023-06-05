import User from "@models/user";
import { connectToDb } from "@utils/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      console.log("session: ", session);

      return session;
    },
    async signIn({ profile }) {
      try {
        if (!(await connectToDb())) return;

        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        //check if user exists
        //check if signed in
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
