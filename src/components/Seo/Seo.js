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
  const defaultTitle = site.siteMetadata?.title;
  const defaultLang = site.siteMetadata?.lang;

  return (
    <Helmet
      htmlAttributes={{
        lang: defaultLang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
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