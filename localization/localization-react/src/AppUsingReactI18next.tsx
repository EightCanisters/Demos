import React from 'react';
import cat from './imgs/cat.jpg';
import './App.css';
import { LocalContext } from './locales/localeContext';
import { SupportedCulturesType } from './locales/localization/supportedCultures';
import { withTranslation } from 'react-i18next';

interface IAppUsingReactI18nextState {
  currLanguage: string,
  supportedCultures: SupportedCulturesType,
}

class AppUsingReactI18next extends React.Component<any, IAppUsingReactI18nextState, any> {
  constructor(props: any) {
    super(props);
    console.log(props)
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
    const { t } = this.props;
 
      return (
        <>
          <h1>示例2：使用 i18next + react-i18next</h1>
          <div className="App">
            <h2>{t('App-currLocale') + this.state.supportedCultures[this.state.currLanguage]?.name}</h2>
            <button onClick={this.switchLanguage}>{t('App-switch')}</button>
            <div>
              <img src={cat} className="App-logo" alt="cat" />
              <div>{t('App-myCat')}</div>
            </div>
          </div>
        </>
      )}
  }

  AppUsingReactI18next.contextType = LocalContext;

export default withTranslation()(AppUsingReactI18next);
