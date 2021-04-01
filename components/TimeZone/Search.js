import React, { useEffect, useState } from 'react'
import api from '../../services/worldtimezone'

export const TimeZoneSearch = ({ onSelect }) => {

    const [timeZones, setTimeZones] = useState([])
    const [status, setStatus] = useState("pending") // resolved(ok)|rejected(BAD)|pending(default)
    const [query, setQuery] = useState("")

    const handleSelect = (timezone) => {
        onSelect(timezone)
        setQuery("")
    }
    useEffect(() => {
        api.list()
            .then(setTimeZones)
            .then(() => setStatus("resolved"))
            .catch(() => setStatus("rejected"))
    }, [])

    if (status === "pending") {
        return <input className="searchTerm" placeholder="search TZ..." type="text" disabled value="Loading timeZones..." />
    }
    if (status == "rejected") {
        return <input className="searchTerm" placeholder="search TZ..." type="text" disabled value="Failed to load timeZones..." />
    }
    return (
        <div className="search-box">
            <input className="searchTerm" placeholder="search TZ..." type="text" value={query} onChange={(e) => setQuery(e.target.value)} />

            {timeZones.length && query && (
                <section>
                    {timeZones
                        .filter((timezone = "") => (
                            timezone.toLowerCase().includes(query.toLowerCase())
                        ))
                        .slice(0, 10)
                        .map((timezone) => (
                            <article className="article-timezone"
                                key={timezone}
                                onClick={() => handleSelect(timezone)}
                            >
                                {timezone}
                            </article>
                        ))}
                </section>
            )}
        </div>
    )
}
