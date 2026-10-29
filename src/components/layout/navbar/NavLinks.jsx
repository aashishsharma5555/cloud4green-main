// import { NavLink } from "react-router-dom";
// import { navigation } from "@/config/navigation";
// import { cn } from "@/lib/utils";

// export default function NavLinks() {
//   return (
//     <nav className="hidden lg:flex items-center gap-8">
//       {navigation.map((item) => (
//         <NavLink
//           key={item.href}
//           to={item.href}
//           className = { ({isActive})=> cn("text-sm font-medium transition-colors hover:text-primary", isActive ? "text-primary" : "text-muted-foreground hover:text-primary")}

//         >
//           {item.label}
//         </NavLink>
//       ))}
//     </nav>
//   );
// }

import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { navigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

export default function NavLinks({ openMenu, setOpenMenu }) {
  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {navigation.map((item) =>
        item.mega ? (
          <button
            key={item.href}
            aria-expanded={openMenu === item.label}
            onClick={() =>
              setOpenMenu(openMenu === item.label ? null : item.label)
            }
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium transition-colors text-black hover:text-primary",
              openMenu === item.label ? "text-primary" : "text-black"
            )}
          >
            {item.label}
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                openMenu === item.label && "rotate-180"
              )}
            />
          </button>
        ) : (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={() => setOpenMenu(null)}
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-black"
              )
            }
          >
            {item.label}
          </NavLink>
        )
      )}
    </nav>
  );
}