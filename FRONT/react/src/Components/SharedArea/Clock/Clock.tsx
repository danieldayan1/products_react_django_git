import { useEffect, useState } from "react";
import "./Clock.css";
import * as React from 'react'

function Clock(): JSX.Element {

    const [now, setNow] = useState<string>();

    useEffect(() => {
        const intervalId = setInterval(() => {
            let time = new Date();
            // now = time.toLocaleTimeString(); 
            setNow(time.toLocaleTimeString());
            console.log(time.toLocaleTimeString());
        }, 1000);

        return () => clearInterval(intervalId)

    }, [])


    return (
            <div className="Clock ">
                {now&& <div className="Box">
                    {now}
                </div>}
            </div> 
    );
}

export default Clock;
