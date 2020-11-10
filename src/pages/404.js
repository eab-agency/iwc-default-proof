import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"

const FourOFourPage = ({ data }) => {
  const name = data.yv.institutions.name

  return (
    <Layout title={name}>
      <h1>404: Not Found</h1>
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default FourOFourPage

export const query = graphql`
  query($instID: String) {
    yv {
      institutions(instID: $instID) {
        name
      }
    }
  }
`
