module.exports = {
  // pathPrefix: `/proof/${process.env.YOUVISIT_INSTID}`,
  siteMetadata: {
    title: "IWC Proofs",
  },
  plugins: [
    "gatsby-transformer-remark",
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
  ],
}
