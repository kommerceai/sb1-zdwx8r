import React from 'react';
import { Builder, BuilderComponent, builder } from '@builder.io/react';

// Replace with your actual Builder.io API key
builder.init('YOUR_BUILDER_API_KEY');

const DemoLandingPageBuilder: React.FC = () => {
  return (
    <div className="demo-landing-page-builder">
      <h1>Demo Landing Page Builder</h1>
      <BuilderComponent model="page" />
    </div>
  );
};

// Register custom components
Builder.registerComponent(
  ({ text }) => <h1>{text}</h1>,
  {
    name: 'Heading',
    inputs: [{ name: 'text', type: 'text' }],
  }
);

Builder.registerComponent(
  ({ text }) => <p>{text}</p>,
  {
    name: 'Paragraph',
    inputs: [{ name: 'text', type: 'longText' }],
  }
);

Builder.registerComponent(
  ({ url, altText }) => <img src={url} alt={altText} />,
  {
    name: 'Image',
    inputs: [
      { name: 'url', type: 'url' },
      { name: 'altText', type: 'text' },
    ],
  }
);

export default DemoLandingPageBuilder;