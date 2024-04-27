export interface IRatesData {
  [key: string]: number;
}

export interface FormEventHandler<T> {
  target: EventTarget | null;
}
