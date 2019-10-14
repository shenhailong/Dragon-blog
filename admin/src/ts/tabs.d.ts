import * as React from 'react';

export interface tabData {
  tab: string | undefined;
  key: string | undefined;
  path?: string;
  locale: string | undefined;
  closable: boolean;
  content: any;
}

export interface insideAddTabData {
  title: string;
  content: string | React.ReactNode;
  key: string;
  closable: boolean;
  id? : string | number;
}
