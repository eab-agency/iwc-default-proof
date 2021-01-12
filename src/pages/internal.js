import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"

const InternalIndexPage = ({ data }) => {
  const institution = data.yv.institutions
  let locations = data.yv.institutions.locations
  return (
    <Layout title={institution.name} locations={locations}>
      <h1 className="institution_name">{institution.name}</h1>
      <ol className="no-numbers">
        {locations.map(location => {
          return (
            <li key={location.loc_id}>
              <Link to={`/internal/location/${location.loc_id}`}>
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

export default InternalIndexPage

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
