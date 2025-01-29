require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const instID = process.env.GATSBY_YOUVISIT_INSTID
  const partnerTemplate = path.resolve("./src/templates/partner-location.js")
  const internalTemplate = path.resolve("./src/templates/internal-location.js")
  const allLocationsTemplate = path.resolve("./src/templates/all-locations.js")

  const res = await graphql(
    `
      query ($instID: String) {
        yv {
          institutions(instID: $instID) {
            locations {
              loc_id
              status
              name
            }
          }
        }
      }
    `,
    { instID: instID }
  )
  console.log("⬇️⬇️⬇️⬇️⬇️ - All locations for instID:", instID)
  const locations = res.data.yv.institutions.locations
  locations.forEach((location) => {
    console.log(location.loc_id, location.status)
    if (location.status === "live") {
      createPage({
        component: partnerTemplate,
        path: `/location/${location.loc_id}`,
        context: {
          locID: `${location.loc_id}`,
          instID: `${instID}`,
        },
      })
      createPage({
        component: internalTemplate,
        path: `/internal/location/${location.loc_id}`,
        context: {
          locID: `${location.loc_id}`,
          instID: `${instID}`,
        },
      })
    } else {
      console.log(
        "🛑🛑🛑 ~ location status is not live",
        location.loc_id,
        location.status
      )
    }
  })
  createPage({
    component: allLocationsTemplate,
    path: `/all`,
    context: {
      locations: locations,
    },
  })
  console.log("⬆️⬆️⬆️⬆️⬆️ - All locations for instID:", instID)
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  const instID = process.env.GATSBY_YOUVISIT_INSTID

  deletePage(page)
  // You can access the variable "instID" in your page queries now
  createPage({
    ...page,
    context: {
      ...page.context,
      instID: instID,
    },
  })
}

// ignore /scripjs/ files on build
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scriptjs/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
