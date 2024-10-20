import { FC } from "react";

interface CoreLayoutProps {
  children: React.ReactNode;
}

const CoreLayout: FC<CoreLayoutProps> = ({ children }) => {
  return (
    <>
      {/* <header>
      </header> */}
      <main className="flex flex-col w-full h-full relative">
        {children}
      </main>

    </>
  )
}

export default CoreLayout