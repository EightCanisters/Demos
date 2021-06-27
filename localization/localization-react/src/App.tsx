import React from 'react';
import cat from './imgs/cat.jpg';
import './App.css';
import { LocalContext } from './locales/localeContext';
import { SupportedCulturesType } from './locales/localization/supportedCultures';

interface IAppState {
  currLanguage: string,
  supportedCultures: SupportedCulturesType,
}

class App extends React.Component<any, IAppState, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currLanguage: 'en-US',
      supportedCultures: {}
    } 
  }

  componentDidMount() {
    const cultures = this.context.getSupportedCultures()
    this.setState({
      supportedCultures: cultures
    })
  }

  switchLanguage = (): void => {
    const { changeLanguage, getCurrentLocale } = this.context;
    const nextLocale = getCurrentLocale() === 'en-US' ? 'zh-CN' : 'en-US';
    changeLanguage(nextLocale).then(
      () => this.setState({currLanguage: nextLocale})
    );
  };

  render(){
    const { getString } = this.context;
    return (
      <>
        <h1>示例1：使用i18next</h1>
        <div className="App">
          <h2>{getString('App-currLocale') + this.state.supportedCultures[this.state.currLanguage]?.name}</h2>
          <button onClick={this.switchLanguage}>{getString('App-switch')}</button>
          <div>
            <img src={cat} className="App-logo" alt="cat" />
            <div>{getString('App-myCat')}</div>
          </div>
        </div>
      </>
    )}
  }

App.contextType = LocalContext;

export default App;
