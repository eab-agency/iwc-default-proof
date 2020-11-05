require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const instID = process.env.YOUVISIT_INSTID
  const blogTemplate = path.resolve("./src/templates/location.js")
  const res = await graphql(
    `
      query($instID: String) {
        yv {
          institutions(instID: $instID) {
            locations {
              loc_id
            }
          }
        }
      }
    `,
    { instID: instID }
  )

  res.data.yv.institutions.locations.forEach(location => {
    createPage({
      component: blogTemplate,
      path: `/location/${location.loc_id}`,
      context: {
        locID: `${location.loc_id}`,
        instID: `${instID}`,
      },
    })
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  const instID = process.env.YOUVISIT_INSTID

  deletePage(page)
  // You can access the variable "house" in your page queries now
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
