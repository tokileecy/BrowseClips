---
to: <%= absPath %>/<%= Component_name %>.stories.tsx
---
import React from 'react'
import { Story, Meta } from '@storybook/react'
import <%= Component_name %>, { <%= Component_name %>Props } from './<%= Component_name %>'

export default {
  title: 'components/<%= Component_name %>',
  component: <%= Component_name %>,
} as Meta

const Template: Story<<%= Component_name %>Props> = (args) => {
  return <<%= Component_name %> {...args} />
}

export const Normal = Template.bind({})

Normal.args = {
  children: '<%= component_name %>',
}
