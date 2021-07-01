export type EmitterCallback<T> = (data: T) => void;

interface EmitterListeners {
  [key: string]: Function[]
}

class Emitter {
  constructor(private listeners: EmitterListeners = {}) {}

  public emit<T>(event: string, data: T): void {
    const subscribers = this.listeners[event];
    if (!Array.isArray(subscribers)) {
      return;
    }

    subscribers.forEach((sub) => {
      sub(data);
    });
  }

  public subscribe<T>(event: string, callback: EmitterCallback<T>): VoidFunction {
    this.listeners[event] = this.listeners[event] ?? [];
    this.listeners[event].push(callback);

    return () => {
      this.listeners[event] = this.listeners[event].filter((sub) => sub !== callback);
    };
  }
}

export default Emitter;
