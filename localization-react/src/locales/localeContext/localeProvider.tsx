import React from "react";
import { LocalContext } from ".";
import { Localization } from "../localization";

// export const localization = new Localization();

interface ILocalizationProvider {
    readonly locale: Localization;
    readonly children?: React.ReactNode;
}

export class LocalizationProvider extends React.Component<ILocalizationProvider> {

    render() {
        return (
            <LocalContext.Provider value={this.props.locale}>
                {this.props.children}
            </LocalContext.Provider>
        )

    }
}