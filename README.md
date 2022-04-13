# Gatsby + Netlify CMS Starter

[![Netlify Status](https://api.netlify.com/api/v1/badges/b654c94e-08a6-4b79-b443-7837581b1d8d/deploy-status)](https://app.netlify.com/sites/gatsby-starter-netlify-cms-ci/deploys)

This website is built with Gatsby v3 and hosted with Netlify.

## Prerequisites

- Node (v16 recommended, install using nvm for best results)
- [Gatsby CLI](https://www.gatsbyjs.org/docs/)

### Access Locally

```
$ git clone https://github.com/[GITHUB_USERNAME]/[REPO_NAME].git
$ cd [REPO_NAME]
$ npm install
$ npm run start
```

To test the CMS locally, you'll need run a production build of the site (this doesn't really work):

```
$ npm run build
$ npm run serve
```

### Deploying

The site gets deployed each time a commit is pushed to the master branch on Github or to other branches that can be specified in Netlify (ask Joe for info on the Guild Netlify account).
