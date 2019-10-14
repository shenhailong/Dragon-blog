import React, { PureComponent } from 'react';
import { insideAddTabData }from '@/ts/tabs'

interface IOwnProps {}

interface IDispatchProps {}

interface IStates {
  tabListKey: string[];
  activeKey: string;
  panes: insideAddTabData[];
}

type IProps = IOwnProps & IDispatchProps;

class Index extends PureComponent<IProps, IStates> {
  [key: string]: any

  onChange = (activeKey: any) => {
    this.setState({ activeKey });
  };

  addTabHandler = (data: insideAddTabData) => {
    const { panes, tabListKey } = this.state;
    if(!tabListKey.includes(data.key)){
      panes.push({
        title: data.title,
        content: this.renderTab(data.content, data.id),
        key: data.key,
        closable: data.closable
      });
      this.setState({
        panes: [...panes],
        activeKey: data.key,
        tabListKey:[...tabListKey, data.key]
      }, () => {
        this.state.panes
      });
    }else{
      this.setState({
        activeKey: data.key
      });
    }
  }

  onEdit = (targetKey: any, action: string) => {
    this[action](targetKey);
  };

  remove = (targetKey: string) => {
    let { activeKey } = this.state;
    let lastIndex = 0;
    this.state.panes.forEach((pane: insideAddTabData, i: number) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter((pane: insideAddTabData) => pane.key !== targetKey);
    const tabListKey = this.state.tabListKey.filter((key: string) => key !== targetKey);

    if (activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({
      panes: [...panes],
      activeKey,
      tabListKey
    });
  };

}

export default Index
