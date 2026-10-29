
// import { Menu } from "lucide-react";
// import { NavLink } from "react-router-dom";

// import { navigation } from "@/config/navigation";

// import { Button } from "@/components/ui/button";

// import { Link } from "react-router-dom";

// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// import {useState} from "react";

// import {cn} from "@/lib/utils";

// export default function MobileMenu() {

//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <Sheet open={isOpen} onOpenChange = {setIsOpen}>
      
//       <SheetTrigger
//         render={
//     <Button
//       variant="ghost"
//       size="icon"
//       className="lg:hidden"
//     >
//       <Menu className="h-6 w-6" />
//     </Button>
//   }
// />

//       <SheetContent side="right" className="w-80">
//         <nav className="mt-8 flex items-center flex-col gap-6 mx-auto">
//           {navigation.map((item) => (
//             <NavLink
//               key={item.href}
//               to={item.href}
//               onClick={()=> setIsOpen(false)}
//               className={({ isActive }) =>
//                 cn(
//                   "text-lg font-medium transition-colors ",
//                   isActive
//                     ? "text-primary bg-muted rounded-md px-3 py-2"
//                     : "text-muted-foreground hover:text-primary hover:bg-muted rounded-md px-3 py-2"
//                 )
//               }
//             >
//               {item.label}
//             </NavLink>
//           ))}

//           <Link to="/contact">
//           <Button className="mt-8 w-full" 
//           onClick={()=> setIsOpen(false)}>
//             Contact Sales
//           </Button></Link>
//         </nav>
//       </SheetContent>
//     </Sheet>
//   );
// }

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ChevronRight, ChevronLeft } from "lucide-react";

import { navigation } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];

// one shared variant set; `dir` is +1 drilling in, -1 going back
const variants = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  // [] = root, ["Products"] = categories, ["Products","featured"] = items
  const [stack, setStack] = useState([]);
  const [dir, setDir] = useState(1);

  const close = () => {
    setIsOpen(false);
    // reset after the sheet finishes closing
    setTimeout(() => { setStack([]); setDir(1); }, 250);
  };

  const push = (...v) => { setDir(1); setStack((s) => [...s, ...v]); };

  const navItem = navigation.find((n) => n.label === stack[0]);
  const category = navItem?.mega?.categories.find((c) => c.id === stack[1]);
  const level = stack.length;

  /* A menu with a single category has nothing to choose between, so tapping
     it goes straight to its items — and back goes straight to the root. */
  const single = navItem?.mega?.categories.length === 1;
  const openMega = (item) =>
    item.mega.categories.length === 1
      ? push(item.label, item.mega.categories[0].id)
      : push(item.label);
  const pop = () => {
    setDir(-1);
    setStack((s) => (s.length === 2 && single ? [] : s.slice(0, -1)));
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(o) => (o ? setIsOpen(true) : close())}
    >
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        }
      />

      <SheetContent side="right" className="w-full p-0 sm:w-96">
        {/* overflow-hidden keeps the sliding levels clipped to the sheet */}
        <div className="relative h-full overflow-hidden">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={stack.join("/") || "root"}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute inset-0 overflow-y-auto px-2 py-3"
            >
              {/* ---------- LEVEL 0: root ---------- */}
              {level === 0 && (
                <>
                  {navigation.map((item) =>
                    item.mega ? (
                      <button
                        key={item.href}
                        onClick={() => openMega(item)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-3.5 text-base font-medium transition-colors hover:bg-muted"
                      >
                        {item.label}
                        <ChevronRight className="h-4.5 w-4.5 text-muted-foreground" />
                      </button>
                    ) : (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        onClick={close}
                        className={({ isActive }) =>
                          cn(
                            "block rounded-lg px-3 py-3.5 text-base font-medium transition-colors",
                            isActive
                              ? "bg-muted text-primary"
                              : "text-foreground hover:bg-muted"
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    )
                  )}

                  <Link to="/contact" onClick={close} className="mt-4 block px-1">
                    <Button className="w-full">Contact Sales</Button>
                  </Link>
                </>
              )}

              {/* ---------- LEVEL 1: categories ---------- */}
              {level === 1 && navItem?.mega && (
                <>
                  <button
                    onClick={pop}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Menu
                  </button>

                  <h2 className="px-3 pb-2 pt-1 text-xl font-semibold">
                    {navItem.label}
                  </h2>
                  <div className="mx-3 mb-2 h-px bg-border" />

                  {navItem.mega.categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => push(c.id)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3.5 text-base font-medium transition-colors hover:bg-muted"
                    >
                      {c.label}
                      <ChevronRight className="h-4.5 w-4.5 text-muted-foreground" />
                    </button>
                  ))}
                </>
              )}

              {/* ---------- LEVEL 2: products ---------- */}
              {level === 2 && category && (
                <>
                  <button
                    onClick={pop}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {single ? "Menu" : navItem.label}
                  </button>

                  <h2 className="px-3 pb-1 pt-1 text-xl font-semibold">
                    {single ? navItem.label : category.title}
                  </h2>
                  {category.subtitle && (
                    <p className="px-3 pb-3 text-sm leading-relaxed text-muted-foreground">
                      {category.subtitle}
                    </p>
                  )}
                  <div className="mx-3 mb-1 h-px bg-border" />

                  {category.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={close}
                      className="block rounded-lg px-3 py-3 transition-colors hover:bg-muted"
                    >
                      <span className="block text-base font-medium">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </span>
                    </Link>
                  ))}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}