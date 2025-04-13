import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from './Typography';

const meta = {
  title: 'ui/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {},
  render: () => {
    return (
        <div>
          <Typography.h1>
            Example
          </Typography.h1>
          <Typography.h2>
            Example h2
          </Typography.h2>
        </div>
    )
  }
};


