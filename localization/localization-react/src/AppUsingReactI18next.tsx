import React from 'react';
import cat from './imgs/cat.jpg';
import './App.css';
import { supportedCultures, SupportedCulturesType } from './locales/localization/supportedCultures';
import { withTranslation } from 'react-i18next';

interface IAppUsingReactI18nextState {
  supportedCultures: SupportedCulturesType,
}

class AppUsingReactI18next extends React.Component<any, IAppUsingReactI18nextState, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      supportedCultures: supportedCultures
    } 
  }

  switchLanguage = (): void => {
    const { i18n } = this.props;
    const nextLocale = i18n.language === 'en-US' ? 'zh-CN' : 'en-US';
    i18n.changeLanguage(nextLocale);
  };

  render(){
    const { t, i18n } = this.props; 
      return (
        <>
          <h1>示例2：使用 i18next + react-i18next</h1>
          <div className="App">
            <h2>{t('App-currLocale') + this.state.supportedCultures[i18n.language]?.name}</h2>
            <button onClick={this.switchLanguage}>{t('App-switch')}</button>
            <div>
              <img src={cat} className="App-logo" alt="cat" />
              <div>{t('App-myCat')}</div>
            </div>
          </div>
        </>
      )}
  }

export default withTranslation()(AppUsingReactI18next);
