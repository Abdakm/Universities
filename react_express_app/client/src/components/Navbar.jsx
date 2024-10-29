import { navLinks } from "../constants";
import { Logo } from "../assets/images/index";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const Links = navLinks.map((link, index) => (
    <li className="rounded-xl overflow-hidden" key={index}>
      <a
        className="font-montserrat max-lg:text-sm lg:text-lg leading-normal text-black p-2  transition-all hover:text-white "
        href={`#${link.href}`}>
        {link.label}
      </a>
    </li>
  ));
  const navigate = useNavigate();

  function logout() {
    console.log("logout");
    // axios
    //   .get(`http://localhost:4000/user/logout`)
    //   .then((res) => {
    //     console.log("response navbar");
    //   })
    //   .catch((err) => console.log(err.response.data.message));
  }
  return (
    <header className="padding-x absolute bg-transparent py-4 z-[200] w-full">
      <nav className="flex justify-between items-center max-container w-full ">
        <a href="#">
          <img
            src={Logo}
            alt="Logo"
            width="100%"
            className="m-0 h-[69px] w-[129px] max-lg:w-[70px]"
          />
        </a>
        <ul className="w-full flex flex-1 items-center justify-center lg:gap-16">
          {Links}
        </ul>
        {user ? (
          <div className="flex lg:gap-2 font-montserrat leading-normal text-black lg:text-lg max-lg:text-sm">
            <div className=" text-black font-extrabold">
              {user.firstname} {user.lastname}
            </div>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="flex lg:gap-2 font-montserrat leading-normal text-black lg:text-lg max-lg:text-sm">
            <Link to="/Signin">Sign in</Link>
            <span>/</span>
            <Link to="/Login">Login</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
