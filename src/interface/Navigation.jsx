import { IoIosHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navigation() {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollTop = useRef(0);
  const scrolling = useRef(false);
  const navigate = useNavigate();
  // console.log(document.documentElement.clientHeight);
  const handleScroll = () => {
    if (!scrolling.current) {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st === 0) return;

      // console.log(lastScrollTop.current, st);

      if (st > lastScrollTop.current) {
        setIsHidden(false);
      } else {
        setIsHidden(true);
      }

      lastScrollTop.current = st <= 0 ? 0 : st;
      scrolling.current = true;

      requestAnimationFrame(() => {
        scrolling.current = false;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchmove", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, []);
  return (
    <ul
      className={`${
        isHidden ? "hidden" : "block"
      } fixed bottom-0 bg-zinc-800/80 w-[100%] flex justify-center space-x-20 px-5 py-5 transition-all duration-150`}
    >
      <NavLink to="/home">
        <button>
          <IoIosHome size={20} fill="lime" />
        </button>
      </NavLink>
      <li>
        <button>
          <FaSearch size={20} fill="lime" />
        </button>
      </li>
      <li>
        <button onClick={() => navigate("/user")}>
          <BsFillPersonFill size={20} fill="lime" />
        </button>
      </li>
    </ul>
  );
}

export default Navigation;
