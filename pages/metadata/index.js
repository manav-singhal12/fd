import Head from 'next/head';

const MetaData = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};

const Page = () => {
  const metadata = {
    title: "Best Styling Products",
    description: "Find best styling products from here",
  };

  return (
    <div>
      <MetaData title={metadata.title} description={metadata.description} />
      <h1>{metadata.title}</h1>
      <p>{metadata.description}</p>
      {/* Other content for your page */}
    </div>
  );
};

export default Page;
