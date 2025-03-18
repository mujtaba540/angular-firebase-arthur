export interface IMessage {
  id: string;
  message: string;
  email: string;
  createdAt: string | Date;
}

export interface IMessageState {
  isLoading: boolean;
  message: IMessage[];
  error: string | null;
}
