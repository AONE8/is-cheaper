import { useContext } from "react";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import formClasses from "../Form.module.css";
import AuthContext from "../../../store/auth-context";
import OPTIONS, { OPTIONS_VALUES } from "../../../util/constants";

export default function FilterForm({ isSubmit }) {
  return (
    <>
      <Input
        key="brand"
        label="Brand"
        type="select"
        name="producer"
        options={OPTIONS.producer}
        isSubmit={isSubmit}
      />

      <Input
        key="processor"
        label="Processor"
        type="select"
        name="processor"
        options={OPTIONS.processor}
      />

      <Input
        key="screen-size"
        label="Screen Size"
        type="checkbox"
        name="20861"
        options={OPTIONS[20861]}
        options_value={OPTIONS_VALUES["20861"]}
      />

      <Input
        key="ram"
        label="RAM"
        type="checkbox"
        name="20863"
        options={OPTIONS[20863]}
        options_value={OPTIONS_VALUES["20863"]}
      />
      <Input
        key="ssd-capacity"
        label="SSD Capacity"
        type="select"
        name="obyom-ssd"
        options={OPTIONS["obyom-ssd"]}
        options_value={OPTIONS_VALUES["obyom-ssd"]}
      />

      <Input
        key="gpu-type"
        label="GPU Type"
        type="checkbox"
        name="73143"
        options={OPTIONS[73143]}
        options_value={OPTIONS_VALUES["73143"]}
      />

      <Input
        key="display-type"
        label="Display Screen Type"
        type="checkbox"
        name="36519"
        options={OPTIONS[36519]}
        options_value={OPTIONS_VALUES["36519"]}
      />

      <Input
        key="processor-coret"
        label="Processor Core"
        type="checkbox"
        name="72566"
        options={OPTIONS[72566]}
        options_value={OPTIONS_VALUES["72566"]}
      />

      <Input
        key="ram-type"
        label="System Memory Technology"
        type="checkbox"
        name="111764"
        options={OPTIONS[111764]}
        options_value={OPTIONS_VALUES["111764"]}
      />

      <Input
        key="production-year"
        label="Production Year"
        type="select"
        name="god-vipuska-255456"
        options={OPTIONS["god-vipuska-255456"]}
      />

      <Input
        key="battery-capacity"
        label="Battery Capacity"
        type="checkbox"
        name="emkost-akkumulyatora-243558"
        options={OPTIONS["emkost-akkumulyatora-243558"]}
        options_value={OPTIONS_VALUES["emkost-akkumulyatora-243558"]}
      />

      <div className={formClasses["btn-container"]}>
        <Button type="reset">Reset</Button>

        <Button type="submit">Submit</Button>
      </div>
    </>
  );
}
