import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { YouVisitIWC } from "@ux_bob/yv-iwc"

export const query = graphql`
  query($locID: String, $instID: String) {
    yv {
      locations(locID: $locID) {
        loc_id
        name
        experience_type
        update_date
        stops {
          stopid
          title
        }
      }
      institutions(instID: $instID) {
        inst_id
        name
        locations {
          experience_type
          privacy
          status
          loc_id
          name
        }
      }
    }
  }
`

const Location = props => {
  const [open, setOpen] = React.useState(false)
  const onClick = () => setOpen(!open)

  const institution = props.data.yv.institutions
  const location = props.data.yv.locations
  const locations = props.data.yv.institutions.locations
  const showCode = process.env.GATSBY_SHOWCODE
  const experience_type = props.data.yv.locations.experience_type
  const allStops = props.data.yv.locations.stops
  let type = "inline-embed"
  if (experience_type === "vt") {
    type = "hover-panel"
  }
  let stops = ""
  if (experience_type === "vt") {
    stops = allStops.map((stop, index) => {
      return (
        <div key={index}>
          <h3>{stop.title}</h3>
          <YouVisitIWC
            containerWidth="100%"
            containerHeight="500px"
            title={stop.title}
            institution={institution.inst_id}
            type="hover-panel"
            location={location.loc_id}
            loadStopOnly="1"
            showCode={showCode}
            stopId={stop.stopid}
          />
        </div>
      )
    })
  }

  return (
    <Layout title={institution.name} locations={locations}>
      <header className="location_header">
        <div className="location">
          <div
            className="experience_type"
            data-experience-type={location.experience_type}
          >
            {location.experience_type}
          </div>
          <h1 className="location_name">{location.name}</h1>
        </div>
        <div className="update_date">{location.update_date}</div>
      </header>

      <YouVisitIWC
        containerWidth="100%"
        containerHeight="500px"
        title={location.name}
        institution={institution.inst_id}
        type={type}
        location={location.loc_id}
        showCode={showCode}
        updateDate={location.update_date}
        experienceType={location.experience_type}
      />
      {experience_type === "vt" ? (
        <button value="Show Stops" onClick={onClick}>
          {open ? "Hide Stops" : "Show Stops"}
        </button>
      ) : null}
      {open ? stops : null}
    </Layout>
  )
}

export default Location
