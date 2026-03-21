import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type, image }) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title} | Sarthak - Full Stack Developer</title>
      <meta name='description' content={description} />
      <link rel="canonical" href={window.location.href} />

      {/* Facebook / Open Graph (For link previews) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || '/og-default.png'} />

      {/* Twitter (For X/Twitter cards) */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;