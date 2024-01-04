import type { Meta, StoryObj } from '@storybook/react';
import navBar from './navBar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: '2. Molecules/nav/navBar',
  component: navBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    label: { control: { type: 'select' } },
    // children: { control: { type: 'text' } },
  },
} satisfies Meta<typeof navBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {},
};

export const Place: Story = {
  args: {
    label: '장소',
  },
};
export const PlaceTextarea: Story = {
  args: {
    placeblock: true,
    label: '후기',
  },
};
export const CommentTextarea: Story = {
  args: {
    label: '후기',
  },
};
export const Rating: Story = {
  args: {
    label: '별점',
  },
};
