export interface IButton {
  text: string;
  func?: () => void;
  color?: string;
}

export interface ICheckableItem {
  text: string;
  inputId: string;
  language?: string;
}

export interface IFixedButtons {
  filtering: boolean;
  updateFilteringToTrue?: () => void;
  goToNextUser?: () => void;
  goToPreviousUser?: () => void;
  getFilteredProfiles?: () => void;
}

export interface IInpurField {
  placeholder: string;
  inputType: string;
  inputId: string;
  inputName: string;
}

export interface ILabel {
  text: string;
  htmlFor: string;
}

export interface IPositiveMessage {
  text: string;
}
