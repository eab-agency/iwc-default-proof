module.exports = {
  // pathPrefix: `/proof/${process.env.YOUVISIT_INSTID}`,
  siteMetadata: {
    title: "IWC Proofs",
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-source-graphql`,
      options: {
        fieldName: `yv`,
        url: `https://graphql.youvisit.com/`,
        typeName: `YV`,
        refetchInterval: 60,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Montserrat\:300,500,600,700,800`,
          `Hepta Slab\:600`, // you can also specify font weights and styles
          `sans-serif`,
        ],
        display: "swap",
      },
    },
  ],
}
