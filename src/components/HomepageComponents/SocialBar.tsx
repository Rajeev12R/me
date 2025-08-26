import React from "react";
import { CgInstagram } from "react-icons/cg";
import { CiLinkedin } from "react-icons/ci";
import { SiRefinedgithub } from "react-icons/si";
import { BiLogoGmail } from "react-icons/bi";
import Link from "next/link";

const SocialBar = () => {
  const links = [
    { href: "https://instagram.com/ranjan.rajeev12", label: "Instagram", icon: <CgInstagram /> },
    { href: "https://www.linkedin.com/in/rajeev12r/", label: "LinkedIn", icon: <CiLinkedin /> },
    { href: "https://github.com/rajeev12r", label: "GitHub", icon: <SiRefinedgithub /> },
    { href: "mailto:rjranjan2112@gmail.com", label: "Email", icon: <BiLogoGmail /> },
  ];

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 items-center z-50">
      {links.map((link, i) => (
        <Link
          key={i}
          href={link.href}
          target="_blank"
          className="group relative"
        >
          <span className="absolute right-full mr-3 px-2 py-1 rounded-md bg-black/80 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            {link.label}
          </span>

          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:scale-110 transition-transform duration-200">
            {link.icon}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SocialBar;
