/// <reference types="react-scripts" />

declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
