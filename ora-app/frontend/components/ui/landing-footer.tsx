"use client";
import { Github, Mail, Twitter } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-white font-semibold">ORA</div>
            <div className="text-slate-400 text-sm">Teknoloji Vokal pou Kreyòl Ayisyen</div>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden sm:flex gap-4">
              <a className="text-slate-300 hover:text-white text-sm" href="#">A pwopo</a>
              <a className="text-slate-300 hover:text-white text-sm" href="#">Dok</a>
              <a className="text-slate-300 hover:text-white text-sm" href="#">Kontak</a>
            </nav>

            <div className="flex items-center gap-3">
              <a aria-label="Twitter" href="#" className="text-slate-400 hover:text-white"><Twitter className="w-5 h-5" /></a>
              <a aria-label="GitHub" href="#" className="text-slate-400 hover:text-white"><Github className="w-5 h-5" /></a>
              <a aria-label="Email" href="mailto:info@example.com" className="text-slate-400 hover:text-white"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-slate-500 text-sm">© {new Date().getFullYear()} ORA · Tout dwa rezève</div>
      </div>
    </footer>
  );
}

export { LandingFooter };
