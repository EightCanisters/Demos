import { createContext } from "react";
import { Localization } from "../localization";

export const LocalContext = createContext<Localization>({} as Localization);