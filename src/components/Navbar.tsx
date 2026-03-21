import { Link, useLocation } from "react-router-dom";
import { FileText, BarChart3, Layers, BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Checker", icon: BarChart3 },
  { to: "/builder", label: "Builder", icon: FileText },
  { to: "/templates", label: "Templates", icon: Layers },
  { to: "/blog", label: "Blog", icon: BookOpen },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <img src="/favicon.ico" alt="logo" style={{ height: "40px" }} />
          <span className="text-foreground">ATS</span>
          <span className="text-primary">Checker</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));
            return (
              <Link key={item.to} to={item.to}>
                <Button
                  variant={active ? "secondary" : "ghost"}
                  size="sm"
                  className="gap-2 font-medium"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      

      {open && (
        <div className="md:hidden border-t bg-card p-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-2 font-medium">
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
