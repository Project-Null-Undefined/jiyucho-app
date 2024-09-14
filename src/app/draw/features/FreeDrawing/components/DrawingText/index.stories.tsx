import type { Meta, StoryObj } from '@storybook/react';

import DrawingText from '.';

const meta = {
  title: 'draw/DrawingText',
  component: DrawingText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DrawingText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Hello World',
  },
};
