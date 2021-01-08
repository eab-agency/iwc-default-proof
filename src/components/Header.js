import React from "react"
import { useState, useEffect } from "react"
import { Link } from "gatsby"
import eablogo from "../images/eab-logo-color.svg"
import Navigation from "./Navigation"
import "../styles/index.scss"

const Header = ({ title }) => {
  const [pageUrl, setPage] = useState("landing")

  useEffect(() => {
    var url = window.location.href
    if (
      url.includes("location") ||
      url.includes("internal") ||
      url.includes("instructions")
    ) {
      setPage("not-landing")
    } else {
      setPage("landing")
    }
  }, [])

  return (
    <header
      className="site_header"
      data-page-name={pageUrl === "landing" ? "landing-page" : "location"}
    >
      <div className="eab_logo">
        <img src={eablogo} alt="EAB Global" />
        <div className="agency_services">Agency Services</div>
      </div>
      <div className="partner">
        <Link className="partner_name" to="/">
          {title}
        </Link>
      </div>
      <Navigation />
    </header>
  )
}

export default Header
