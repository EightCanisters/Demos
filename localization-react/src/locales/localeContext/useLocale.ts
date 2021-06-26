import { useContext } from "react";
import { LocalContext } from ".";

export const useLocale = () => {
    return useContext(LocalContext);
}