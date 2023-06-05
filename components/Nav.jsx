"use client";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Nav = () => {
  const { data: session } = useSession();
  const isUserLoggedIn = session?.user;
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const resp = await getProviders();

      setProviders(resp);
    })();
  }, []);

  return (
    <nav className="flex-between w-full pt-3 mb-16">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          className="object-contain"
          alt="Prompt logo"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  sign in
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile anvigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => {
                console.log("click?");
                setToggleDropdown((prev) => !prev);
              }}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create prompt
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className="black_btn"
            >
              sign in
            </button>
          ))
        )}
      </div>
    </nav>
  );
};
export default Nav;
