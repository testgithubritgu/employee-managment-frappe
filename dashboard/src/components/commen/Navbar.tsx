import { memo, useMemo, useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Loader, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Link } from "react-router-dom";
import { useOutsideAlerter } from "@/hooks/useOutsideClick";
import { Button } from "../ui/button";
const getInitials = (name: string) => {
    if (!name || name === "undefined") return "";

    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
        return parts[0][0].toUpperCase();
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
function NavbarComp() {
    const [showUserDropdown, setShowUserDropdown] = useState(false)
    const [userLoading,setUserLoading] = useState(false)
    const routes = useMemo(() => (
        [
            { path: "/dashboard", name: "Home" },
            { path: "/dashboard/pricing", name: "Pricing" },
            { path: "/dashboard/features", name: "Features" },
            { path: "/dashboard/contact", name: "Contact" },
        ]
    ), [])

    const logoutUser =async()=>{
        try {
            setUserLoading(true)
            await logout()
            setUserLoading(false)
        } catch (error) {
            setUserLoading(false)
        }
    }
    const [open, setOpen] = useState(false);
    const { userDetails, authLoading, auth, logout } = useAuthContext()
    console.log(authLoading)
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    useOutsideAlerter(wrapperRef, setShowUserDropdown);

    const intialState = useMemo(() => getInitials(userDetails?.full_name ?? ""), [userDetails])

    return (

        <nav className=" w-full z-500 shadow-2xl bg-white border-b border-gray-200">
            <div className="">
                <div className="flex items-center justify-between h-16">

                    <div className="text-xl font-bold ">
                        Dev<span className="text-indigo-600">Brand</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">

                        {routes?.map((item) => (

                            <Link
                                key={item.path}
                                to={item.path}
                                className="text-gray-600 hover:text-indigo-600 transition font-medium"
                            >
                                {item.name}
                            </Link>
                        ))}

                        {(authLoading && !auth) ? <Loader2 className="size-4 animate-spin" /> :
                            <>
                                <div ref={wrapperRef} className="relative bg-green-300">
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div onClick={() => setShowUserDropdown(!showUserDropdown)} className="w-7 h-7 p-3 flex justify-center items-center cursor-pointer bg-gray-300 rounded-full">
                                                {intialState}

                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent >
                                            {userDetails?.full_name}
                                        </TooltipContent>
                                    </Tooltip>
                                    <div
                                        className={`absolute -left-[250px] bg-gray-300 min-w-[250px] min-h-[100px]
    transition-all duration-300 origin-top-right
    ${showUserDropdown
                                                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                                                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                                            }
  `}
                                    >
                                        <Button onClick={() => logoutUser()} className="mx-auto block flex items-center justify-center gap-2">
                                            {userLoading && <Loader2 className="size-4"/>}
                                            {!userLoading ? "Logout":"loading..."}
                                        </Button>
                                    </div>
                                </div>
                            </>
                        }

                    </div>
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden text-gray-700"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            {open ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            {open && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-6 py-4 space-y-4">
                        {["Home", "Features", "Pricing", "Contact"].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="block text-gray-600 hover:text-indigo-600 font-medium"
                            >
                                {item}
                            </a>
                        ))}

                        <button aria-label="Toggle menu"
                            aria-expanded={open} className="w-full py-2 rounded-lg bg-indigo-600 text-white">
                            Login
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

const Navbar = memo(NavbarComp)
export default Navbar