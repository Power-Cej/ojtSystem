import {useEffect} from "react";
import {useLocation} from "react-router-dom";

function ScrollToTop() {
    const {pathname} = useLocation();

    useEffect(() => {
        // window.scrollTo(0, 127);
        // window.addEventListener('scroll', () => {
        //     const scroll = document.documentElement.scrollTop;
        //     const height = window.screen.height;
        //     const pageHeight = window.screen.height;
        // });
    }, [pathname]);

    return null;
}

export default ScrollToTop;
