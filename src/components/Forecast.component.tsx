import { Unit } from "../protocols/Application.types";
import ClimateBox from "./ClimateBox.mini";

export default function Forecast() {
  return (
    <div>
        Forecast Component
        <ClimateBox label="Temperatura" value={20} unit={Unit.CELSIUS} />
    </div>
  )
}