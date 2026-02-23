import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { useState } from "react";

export default function Navbar(){
    const [open, setOpen] = useState(false);

    return (
                  
        <nav className ="container w-full z-500 shadow-2xl bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">

                    <div className="text-xl font-bold ">
                        Dev<span className="text-indigo-600">Brand</span>
                    </div>

                   
                    <div className="hidden md:flex items-center space-x-8">
                        <SignedOut>
                            <SignInButton />
                            <SignUpButton />
                        </SignedOut>
                        <SignedIn>
                        {["Home", "Features", "Pricing", "Contact"].map((item) => (
                            <a
                            key={item}
                            href="#"
                            className="text-gray-600 hover:text-indigo-600 transition font-medium"
                            >
                                {item}
                            </a>
                        ))}
                        <UserButton />
                      
                        </SignedIn>
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

                        <button className="w-full py-2 rounded-lg bg-indigo-600 text-white">
                            Login
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}