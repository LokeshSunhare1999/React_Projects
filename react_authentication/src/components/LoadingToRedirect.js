import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'


function LoadingToRedirect() {
    const [count, setCount] = useState(3);
    const history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)
        count === 0 && history.push("/login");
        return () => clearInterval(interval);
    }, [count, history])
    return (
        <div>
            <p>Redirecting you in {count} seconds</p>
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default LoadingToRedirect
