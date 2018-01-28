import { configure } from '@storybook/react';

const req = require.context('../src', true, /\.story.tsx$/);

const loadStories = () => {
  req.keys().forEach((filename) => req(filename));
};

configure(loadStories, module);
