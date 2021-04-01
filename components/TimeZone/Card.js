import React, { useEffect, useState } from 'react'
import api from '../../services/worldtimezone'

const TimeZoneCard = ({ timeZone, onClose, onSelectLocation }) => {
    const [data, setData] = useState(null)
    const [status, setStatus] = useState("pending") // resolved(ok)|rejected(BAD)|pending(default)

    useEffect(() => {
        api.fetchByZone(timeZone)
            .then(setData)
            .then(() => setStatus("resolved"))
            .catch(() => setStatus("rejected"))
    }, [timeZone])
    return (
        <>
            {status === "pending" && <small className="alert-pending">Loading...</small>}
            {status === "rejected" && <small className="alert-failed">Something failed :(</small>}
            {status === "resolved" && data &&
                <div className="card tz">
                    <div className="card-header">
                        <img className="show-map" onClick={() => onSelectLocation(timeZone)} src="/map.svg" />
                        <p >{timeZone} </p>

                        <img onClick={() => onClose(timeZone)} src="/close.svg" />
                    </div>
                    <div className="card-body">

                        <h1>{data.week_number}w</h1>

                        <p>{data.day_of_year}day</p>
                    </div>
                    <div className="card-footer">
                        <img src="/time.svg" />
                        <p>{data.datetime.split('.')[0]}</p>
                    </div>
                </div>
            }
        </>
    )
}

export default TimeZoneCard
