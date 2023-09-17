"use client";

import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { useAuth } from "./contexts/Auth/AuthContext";
import Image from "next/image";
import menuIcon from "@/assets/icons/menu.svg";
// import logo from "@/assets/images/logo.svg";
import logo from "@/assets/images/logo_2.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const styles = {
    menuButton: `relative z-[1] ease ease-in grid place-items-center px-2 py-3 w-12 rounded-xl text-lg font-bold transition-all delay-0 ui-open:delay-75 active:bg-primary-800 hover:bg-primary-800 ui-open:ease-out`,
    menuItems: `absolute aspect-square top-0 delay-75 ui-open:delay-0 overflow-hidden rounded-xl bg-primary-800 pb-2 shadow-lg transition transform pt-12`,
    menuItem: `w-full px-4 py-1 font-bold hover:bg-primary-600 grid text-primary-400 sm:text-base text-sm`,
  };

  const links = [
    { label: "Home", to: "/" },
    { label: "Profile", to: "/profile" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Logout", to: "/", onClick: logout },
  ];

  return (
    <nav className="grid-cols-3 grid items-center bg-white/10 p-4 px-6">
      <Link href="/" className="flex items-center gap-2">
        <Image src={logo} width={128} height={128} alt="logo" className="h-10 w-10" />
      </Link>

      <span className="text-center text-xl font-semibold tracking-tight">Carpool Connect</span>

      {user ? (
        <Menu className="relative self-center justify-self-end" as="div">
          <Menu.Button className={twMerge(styles.menuButton)}>
            <Image src={menuIcon} alt="menu" width={128} height={128} className="h-6 w-6" priority />
          </Menu.Button>
          <Transition as={Fragment} enter="ease-out" enterFrom="opacity-0 scale-0" enterTo="opacity-100 scale-100" leave="ease-in" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-0">
            <Menu.Items className={twMerge(styles.menuItems, "right-0 w-48 origin-top-right")} as="ul">
              {links.map(({ label, to, onClick }) => (
                <Menu.Item as="li" className={twMerge(styles.menuItem, "text-right")} key={to}>
                  {({ close }) => (
                    <Link
                      href={to}
                      onClick={
                        onClick
                          ? () => {
                              onClick();
                              close();
                            }
                          : close
                      }
                    >
                      {label}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <div className="flex items-center gap-4 justify-self-end">
          <Link href="/login" className="rounded-md bg-btn-background px-4 py-2 text-white no-underline hover:bg-btn-background-hover">
            Login
          </Link>
          <Link href="/signup" className="rounded-md bg-btn-background px-4 py-2 text-white no-underline hover:bg-btn-background-hover">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
