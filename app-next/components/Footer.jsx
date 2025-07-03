import HYFLogo from "@/assets/hyf.svg";
import Image from "next/image";
import "./HeaderFooter.css";

function Footer() {
  return (
    <footer className="main-footer">
      <a
        href="https://www.hackyourfuture.dk/"
        target="_blank"
        className="footer-logo"
      >
        <Image
          src={HYFLogo.src}
          width={40}
          height={40}
          alt="HackYourFuture logo"
        />
      </a>
      <p>&copy; 2025 Meal Sharing. Built with ❤️ at HackYourFuture</p>
    </footer>
  );
}

export default Footer;
