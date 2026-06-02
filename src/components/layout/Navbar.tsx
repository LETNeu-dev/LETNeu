
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react"; // Import Sun and Moon icons
import { useTheme } from "@/providers/ThemeProvider"; // Import useTheme hook
import { Button } from "@/components/ui/button"; // Import Button component

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false);
  const teamMenuRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const { theme, setTheme } = useTheme(); // Get theme state and setter

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (teamMenuRef.current && !teamMenuRef.current.contains(event.target as Node)) {
        setIsTeamMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsTeamMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const openTeamMenu = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    setIsTeamMenuOpen(true);
  };

  const closeTeamMenu = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsTeamMenuOpen(false);
    }, 150);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="sticky top-0 bg-white/90 backdrop-blur-md z-50 shadow-sm dark:shadow-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {/* Large screen logo */}
            <img
              src="https://i.postimg.cc/5Nq032m8/LETNEU-03.png"
              alt="LETNeu Logo"
              className="hidden md:block h-10"
            />
            {/* Small screen logo */}
            <img
              src="https://i.postimg.cc/QtkPzwYY/LETNEU-01.png"
              alt="LETNeu Logo"
              className="md:hidden h-10"
            />
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/research">Research</NavLink>
          <NavLink to="/publications">Publications</NavLink>
          <div
            className="relative"
            ref={teamMenuRef}
            onMouseEnter={openTeamMenu}
            onMouseLeave={closeTeamMenu}
          >
            <button
              type="button"
              onClick={() => {
                if (isTeamMenuOpen) {
                  setIsTeamMenuOpen(false);
                } else {
                  openTeamMenu();
                }
              }}
              className="flex items-center text-foreground dark:text-secondary font-medium hover:text-primary dark:hover:text-secondary transition-colors"
              aria-haspopup="true"
              aria-expanded={isTeamMenuOpen}
            >
              Team
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className={`absolute left-0 top-full z-40 w-60 rounded-xl border border-slate-200 bg-white py-2 shadow-lg transition duration-200 dark:border-gray-800 dark:bg-gray-950 ${isTeamMenuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
              <Link
                to="/team/administration"
                onClick={() => setIsTeamMenuOpen(false)}
                className="block px-4 py-2 text-sm text-foreground hover:bg-slate-100 dark:text-gray-200 dark:hover:bg-slate-800"
              >
                Administration
              </Link>
              <Link
                to="/team/faculty"
                onClick={() => setIsTeamMenuOpen(false)}
                className="block px-4 py-2 text-sm text-foreground hover:bg-slate-100 dark:text-gray-200 dark:hover:bg-slate-800"
              >
                Faculty
              </Link>
              <Link
                to="/team/research-associates"
                onClick={() => setIsTeamMenuOpen(false)}
                className="block px-4 py-2 text-sm text-foreground hover:bg-slate-100 dark:text-gray-200 dark:hover:bg-slate-800"
              >
                Research Associates
              </Link>
              <Link
                to="/team/collaborators"
                onClick={() => setIsTeamMenuOpen(false)}
                className="block px-4 py-2 text-sm text-foreground hover:bg-slate-100 dark:text-gray-200 dark:hover:bg-slate-800"
              >
                Collaborators
              </Link>
            </div>
          </div>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {/* Theme Toggle Button - Desktop */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-600" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-secondary" />
          </Button>
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="md:hidden flex items-center space-x-2">
           {/* Theme Toggle Button - Mobile */}
           <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-primary dark:text-primary-foreground" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary dark:text-primary-foreground" />
          </Button>
          <button
            type="button"
            className="text-primary dark:text-primary-foreground"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
        >
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            <MobileNavLink to="/" onClick={toggleMenu}>Home</MobileNavLink>
            <MobileNavLink to="/research" onClick={toggleMenu}>Research</MobileNavLink>          
            <MobileNavLink to="/publications" onClick={toggleMenu}>Publications</MobileNavLink>
            <div className="space-y-1">
              <span className="block px-4 py-2 text-foreground dark:text-gray-300 font-medium">Team</span>
              <div className="ml-4 flex flex-col gap-1">
                <MobileNavLink to="/team/administration" onClick={toggleMenu}>Administration</MobileNavLink>
                <MobileNavLink to="/team/faculty" onClick={toggleMenu}>Faculty</MobileNavLink>
                <MobileNavLink to="/team/research-associates" onClick={toggleMenu}>Research Associates</MobileNavLink>
                <MobileNavLink to="/team/collaborators" onClick={toggleMenu}>Collaborators</MobileNavLink>
              </div>
            </div>
            <MobileNavLink to="/events" onClick={toggleMenu}>Events</MobileNavLink>
            <MobileNavLink to="/contact" onClick={toggleMenu}>Contact</MobileNavLink>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link
      to={to}
      className="text-foreground dark:text-secondary font-medium hover:text-primary dark:hover:text-secondary transition-colors relative group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
};

const MobileNavLink = ({
  to,
  children,
  onClick
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-foreground dark:text-gray-300 font-medium py-2 hover:text-primary dark:hover:text-primary-foreground transition-colors"
    >
      {children}
    </Link>
  );
};

export default Navbar;
