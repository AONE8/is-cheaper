import { useContext } from "react";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import formClasses from "../Form.module.css";
import AuthContext from "../../../store/auth-context";
import OPTIONS from "../../../util/constants";

export default function FilterForm() {
  return (
    <>
      <Input
        key="brand"
        label="Brand"
        type="select"
        name="brand"
        options={OPTIONS.BRANDS}
      />

      <Input
        key="processor"
        label="Processor"
        type="select"
        name="processor"
        options={OPTIONS.PROCESSORS}
      />

      <Input
        key="screen-size"
        label="Screen Size"
        type="checkbox"
        name="screen-size"
        options={OPTIONS.DIAAGONALS}
      />

      <Input
        key="ram"
        label="RAM"
        type="checkbox"
        name="ram"
        options={OPTIONS.RAM}
      />
      <Input
        key="ssd-capacity"
        label="SSD Capacity"
        type="select"
        name="ssd-capacity"
        options={OPTIONS.SSD_STORAGE}
      />

      <Input
        key="gpu-type"
        label="GPU Type"
        type="checkbox"
        name="gpu-type"
        options={OPTIONS.GPU_TYPE}
      />

      <Input
        key="display-type"
        label="Display Screen Type"
        type="checkbox"
        name="display-type"
        options={OPTIONS.DISPLAY_TYPE}
      />

      <Input
        key="processor-coret"
        label="Processor Core"
        type="checkbox"
        name="processor-coret"
        options={OPTIONS.CORES_COUNT}
      />

      <Input
        key="ram-type"
        label="System Memory Technology"
        type="checkbox"
        name="ram-type"
        options={OPTIONS.RAM_TYPE}
      />

      <Input
        key="production-year"
        label="Production Year"
        type="select"
        name="production-year"
        options={OPTIONS.PROD_YEAR}
      />

      <Input
        key="battery-capacity"
        label="Battery Capacity"
        type="checkbox"
        name="battery-capacity"
        options={OPTIONS.BATTERY_CAP}
      />

      <div className={formClasses["btn-container"]}>
        <Button type="reset">Reset</Button>

        <Button type="submit">Submit</Button>
      </div>
    </>
  );
}
