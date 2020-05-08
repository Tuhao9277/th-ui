import React from 'react';
import { storiesOf } from '@storybook/react';
storiesOf('Welcome page', module).add(
  'welcome',
  () => {
    return (
      <>
        <h1>欢迎来到 th-ui 组件库</h1>
        <h3>安装试试</h3>
        <code>npm install th-ui --save</code>
        <div>
          <span>项目基于StoryBook搭建，地址</span>
          <a href="https://storybook.js.org/" target="_blank" rel="noopener noreferrer">
            https://storybook.js.org/
          </a>
        </div>
      </>
    );
  },
  { info: { disable: true } },
);
