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
        stops {
          stopid
          title
        }
      }
      institutions(instID: $instID) {
        inst_id
        name
      }
    }
  }
`

const Location = props => {
  const [open, setOpen] = React.useState(false)
  const onClick = () => setOpen(!open)

  const institution = props.data.yv.institutions
  const locations = props.data.yv.locations
  const showCode = process.env.GATSBY_SHOWCODE
  const experience_type = props.data.yv.locations.experience_type
  const allStops = props.data.yv.locations.stops
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
            type=""
            location={locations.loc_id}
            loadStopOnly="1"
            showCode={showCode}
            stopId={stop.stopid}
          />
        </div>
      )
    })
  }

  return (
    <Layout title={institution.name}>
      <h2>{locations.name}</h2>
      <YouVisitIWC
        containerWidth="100%"
        containerHeight="500px"
        title={locations.name}
        institution={institution.inst_id}
        type="inline-embed"
        location={locations.loc_id}
        showCode={showCode}
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
