import "./Loading.css";
import loading from "../../../Assets/images/loading-gif.gif";
import * as React from 'react'

function Loading(): JSX.Element {
    return (
        <div className="Loading">
            <img src={loading} />
        </div>
    );
}

export default Loading;
