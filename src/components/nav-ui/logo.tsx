import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/">
      <img
        src="/logo.svg"
        alt="Logo"
        className="flex flex-1 items-center h-8 w-8"
      />
    </Link>
  );
}
