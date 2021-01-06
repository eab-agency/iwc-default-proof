import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import IWCModifyForm from "../components/iwcModifyForm"
import { YouVisitIWC } from "@ux_bob/yv-iwc"

const HotSpot = ({ hotspot }) => {
  return (
    <li className="hotspot">
      <h3>{hotspot.title}</h3>
      <p>id: {hotspot.id}</p>
      {hotspot.description !== "" ? (
        <p>
          <span>
            description:{" "}
            <span dangerouslySetInnerHTML={{ __html: hotspot.description }} />
          </span>
        </p>
      ) : null}
      {hotspot.media_items.map(media_item => {
        return <MediaItems media_item={media_item} />
      })}
    </li>
  )
}

const MediaItems = ({ media_item }) => {
  return (
    <li className="media_item">
      <img src={media_item.mediumurl} alt={media_item.video_type} />
      <p>item_type: {media_item.item_type}</p>
      <p>video_type: {media_item.video_type}</p>

      {/* <pre>{JSON.stringify({ media_item }, null, 4)}</pre> */}
      {media_item.description !== "" ? (
        <p>
          <span>
            description:{" "}
            <span
              dangerouslySetInnerHTML={{ __html: media_item.description }}
            />
          </span>
        </p>
      ) : null}
      {media_item.item_type === "video" && (
        <div>
          <p>Title: {media_item.video.title}</p>
          <video width="100%" controls>
            <source src={media_item.video.url} type="video/mp4" />
            <track default kind="captions" srclang="en" src="" />
            {/* <source src="movie.ogg" type="video/ogg" /> */}
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </li>
  )
}

const Location = props => {
  const [width, setWidth] = useState()
  const [type, setType] = useState("inline-embed")
  const [height, setHeight] = useState(250)

  const institution = props.data.yv.institutions
  const locations = props.data.yv.locations

  return (
    <Layout title={"INTERNAL: " + institution.name}>
      <h2>{locations.name}</h2>
      <IWCModifyForm
        updateWidth={setWidth}
        updateType={setType}
        updateHeight={setHeight}
      />
      <YouVisitIWC
        containerWidth={width}
        containerHeight={height}
        title={locations.name}
        institution={institution.inst_id}
        type={type}
        location={locations.loc_id}
        showCode="true"
        description={locations.description}
        uploadDate={locations.live_date}
        thumb={locations.cover_photo.thumb}
      />
      <h2>Interactive Media Elements</h2>

      <ol className="panorama">
        {locations.panoramas.map(panorama => {
          return (
            <li key={panorama.id}>
              <h2>{panorama.mediaType}</h2>
              <img src={panorama.mediumurl} alt={panorama.title} />
              <ol className="no-numbers">
                {panorama.hotspots.map(hotspot => {
                  return <HotSpot hotspot={hotspot} />
                })}
              </ol>
            </li>
          )
        })}
      </ol>

      {/* <HotSpot data={locations} /> */}

      <pre>{JSON.stringify(locations, null, 4)}</pre>
    </Layout>
  )
}

export default Location

export const query = graphql`
  query($locID: String, $instID: String) {
    yv {
      locations(locID: $locID) {
        loc_id
        name
        unique_id
        experience_type
        inst_unique_id
        description
        live_date
        cover_photo {
          thumb
        }
        panoramas {
          description
          id
          mediaType
          mediumurl
          title
          hotspots {
            id
            title
            description
            media_items {
              description
              item_type
              video_type
              mediumurl
              video {
                create_time
                title
                url
                description
                playback_type
                type
              }
            }
          }
        }
      }
      institutions(instID: $instID) {
        inst_id
        name
      }
    }
  }
`
