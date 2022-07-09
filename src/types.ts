export type EventType =
  | HTMLInputElement
  | HTMLDivElement
  | HTMLTextAreaElement;

export type DefaultEventFunction = () => void;
export type EventFunction = (e: React.FocusEvent<HTMLInputElement, Element>) => void;
export type EventValueFunction = (value: string) => (e: React.FocusEvent<HTMLInputElement, Element>) => void;