import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"

const IndexPage = ({ data }) => {
  const institution = data.yv.institutions
  // turn LOCATIONS into an array
  // const filtered_locations_arr = process.env.LOCATIONS.split(",")
  let locations = data.yv.institutions.locations
  let filtered_locations_arr = process.env.GATSBY_LOCATIONS
  if (
    // first check if env variable is set
    filtered_locations_arr === undefined ||
    filtered_locations_arr.length === 0
  ) {
    console.log(locations)
  } else {
    filtered_locations_arr = filtered_locations_arr.split`,`.map(x => +x)
    locations = locations.filter(el => {
      return filtered_locations_arr.some(f => {
        return f === el.loc_id
      })
    })
  }

  return (
    <Layout title={institution.name} locations={locations}>
      <h1 className="institution_name">{institution.name}</h1>
      <ol className="no-numbers">
        {locations.map(location => {
          return (
            <li key={location.loc_id}>
              <Link to={`/location/${location.loc_id}`}>
                <figure>
                  <img src={location.cover_photo.thumb} alt={location.name} />
                </figure>
                <div className="location_content">
                  <h2>{location.name}</h2>
                  <div className="location_data">
                    <div className="update_date">{location.update_date}</div>
                    <div
                      className="experience_type"
                      data-experience-type={location.experience_type}
                    >
                      {location.experience_type}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query($instID: String) {
    yv {
      institutions(instID: $instID) {
        inst_id
        name
        locations {
          loc_id
          name
          update_date
          experience_type
          cover_photo {
            thumb
            full
          }
        }
      }
    }
  }
`
