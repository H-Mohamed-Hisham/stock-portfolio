import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/">
      <img
        src="https://github.com/shadcn.png"
        alt="Logo"
        className="flex flex-1 items-center h-5 w-6"
      />
    </Link>
  );
}
