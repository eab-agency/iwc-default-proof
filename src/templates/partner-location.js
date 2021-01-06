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
            title={locations.name}
            institution={institution.inst_id}
            dataType=""
            location={locations.loc_id}
            loadStopOnly="1"
            showCode={showCode}
            dataStopid={stop.stopid}
          />
        </div>
      )
    })
  }
  const iwcstyle = {
    // border: "5px solid pink",
    display: "block",
    width: `100%`,
    height: `400px`,
  }
  return (
    <Layout title={institution.name}>
      <div className="iwc" style={iwcstyle}>
        <a
          href="https://www.youvisit.com"
          className="virtualtour_embed"
          title="Virtual Reality, Virtual Tour"
          data-platform="v"
          data-link-type="immersive"
          data-inst="120207"
          data-stopid="270815"
          data-load-stop-only="1"
          data-hover-width="90%"
          data-hover-height="70%"
          data-image-width="100%"
          data-image-height="100%"
          data-loc="142537"
        >
          Virtual Tour
        </a>
      </div>

      <YouVisitIWC
        containerWidth="100%"
        containerHeight="500px"
        title={locations.name}
        institution={institution.inst_id}
        dataType="inline-embed"
        location={locations.loc_id}
        showCode={showCode}
      />
      {stops}
    </Layout>
  )
}

export default Location
