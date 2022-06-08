import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAppDispatch from "../hooks/useDispatch";
import { setModal } from "../store/reducers/modalReducer";
import "../styles/Nav.scss";
import Search from "./search";

export default function Nav() {
  const [scroll, setScroll] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const modalEvents = () => dispatch(setModal({ state: true, type: "add" }));

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset >= 40) setScroll(true);
      else setScroll(false);
    });
  }, []);

  return (
    <div className={`nav-container ${scroll ? "scroll" : ""}`}>
      <Link className="logo" to="/">
        Manager
      </Link>
      <Search />
      <ul>
        <li>
          <Link to="/">List</Link>
        </li>
        <li onClick={modalEvents}>Add</li>
        <span></span>
      </ul>
    </div>
  );
}
