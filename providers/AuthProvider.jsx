import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";

const AuthProvider = async ({ children }) => {
  let session = null;

  try {
    session = await auth();
  } catch (error) {
    console.error("Auth session fetch failed:", error);
    session = null;
  }

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
