import { UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="flex items-center justify-end w-full">
      <UserButton />
    </header>
  );
};

export default Header;
