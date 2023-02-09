import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Chat from './Chat';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Chat example',
  component: Chat,
} as ComponentMeta<typeof Chat>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Chat> = () => <Chat />;

export const ChatPrimary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//   primary: true,
//   label: 'Button',
// };

