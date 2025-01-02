/* PROPS INTERFACES */
export interface IButton {
  text: string;
  func?: () => void;
  color?: string;
  buttonType?: "submit" | "button" | "reset";
}

export interface ICheckableItem {
  text: string;
  inputId: string;
  language?: string;
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

/* COMPONENTS INTERFACES */
export interface userInterface {
  id: number;
  password: string;
  mail: string;
  name: string;
  age: number;
  available: boolean;
  description: string;
  portfolio_url?: string;
  profile_mail: string;
  created_at: string;
  updated_at?: string;
  role: number;
  jobs: string;
  languages: string;
  remunerations: string;
}
