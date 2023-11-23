import Swal from "sweetalert2";
import { DarkColors, LightColors } from "../styles/Colors";
import { DEFAULT_ERROR_TITLE } from "../protocols/Constants";
import { UserNavigatorData } from "../protocols/Application.types";

export function requestUserGeolocation(then: (data: UserNavigatorData) => void, darkModeEnabled: boolean) {
    let lat = 0;
    let lon = 0;
    let lang = 'en';

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function (position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            lang = navigator.language.toLocaleLowerCase().replace('-', '_');
            then({ lat, lon, lang, rejected: false });
        }, () => {
            then({ lat, lon, lang, rejected: true });
            throwError('Não foi possível obter sua localização atual', DEFAULT_ERROR_TITLE, darkModeEnabled);
        });
    }
}


export function throwError(message: string, title?: string,darkModeEnabled:boolean = false) {
    return Swal.fire({
        title: title || DEFAULT_ERROR_TITLE,
        text: message,
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: darkModeEnabled ?DarkColors.climateBox :  LightColors.climateBox,
        background: darkModeEnabled ? DarkColors.background : LightColors.background,
    });
}