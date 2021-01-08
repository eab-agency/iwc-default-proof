import React, { Component } from "react"
import { Link } from "gatsby"

export default class Navigation extends Component {
  state = {
    toggle: false,
  }
  Toggle = () => {
    this.setState({ toggle: !this.state.toggle })
  }

  render() {
    return (
      <div className={this.state.toggle ? "navBar show-nav" : "navBar"}>
        <button className="nav-toggle" onClick={this.Toggle}>
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
}
