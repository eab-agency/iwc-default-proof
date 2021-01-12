import React from "react"

import { useState, useEffect } from "react"

import { Link } from "gatsby"

const Navigation = ({ locations }) => {
  const [toggle, setToggle] = useState(false)
  const onClick = () => setToggle(!toggle)
  const [pageUrl, setPage] = useState("not-internal")

  useEffect(() => {
    const url = window.location.href
    if (url.includes("internal")) {
      setPage("internal")
    } else {
      setPage("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navItems =
    locations &&
    locations.map((location, index) => (
      <li key={index}>
        <Link to={`/${pageUrl}/location/${location.loc_id}`}>{location.name}</Link>
      </li>
    ))

  return (
    <div className={toggle ? "navBar show-nav" : "navBar"}>
      <button className="nav-toggle" onClick={onClick}>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </button>
      <nav role="navigation">
        <ul className="no-list">
          <li>
            <Link className="view_all" to="/">
              View All Locations
            </Link>
            <ul>{navItems}</ul>
          </li>
          <li>
            <Link className="embeding_instructions" to="/instructions">
              Embeding Instructions
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
export default Navigation
