import React, { PureComponent } from 'react';
import { Tabs } from 'antd';
import { insideAddTabData }from '@/ts/tabs'

const { TabPane } = Tabs;
interface IOwnProps {
  panes: insideAddTabData[];
  activeKey: string;
  onChange: (key: string) => void;
  remove: (key: string) => void;
}

interface IDispatchProps {}

interface IStates {
  tabListKey: string[];
  activeKey: string;
  panes: insideAddTabData[];
}

type IProps = IOwnProps & IDispatchProps;

class Index extends PureComponent<IProps, IStates> {
  [key: string]: any
  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      activeKey: '',
      tabListKey: [],
      panes: []
    };
  }

  componentDidMount() {
    this.setState({
      panes: [...this.props.panes],
      activeKey: this.props.activeKey
    })
  }

  componentWillReceiveProps(nextProps: any) {
    if(this.state.panes.length !== nextProps.panes.length){
      this.setState({
        panes: [...nextProps.panes]
      })
    }
    if(this.state.activeKey !== nextProps.activeKey){
      this.setState({
        activeKey: nextProps.activeKey
      })
    }
  }

  onChange = (activeKey: any) => {
    this.props.onChange(activeKey)
  };

  onEdit = (targetKey: any, action: string) => {
    this[action](targetKey);
  };

  remove = (targetKey: any) => {
    this.props.remove(targetKey)
  };

  render() {
    const { panes, activeKey } = this.state
    return (
      <div>
        <Tabs
          hideAdd={true}
          onChange={this.onChange}
          activeKey={activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {panes.map((pane: insideAddTabData) => (
            <TabPane
              tab={pane.title}
              key={pane.key}
              closable={pane.closable}>
              {pane.content}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default Index
