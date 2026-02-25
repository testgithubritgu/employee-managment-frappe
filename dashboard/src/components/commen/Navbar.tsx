import { useMemo, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
const getInitials = (name: string) => {
    if (!name || name === "undefined") return "";

    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
        return parts[0][0].toUpperCase();
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { userDetails, authLoading , auth } = useAuthContext()

    console.log(userDetails )
    
    const intialState = useMemo(() => getInitials(userDetails?.full_name ?? ""), [userDetails])

    return (

        <nav className=" w-full z-500 shadow-2xl bg-white border-b border-gray-200">
            <div className="">
                <div className="flex items-center justify-between h-16">

                    <div className="text-xl font-bold ">
                        Dev<span className="text-indigo-600">Brand</span>
                    </div>


                    <div className="hidden md:flex items-center space-x-8">

                        {["Home", "Features", "Pricing", "Contact"].map((item: string) => (
                            <a
                                key={item}
                                href="#"
                                className="text-gray-600 hover:text-indigo-600 transition font-medium"
                            >
                                {item}
                            </a>
                        ))}

                        {(authLoading && !auth) ? <Loader2 className="size-4 animate-spin" /> :
                            <>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="w-7 h-7 p-3 flex justify-center items-center cursor-pointer bg-gray-300 rounded-full">
                                            {intialState}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent >
                                        {userDetails?.full_name}
                                    </TooltipContent>
                                </Tooltip>
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