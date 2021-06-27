import React from 'react';
import cat from './imgs/cat.jpg';
import './App.css';
import { LocalContext } from './locales/localeContext';
import { SupportedCulturesType } from './locales/localization/supportedCultures';

// export enum Languages {
//   'en-US' = 'en-US',
//   'zh-CN' = 'zh-CN'
// }

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

  async componentDidMount() {
    const cultures = await this.context.loadSupportedCultures()
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
      <div className="App">
        <h1>{getString('App-currLocale') + this.state.supportedCultures[this.state.currLanguage]?.name}</h1>
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
