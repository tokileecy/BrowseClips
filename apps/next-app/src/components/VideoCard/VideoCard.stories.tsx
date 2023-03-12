import React from 'react';
import { Story, Meta } from '@storybook/react';
import VideoCard, { VideoCardProps } from './VideoCard';

export default {
  title: 'components/VideoCard',
  component: VideoCard,
} as Meta;

const Template: Story<VideoCardProps> = (args) => {
  return <VideoCard {...args} />;
};

export const Normal = Template.bind({});

Normal.args = {
  id: '33',
  thumbnails: undefined,
  title: 'title',
};
