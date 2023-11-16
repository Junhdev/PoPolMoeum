import { Suspense } from "react";
//import HeaderNavigationTab from "../Tab/HeaderNavigationTab";
import AuthHeader from "./AuthHeader";

export default function Header() {
    return (
      <div className="h-max min-h-screen bg-zinc-100 pb-36">
        <header className="sticky top-0 z-10 bg-white drop-shadow-sm">
          <div className=" flex items-center justify-between py-2.5 px-3 md:container md:mx-auto md:px-0">
            {/* <Logo width={160} className="w-[6rem] md:w-[8rem]" /> 
            <HeaderNavigationTab className="hidden sm:flex" />*/}
            <div>
              <Suspense>
                <AuthHeader />
              </Suspense>
            </div>
          </div>
        </header>
      </div>
    )
  }