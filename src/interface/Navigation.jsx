import { IoIosHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

function Navigation() {
  // const [isHidden, setIsHidden] = useState(false);
  // const lastScrollTop = useRef(0);
  // const scrolling = useRef(false);
  // console.log(document.documentElement.clientHeight);
  // const handleScroll = () => {
  //   if (!scrolling.current) {
  //     const st = window.pageYOffset || document.documentElement.scrollTop;
  //     if (st === 0) return;
  //     if (st > lastScrollTop.current) {
  //       setIsHidden(false);
  //     } else {
  //       setIsHidden(true);
  //     }
  //     lastScrollTop.current = st <= 0 ? 0 : st;
  //     scrolling.current = true;
  //     requestAnimationFrame(() => {
  //       scrolling.current = false;
  //     });
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("wheel", handleScroll);
  //   window.addEventListener("touchmove", handleScroll);

  //   return () => {
  //     window.removeEventListener("wheel", handleScroll);
  //     window.removeEventListener("touchmove", handleScroll);
  //   };
  // }, []);
  return (
    <ul
      className={`fixed bottom-0 bg-zinc-800/90 w-[100%] flex justify-center space-x-20 px-5 py-5 transition-all duration-150 h-[4em]`}
    >
      <li>
        <NavLink to="/home">
          <IoIosHome size={20} fill="lime" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/search">
          <FaSearch size={20} fill="lime" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/user">
          <BsFillPersonFill size={20} fill="lime" />
        </NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
