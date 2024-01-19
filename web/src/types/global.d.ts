import type { ApiProblems } from './api';

type EnhancedOmit<TRecordOrUnion, KeyUnion> = string extends keyof TRecordOrUnion
  ? TRecordOrUnion
  : TRecordOrUnion extends any
  ? Pick<TRecordOrUnion, Exclude<keyof TRecordOrUnion, KeyUnion>>
  : never;

declare global {
  type CustomObject<Type> = {
    [key: string]: Type;
  };
  type WithId<TSchema> = EnhancedOmit<TSchema, 'id'> & {
    id: string;
  };
  type WithoutId<TSchema> = Omit<TSchema, '_id'>;
  type WithApiResult<T> = { kind: 'ok'; data: T } | ApiProblems;
  type WithOnComplete<T> = T & { onComplete: (error?: string) => void };
}

export {};
