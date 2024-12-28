import type { Meta, StoryObj } from '@storybook/react';
import { PlanTitleText } from './PlanTitleText';

PlanTitleText

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: '1. Atoms/Text/PlanTitleText',
  component: PlanTitleText,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: { type: 'text' } }
  },
} satisfies Meta<typeof PlanTitleText>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PlanTitle: Story = {
  args: {
    children: 'test'
  },
};