import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * This component ensures the window scrolls to the top when the route changes.
 */
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to the top-left corner of the document
        document.documentElement.scrollTo({ top: 0, left: 0,behavior:"smooth" });
    }, [pathname]);

    return null;
}
