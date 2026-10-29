import {Link} from "react-router-dom";
import logo from "@/assets/images/C4GLogo.png"
import logoPlain from "@/assets/images/C4GLogoplain.png"
import footerLogo from "@/assets/images/C4GLogoCropped.png"
export default function Logo({placement= "navbar", scrolled = false}) {
  const isScrolled = scrolled;
  return (
    <Link
    to="/"
    aria-label="Cloud4Green home"
    className="inline-flex">
      {/* The link carries the name, so the image stays decorative. */}
      <img src={isScrolled ? logoPlain : placement === 'footer' ? footerLogo : logo}
    alt=""
    className="
    h-16
    "/>
    </Link>
  );
}