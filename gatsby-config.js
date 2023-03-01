module.exports = {
  // pathPrefix: `/proof/${process.env.YOUVISIT_INSTID}`,
  // info We're shipping new features! For final testing, we're rolling them out first to a small % of Gatsby users
  // and your site was automatically chosen as one of them. With your help, we'll then release them to everyone in the next minor release.
  siteMetadata: {
    title: "IWC Proofs",
  },
  plugins: [
    "gatsby-plugin-sass",
    'gatsby-plugin-netlify',
    {
      resolve: `gatsby-source-graphql`,
      options: {
        fieldName: `yv`,
        url: `https://graphql.youvisit.com/`,
        typeName: `YV`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Montserrat\:300,500,600,700,800`,
          `Hepta Slab\:600`, // you can also specify font weights and styles
        ],
        display: "swap",
      },
    },
  ],
}
