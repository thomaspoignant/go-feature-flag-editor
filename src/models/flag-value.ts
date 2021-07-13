export interface JsonMap {
  // eslint-disable-next-line no-use-before-define
  [key: string]: AnyJson;
}

export type JsonArray = boolean[] | number[] | string[] | JsonMap[] | Date[]
export type AnyJson = boolean | number | string | JsonMap | Date | JsonArray | JsonArray[]

// FlagValueTypes contains the available types for the value of a Flag.
export enum FlagValueTypes {
  BOOLEAN = 'boolean',
  STRING = 'string',
  NUMBER = 'number',
  JSON = 'json',
  ARRAY = 'array'
}

export enum RolloutStrategies {
  DEFAULT = 'Default',
  PROGRESSIVE = 'Progressive rollout',
  EXPERIMENTATION = 'Experimentation rollout',
  SCHEDULED = 'Scheduled rollout'
}
