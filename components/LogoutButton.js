import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button onClick={() => signOut({ callbackUrl: "/auth/signin" })}>
      Sign Out
    </button>
  );
};

export default LogoutButton;
