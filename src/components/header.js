import React from "react"
import { Link } from "gatsby"

import headerStyles from "./header.module.scss"

const Header = ({ title }) => {
  return (
    <header className={headerStyles.header}>
      <h1>
        <Link className={headerStyles.title} to="/">
          {title}
        </Link>
      </h1>
    </header>
  )
}

export default Header
