import React from 'react';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import PrevNext from '../components/prevnext';
import SEO from '../components/SEO';

function BlogPost(props) {
  const url = props.data.site.siteMetadata.siteUrl;
  const thumbnail = props.data.markdownRemark.frontmatter.image &&
    props.data.markdownRemark.frontmatter.image.childImageSharp.resize.src;
  const { title, image } = props.data.markdownRemark.frontmatter;
  const { prev, next } = props.pageContext;

  return (
    <Layout>
      <SEO
        title={title}
        description={props.data.markdownRemark.excerpt}
        thumbnail={thumbnail && url + thumbnail}
        url={url}
        pathname={props.location.pathname}
      />
      <div>
        <h1>{title}</h1>
        {image && <Img fluid={image.childImageSharp.fluid} />}
        <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} />
        <PrevNext prev={prev && prev.node} next={next && next.node} />
      </div>
    </Layout>
  )
}

export default BlogPost;
export const query = graphql`

query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
        html
        excerpt
        frontmatter {
         title
         image {
           childImageSharp {
             resize(width: 1000, height: 420) {
               src
             }
             fluid(maxWidth: 786) {
               ...GatsbyImageSharpFluid
             }
           }
         }
      }
    }
    site {
        siteMetadata {
          defaultTitle: title
          titleTemplate
          defaultDescription: description
          siteUrl: url
          defaultImage: image
          twitterUsername
        }
    }
}
`