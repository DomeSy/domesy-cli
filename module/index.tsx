import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components';
import './index.less'

import Props from './interface.d';

const Index: React.FC<Props> = ({}) => {

  const [content, setContent] = useState<string>('');

  useEffect(() => {
    setContent('我是提示语')
  }, []);

  return (
    <PageLayout
      content={
        content
      }
    >
      我是内容
    </PageLayout>
  );
};

export default Index;
