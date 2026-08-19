import { Link } from "react-router-dom";
import { User } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function UserMenuMobile() {
  const { user } = useAuth();

  return (
    <Link
      to={user ? "/mi-cuenta" : "/login"}
      className="rounded-full p-3 transition hover:bg-zinc-100 lg:hidden"
      aria-label="Mi cuenta"
    >
      <User size={22} />
    </Link>
  );
}