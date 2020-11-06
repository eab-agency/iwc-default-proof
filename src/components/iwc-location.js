import React, { useEffect } from "react"
// import scriptjs from "scriptjs"
import { PrismCode } from "./prismcode"

const IWClocation = props => {
  const YVSource = "https://www.youvisit.com/tour/Embed/js3"
  const width = props.containerWidth
  const height = props.containerHeight
  const type = props.dataType

  useEffect(() => {
    const script = document.createElement("script")
    script.src = YVSource
    script.async = true
    document.body.appendChild(script)
    const yvObj = window.YVScripts
    yvObj && yvObj.scanEmbeds()

    return () => {}
  }, [])

  useEffect(() => {
    console.log("Type has changed!", type)
    const yvObj = window.YVScripts
    yvObj && yvObj.resetEmbeds() && yvObj.scanEmbeds()
    return () => {}
  }, [type])

  // function scan() {
  //   scriptjs(YVSource, () => {
  //     const yvObj = window.YVScript
  //     yvObj && yvObj.scanEmbeds()
  //   })
  // }

  const iwcstyle = {
    border: "5px solid pink",
    display: "block",
    width: `${width}`,
    height: `${height}px`,
  }

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
      data-type="${props.dataType}">
  Virtual Tour
  </a>
</div>
<script async="async" defer="defer" src="https://www.youvisit.com/tour/Embed/js3"></script>
    `
  let formattedCode
  if (props.showCode) {
    formattedCode = (
      <PrismCode code={codeString} language="html" plugins={["line-numbers"]} />
    )
  }

  return (
    <div>
      {type}
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
          data-type={props.dataType}
        >
          Virtual Tour
        </a>
      </div>
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
  dataType: "inline-embed",
  iwcWidth: "100%",
  iwcHeight: "100%",
  location: "",
  hoverWidth: "90%",
  hoverHeight: "70%",
}
