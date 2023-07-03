/* React Helmet Async is a library that allows you to dynamically manage and control the contents of the document head (title, meta tags, etc.) in a React application. It is an asynchronous version of the popular library called React Helmet. */

/* React Helmet Async provides a convenient way to modify the document head from within your React components. It allows you to dynamically set the page title, add or modify meta tags, set the favicon, manage the viewport, and perform various other operations related to the document head. */

import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'MERN-Starter Web App',
  description: 'Description for the web',
  keywords: 'mern app, full stack app, mernstack',
};

export default Meta;