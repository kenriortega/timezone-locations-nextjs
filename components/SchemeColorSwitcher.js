import { useState, useEffect } from "react"


let trans = () => {

    document.documentElement.classList.add("transition");
    window.setTimeout(() => {
        document.documentElement.classList.remove("transition");
    }, 1000);
};
export default function SchemeColorSwitcher() {
    const [scheme, setScheme] = useState(null)
    const handleChange = (e) => {
        setScheme(e.target.checked)
    }
    useEffect(() => {
        if (scheme) {
            trans();
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            trans();
            document.documentElement.setAttribute("data-theme", "light");
        }
    }, [scheme])
    return (
        <>
            <div className="toggle-container">
                <input onChange={handleChange} type="checkbox" id="switch" name="theme" />
                <label htmlFor="switch"></label>
            </div>
        </>
    )
}