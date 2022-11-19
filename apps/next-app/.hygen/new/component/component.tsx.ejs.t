---
to: <%= absPath %>/<%= Component_name %>.tsx
---
import React, { ReactNode } from 'react';

export interface <%= Component_name %>Props {
  children?: ReactNode;
}

export default function <%= Component_name %>(props: <%= Component_name %>Props) {
  const { children } = props;

  return (<div>{children}</div>);
}
