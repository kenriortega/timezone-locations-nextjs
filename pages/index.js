import { Footer } from '../components/Footer'
import SchemeColorSwitcher from '../components/SchemeColorSwitcher'
import { TimeZoneSearch } from '../components/TimeZone/Search'
import TimeZoneCard from '../components/TimeZone/Card'
import MapBox from '../components/Ipinfo/MapBox'
import { useState } from "react";

export default function Home() {


  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const [timeZones, setTimeZones] = useState([currentTimeZone])
  const [location, setLocation] = useState(null)

  const handleAddTZ = (timeZone = "") => {
    setTimeZones(timeZones => timeZones.concat(timeZone))
  }
  const handleRemoveTZ = (timeZone = "") => {
    setTimeZones(
      timeZones => timeZones
        .filter(_timeZone => _timeZone !== timeZone)
    )
  }
  const handleFindIPInfo = (_location) => {
    setLocation(_location.split("/")[1])
  }


  return (
    <div>
      <header className="header-timezone">
        <h1 className="title">TimeZone Dashboard</h1>
        <h3 className="text">Total TimeZones #{timeZones.length}</h3>
        <TimeZoneSearch onSelect={handleAddTZ} />
      </header>
      <main className="main-timezone">
        <div className="main-title">
          <SchemeColorSwitcher />
        </div>
        <section className="card-section">
          {timeZones.map(timeZone => (
            <TimeZoneCard
              key={timeZone}
              timeZone={timeZone}
              onClose={handleRemoveTZ}
              onSelectLocation={handleFindIPInfo} />
          ))}
        </section>

        {timeZones.length !== 0 &&
          <section>
            {location !== null && <MapBox location={location} />}
          </section>
        }

      </main>
      <Footer />
    </div>
  )
}
