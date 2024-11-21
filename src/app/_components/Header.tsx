"use client";

const Header: React.FC = () => {
  return (
    <header>
      <div className="bg-slate-600 py-2">
        <div
          className="container mx-auto flex justify-between items-center text-white"
        >
          <div>
            Header
          </div>
          <div>About</div>
        </div>
      </div>
    </header>
  );
};

export default Header;