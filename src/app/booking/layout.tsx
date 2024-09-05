const Friends = () => {
  return (
    <div className="flex">
      <span className="w-4 text-center">F</span>
      <span className="w-4 text-center text-red-500">•</span>
      <span className="w-4 text-center">R</span>
      <span className="w-4 text-center text-yellow-500">•</span>
      <span className="w-4 text-center">I</span>
      <span className="w-4 text-center text-blue-500">•</span>
      <span className="w-4 text-center">E</span>
      <span className="w-4 text-center text-red-500">•</span>
      <span className="w-4 text-center">N</span>
      <span className="w-4 text-center text-yellow-500">•</span>
      <span className="w-4 text-center 0">D</span>
      <span className="w-4 text-center text-blue-500">•</span>
      <span className="w-4 text-center">S</span>
    </div>
  );
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="navbar flex gap-2 w-full justify-between lg:px-12 shadow-sm">
        <div className="flex gap-2 font-medium text-xl">
          <p className="hidden lg:block">The One With 30 Years of</p>{" "}
          <Friends />
        </div>
        <a
          href="https://www.facebook.com/profile.php?id=61562681930401"
          className="text-2xl"
          target="_blank"
        >
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="facebook"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-92.4 233.5h-63.9c-50.1 0-59.8 23.8-59.8 58.8v77.1h119.6l-15.6 120.7h-104V912H539.2V602.2H434.9V481.4h104.3v-89c0-103.3 63.1-159.6 155.3-159.6 44.2 0 82.1 3.3 93.2 4.8v107.9z"></path>
          </svg>
        </a>
      </nav>
      {children}
    </>
  );
}
