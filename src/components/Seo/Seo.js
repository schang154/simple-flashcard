import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";


const Seo = ({ meta, title }) => {
  const { site } = useStaticQuery( 
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            lang
          }
        }
      }
    `
  );
  
  const metaDescription = site.siteMetadata?.description;
  const defaultTitle = site.siteMetadata?.title | title;
  const defaultLang = site.siteMetadata?.lang;
  const url = `https://simpleflashcard.gatsbyjs.io/`;

  return (
    <Helmet
      htmlAttributes={{
        lang: defaultLang,
      }}
      title={defaultTitle}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: defaultTitle,
        },
        {
          property: `og:url`,
          content: url,
        },
        {
          property: `og:site_name`,
          content: defaultTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
      ].concat(meta)}
    />
  );

};

Seo.defaultProps = {
  meta: [],
  description: ``,
}

export default Seo;