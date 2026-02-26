import { type FC } from "react"
import { useNavigate } from "react-router-dom"

const UnAuthorized: FC = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-fit flex items-center justify-center  px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">

                {/* Icon */}
                <div className="mx-auto mb -6 relative h-28 w-28 flex items-center justify-center rounded-full border-4 border-red-500">
                    <div className="absolute h-2 w-full bg-red-500 rotate-45"></div>
                    <img
                        src="/unathorized/stop.png"
                        alt="Unauthorized"
                        className="h-16 w-16"
                    />
                </div>

                {/* Status Code */}
                <h1 className="text-5xl font-bold text-red-600">403</h1>

                {/* Title */}
                <h2 className="mt-2 text-xl font-semibold text-gray-800">
                    Access Denied
                </h2>

                {/* Message */}
                <p className="mt-3 text-gray-600">
                    You don’t have permission to access this page.
                    Please contact the administrator or login with a valid account.
                </p>

                {/* Actions */}
                <div className="mt-6 flex gap-3 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Go Back
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UnAuthorized