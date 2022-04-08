var proxy = require("http-proxy-middleware");

module.exports = {
  siteMetadata: {
    title: "The Washington Post Guild",
    titleTemplate: "%s | The Washington Post Guild",
    description:
      "The Washington Post Newspaper Guild has been a voice for employees at the company since 1934. We represent 1,000 people across the newsroom and in our commercial operations — including award-winning journalists and the talented marketing, advertising and printing plant staff that help readers and watchers find their work.",
    url: "https://postguild.org",
    image: "/img/guildlogo-og.jpg",
    twitterUsername: "@postguild"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        // useResolveUrlLoader: {
        //   options: {
        //     debug: true,
        //   },
        // },
      }
    },
    "gatsby-plugin-sharp",
    `gatsby-plugin-fontawesome-css`,
    "gatsby-remark-images",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/mdxPages`,
        name: "mdxPages"
      }
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads"
            }
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              linkImagesToOriginal: false,
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 650
            }
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static"
            }
          }
          //   ,
          //   {
          //       resolve: "gatsby-remark-autolink-headers",
          //       options: {
          //           elements: ['h3']
          //       }
          //   }
        ]
      }
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images"
      }
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    // {
    //   resolve: "gatsby-plugin-purgecss", // purges all unused/unreferenced css rules
    //   options: {
    //     develop: false, // Activates purging in npm run develop
    //     purgeOnly: ["/all.scss"] // applies purging only on the bulma css file
    //   }
    // }, // must be after other CSS plugins
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ],
  // for avoiding CORS while developing Netlify Functions locally
  // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": ""
        }
      })
    );
  }
};
