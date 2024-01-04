import type { Meta, StoryObj } from '@storybook/react';

import { MainWrapper } from './MainWrapper';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: '1. Atoms/Wrapper/MainWrapper',
  component: MainWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: { type: 'text' } },
    primary: { control: { type: 'boolean' } },
    round: { control: { type: 'select' } },
  },
} satisfies Meta<typeof MainWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: 'test',
    primary: true,
  },
};

export const ALL: Story = {
  args: {
    children: 'test',
    round: 'all',
  },
};

export const Top: Story = {
  args: {
    children: 'test',
    round: 'top',
  },
};

export const Bottom: Story = {
  args: {
    children: 'test',
    round: 'bottom',
  },
};
