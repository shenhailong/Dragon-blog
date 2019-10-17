import React, { PureComponent } from 'react';
import { insideAddTabData }from '@/ts/tabs';
import { employee } from '@/ts/employee';
import List from './list/list';
import Edit from './list/edit';
import Detail from './list/detail';
import MyTabs from '@/components/InsideTabs';
import NewTabs from '@/extends/insideTabs';

interface IOwnProps {}

interface IDispatchProps {}

interface IStates {
  tabListKey: string[];
  activeKey: string;
  panes: insideAddTabData[];
}

type IProps = IOwnProps & IDispatchProps;

interface Index {
  props: IProps;
  state: IStates;
}

class Index extends NewTabs {
  constructor(props: Readonly<IProps>) {
    super(props);
    const panes = [{
      title: '文章列表',
      content: this.renderTab('List'),
      key: 'List',
      closable: false
    }];
    this.state = {
      activeKey: panes[0].key,
      panes,
      tabListKey: []
    };
  }

  renderTab = (type: string | React.ReactNode, id?: string | number) => {
    let component = null
    switch (type) {
      case 'List':
        component = <List addTabHandler={this.addTabHandler}/>;
        break;
      case 'Edit':
        component = <Edit id={id} removeTabHandler={this.remove}/>;
        break;
      case 'Detail':
        component = <Detail />;
        break;
    }
    return (
      component
    )
  }

  render() {
    return (
      <MyTabs
        panes={this.state.panes}
        remove={this.remove}
        activeKey={this.state.activeKey}
        onChange={this.onChange}/>
    );
  }
}

export default Index
