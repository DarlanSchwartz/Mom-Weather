import Swal from "sweetalert2";
import { DarkColors, LightColors } from "../styles/Colors";
import { DEFAULT_ERROR_TITLE } from "../protocols/Constants";
import { UserData } from "../protocols/Application.types";

export function requestUserGeolocation(then: (data: UserData) => void, darkModeEnabled: boolean) {
    let lat = 0;
    let lon = 0;
    let lang = 'en';

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function (position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            lang = navigator.language.toLocaleLowerCase().replace('-', '_');
            then({ lat, lon, lang });
        }, () => {
            throwError('Não foi possível obter sua localização atual', DEFAULT_ERROR_TITLE, darkModeEnabled ? LightColors.climateBox : DarkColors.climateBox, darkModeEnabled ? LightColors.background : DarkColors.background);
        });
    }
}


export function throwError(message: string, title?: string, btnColor?: string, background?: string) {
    return Swal.fire({
        title: title || DEFAULT_ERROR_TITLE,
        text: message,
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: btnColor || LightColors.climateBox,
        background: background || LightColors.background,
    });
}