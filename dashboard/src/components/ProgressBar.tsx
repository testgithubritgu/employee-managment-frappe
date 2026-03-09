import NProgress from "nprogress";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ProgressBar():null {
    const location = useLocation();

    useEffect(() => {
        NProgress.start();

        const timer = setTimeout(() => {
            NProgress.done();
        }, 500);

        return () => clearTimeout(timer);
    }, [location]);

    return null;
}

export default ProgressBar;