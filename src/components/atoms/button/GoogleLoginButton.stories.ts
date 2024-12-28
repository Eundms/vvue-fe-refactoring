import type { Meta, StoryObj } from '@storybook/react';

import { GoogleLoginButton } from './GoogleLoginButton';

const meta = {
  title: '1. Atoms/Button/GoogleLoginButton',
  component: GoogleLoginButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof GoogleLoginButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
