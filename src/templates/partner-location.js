import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import IWCLocation from "../components/iwc-location"

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
          <h2>{stop.title}</h2>
          <IWCLocation
            containerWidth="100%"
            containerHeight="500px"
            title={locations.name}
            institution={institution.inst_id}
            dataType="immersive"
            location={locations.loc_id}
            showCode={showCode}
            dataStopid={stop.stopid}
          />
        </div>
      )
    })
  }

  return (
    <Layout title={institution.name}>
      {/* <h2>{locations.name}</h2> */}
      {/* <pre>{JSON.stringify(stops, null, 4)}</pre> */}
      <IWCLocation
        containerWidth="100%"
        containerHeight="500px"
        title={locations.name}
        institution={institution.inst_id}
        dataType="inline-embed"
        location={locations.loc_id}
        showCode={showCode}
      />
      {stops}
      {/* {stops.map((stop, index) => {
        return (
          <p key={index}>
            This is the: {stop.stopid} at index: {index}
          </p>
        )
      })} */}
    </Layout>
  )
}

export default Location
