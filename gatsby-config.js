module.exports = {
  // pathPrefix: `/proof/${process.env.YOUVISIT_INSTID}`,
  // info We're shipping new features! For final testing, we're rolling them out first to a small % of Gatsby users
  // and your site was automatically chosen as one of them. With your help, we'll then release them to everyone in the next minor release.

  // We greatly appreciate your help testing the change. Please report any feedback good or bad in the umbrella issue. If you do encounter problems,
  //  please disable the flag by setting it to false in your gatsby-config.js like:
  flags: {
    DEV_SSR: false,
  },
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
        ],
        display: "swap",
      },
    },
  ],
}
