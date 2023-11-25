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
        }, (error) => {
            then({ lat, lon, lang, rejected: true });
            let errorMessage = '';
            let errorTitle = DEFAULT_ERROR_TITLE;
            localStorage.setItem("rejected-geolocation", "true");
            
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorTitle = 'Geolocalização negada';
                    errorMessage = 'Por favor habilite-a para visualizar o clima da sua localização automaticamente.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorTitle = 'Localização indisponível';
                    errorMessage = 'Não foi possivel obter a sua localização.';
                    break;
                case error.TIMEOUT:
                    errorTitle = 'Tempo esgotado';
                    errorMessage = 'O tempo para obter a sua localização esgotou.';
                    break;
                default:
                    errorTitle = 'Erro';
                    errorMessage = 'Ocorreu um erro ao obter a sua localização.';
                    break;
            }
            throwError(errorMessage, errorTitle, darkModeEnabled);
        });
    } else {
        throwError('Seu browser não suporta geolocalização!', "Navegador sem suporte.", darkModeEnabled);
        localStorage.setItem("rejected-geolocation", "true");
    }
}


export function throwError(message: string, title?: string, darkModeEnabled: boolean = false) {
    return Swal.fire({
        title: title || DEFAULT_ERROR_TITLE,
        text: message,
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: darkModeEnabled ? DarkColors.climateBox : LightColors.climateBox,
        background: darkModeEnabled ? DarkColors.background : LightColors.background,
    });
}