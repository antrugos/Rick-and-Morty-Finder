import { useNavigate, useRouteError } from "react-router-dom";
import './errorPage.css';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    const navigate = useNavigate();

    return (
        <div className="background-img">
            <div className="space"></div>
            <div className="wrapper">
                <div className="img-wrapper">
                    <span>44</span>
                </div>
                <p>The page you are trying to search has been <br /> moved to another universe.</p>
                <button type="button" onClick={() => { navigate('/') }}>GET ME HOME</button>
            </div>
        </div>
    );
}