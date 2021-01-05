/* eslint no-undef: 0 */

import React, { useEffect } from "react"
import { PrismCode } from "./YouVisitIWC/prismcode"
import useScript from "./YouVisitIWC/useScript"

const IWClocation = props => {
  const YVSource = "https://www.youvisit.com/tour/Embed/js3"
  const status = useScript(YVSource)

  const width = props.containerWidth
  const height = props.containerHeight
  // const type = props.dataType

  useEffect(() => {
    const yvObj = window.YVScript
    if (status === "ready") {
      yvObj && yvObj.scanEmbeds()
    }
  })

  const iwcstyle = {
    // border: "5px solid pink",
    display: "block",
    width: `${width}`,
    height: `${height}`,
  }
  let stopid
  if (typeof props.dataStopid !== "undefined") {
    stopid = `data-stopid="${props.dataStopid}"`
  } else {
    stopid = ""
  }
  const dataType = props.dataType && `data-type="${props.dataType}"`

  const codeString = `
<div style="height: ${props.containerHeight}; width: ${props.containerWidth}">
  <a href="https://www.youvisit.com"
      className="virtualtour_embed"
      title="${props.title}"
      data-platform="v"
      data-link-type="${props.linkType}"
      data-inst="${props.institution}"
      data-image-width="${props.iwcWidth}"
      data-image-height="${props.iwcHeight}"
      data-loc="${props.location}"
      data-hover-width="${props.hoverWidth}"
      data-hover-height="${props.hoverHeight}"
      ${dataType}
      ${stopid}
      >
  Virtual Tour
  </a>
</div>
<script async="async" defer="defer" src="https://www.youvisit.com/tour/Embed/js3"></script>
    `

  let formattedCode
  if (props.showCode === "true") {
    formattedCode = (
      <PrismCode code={codeString} language="html" plugins={["line-numbers"]} />
    )
  }

  return (
    <div>
      <div className="iwc" style={iwcstyle}>
        <a
          href="https://www.youvisit.com"
          className="virtualtour_embed"
          title={props.title}
          data-platform="v"
          data-link-type={props.linkType}
          data-inst={props.institution}
          data-image-width={props.iwcWidth}
          data-image-height={props.iwcHeight}
          data-loc={props.location}
          data-hover-width={props.hoverWidth}
          data-hover-height={props.hoverHeight}
          data-stopid={props.dataStopid}
          dataType
          stopid
        >
          Virtual Tour
        </a>
      </div>
      <p>{props.updateDate}</p>
      {formattedCode}
    </div>
  )
}

export default IWClocation

IWClocation.defaultProps = {
  containerHeight: "300px",
  containerWidth: "100%",
  title: "Launch Experience",
  linkType: "immersive",
  iwcWidth: "100%",
  iwcHeight: "100%",
  location: "",
  hoverWidth: "90%",
  hoverHeight: "70%",
  updateDate: "",
}
