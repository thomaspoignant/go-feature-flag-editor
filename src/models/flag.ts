import { AnyJson } from './flag-value'

export interface PercentageRange {
  initial?: number,
  end?: number
}
export interface ReleaseRamp {
  start?: Date,
  end?: Date
}
export class RolloutProgressive {
  progressive: {
    percentage: PercentageRange
    releaseRamp: ReleaseRamp
  }

  constructor (percentage: PercentageRange, releaseRamp: ReleaseRamp) {
    this.progressive = {
      releaseRamp,
      percentage
    }
  }
}

export class ExperimentationRollout implements ReleaseRamp {}

export class FlagOptions {
  trackEvents?: boolean
  rule?: string
  version?: string
  disable?: boolean
  rollout?: RolloutProgressive | ExperimentationRollout
}

export class Flag extends FlagOptions {
  percentage: number
  true: AnyJson
  false: AnyJson
  default: AnyJson

  constructor (percentage: number, trueValue: AnyJson, falseValue: AnyJson,
    defaultValue: AnyJson, opts: FlagOptions = {}) {
    super()
    this.percentage = percentage
    this.true = trueValue
    this.false = falseValue
    this.default = defaultValue

    const { trackEvents, rule, version, disable, rollout } = opts
    this.trackEvents = trackEvents
    this.rule = rule
    this.version = version
    this.disable = disable
    this.rollout = rollout
  }
}
