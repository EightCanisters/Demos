import React from 'react';
import cat from './imgs/cat.jpg';
import './App.css';
import { LocalContext } from './locales/localeContext';

export enum Languages {
  'en-US' = 'en-US',
  'zh-CN' = 'zh-CN'
}

interface IAppState {
  currLanguage: Languages,
}

class App extends React.Component<any, IAppState, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currLanguage: Languages['en-US'],
    } 
  }

  switchLanguage = (): void => {
    const { changeLanguage, getCurrentLocale } = this.context;
    const nextLocale = getCurrentLocale() === Languages['en-US'] ? Languages['zh-CN'] : Languages['en-US'];
    changeLanguage(nextLocale).then(
      () => this.setState({currLanguage: nextLocale})
    );
  };

  render(){
    const { getString } = this.context;
    return (
      <div className="App">
        <h1>{getString('App-currLocale') + this.state.currLanguage}</h1>
        <button onClick={this.switchLanguage}>{getString('App-switch')}</button>
        <div>
          <img src={cat} className="App-logo" alt="cat" />
          <div>{getString('App-myCat')}</div>
        </div>
      </div>
    )}
  }

App.contextType = LocalContext;

export default App;
