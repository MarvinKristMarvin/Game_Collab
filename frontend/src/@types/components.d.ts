export interface IButton {
  text: string;
  func?: () => void;
  color?: string;
  buttonType?: "submit" | "button" | "reset";
}

export interface ICheckableItem {
  text: string;
  inputId: string;
  language?: string; // use this to change the css style and have the flag
  onChange: () => void;
  checked: boolean;
}

export interface IFixedButtons {
  filtering: boolean;
  updateFilteringToTrue?: () => void;
  getFilteredProfiles?: () => void;
}

export interface IInputField {
  placeholder: string;
  inputType: string;
  inputId: string;
  inputName: string;
  onChangeHandler: (value: string) => void;
  isNumber: boolean;
  actualValue: string;
}

export interface ILabel {
  text: string;
  htmlFor: string;
}

export interface IPositiveMessage {
  text: string;
}
