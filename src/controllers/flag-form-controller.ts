import { FlagValueTypes, RolloutStrategies } from '@/models/flag-value'
import { Flag } from '@/models/flag'
import * as _ from 'lodash'
import { AnyJson } from '@iarna/toml'

interface RolloutProgressiveForm {
  initialPercentage?:number
  endPercentage?:number
  range?:{
    start?: Date
    end?: Date
  }
}

interface ExperimentationForm {
  start?: Date
  end?: Date
}

// FlagFormData is the object that represents the values of a flag form.
export class FlagFormData {
  name: string
  percentage: number
  true?: string | boolean
  false?: string | boolean
  default?: string | boolean
  type?: FlagValueTypes | string
  trackEvents?: boolean
  rule?: string
  version?: string
  disable?: boolean
  formErrors?: Array<string>
  rolloutStrategy?: RolloutStrategies
  progressiveRollout ?: RolloutProgressiveForm
  experimentationRollout ?: ExperimentationForm

  constructor (name = '', percentage = 0) {
    this.name = name
    this.percentage = percentage
    this.formErrors = []
  }

  resetValues ():void {
    switch (this.type) {
      case FlagValueTypes.ARRAY:
        this.true = '[]'
        this.false = '[]'
        this.default = '[]'
        break
      case FlagValueTypes.BOOLEAN:
        this.true = true
        this.false = false
        this.default = false
        break
      case FlagValueTypes.NUMBER:
        this.true = '0'
        this.false = '0'
        this.default = '0'
        break
      case FlagValueTypes.STRING:
        this.true = ''
        this.false = ''
        this.default = ''
        break
      case FlagValueTypes.JSON:
        this.true = '{}'
        this.false = '{}'
        this.default = '{}'
        break
    }
  }

  toFlag (): Flag {
    const percentage = _.toNumber(this.percentage)

    // convert values
    let trueVal: AnyJson = this.true || ''
    let falseVal: AnyJson = this.false || ''
    let defaultVal: AnyJson = this.default || ''
    switch (this.type) {
      case FlagValueTypes.ARRAY:
      case FlagValueTypes.JSON:
        try {
          trueVal = JSON.parse((typeof this.true === 'boolean') ? this.true.toString() : this.true || '{}')
          falseVal = JSON.parse((typeof this.false === 'boolean') ? this.false.toString() : this.false || '{}')
          defaultVal = JSON.parse((typeof this.default === 'boolean') ? this.default.toString() : this.default || '{}')
        } catch (e) {
          // if the string is not json valid we don't update the flag
          trueVal = {}
          falseVal = {}
          defaultVal = {}
        }
        break
      case FlagValueTypes.BOOLEAN:
        trueVal = (typeof this.true === 'boolean') ? this.true : true
        falseVal = (typeof this.false === 'boolean') ? this.false : false
        defaultVal = (typeof this.default === 'boolean') ? this.default : false
        break
      case FlagValueTypes.NUMBER:
        trueVal = _.toNumber(this.true)
        falseVal = _.toNumber(this.false)
        defaultVal = _.toNumber(this.default)
        break
      default:
      case FlagValueTypes.STRING:
        // nothing to do we are already using a string value
        break
    }

    let rollout
    switch (this.rolloutStrategy) {
      case RolloutStrategies.PROGRESSIVE:
        rollout = {
          progressive: {
            percentage: {
              initial: this.progressiveRollout?.initialPercentage,
              end: this.progressiveRollout?.endPercentage
            },
            releaseRamp: {
              start: this.progressiveRollout?.range?.start,
              end: this.progressiveRollout?.range?.end
            }
          }
        }
        break
      case RolloutStrategies.EXPERIMENTATION:
        rollout = {
          experimentation: {
            start: this.experimentationRollout?.start,
            end: this.experimentationRollout?.end
          }
        }
        break
    }
    return new Flag(percentage, trueVal, falseVal, defaultVal, {
      rule: this.rule,
      version: this.version,
      trackEvents: this.trackEvents,
      disable: this.disable || false,
      rollout: rollout
    })
  }

  static default (): FlagFormData {
    const f = new FlagFormData()
    f.type = ''
    f.trackEvents = true
    f.disable = false
    f.rule = ''
    f.version = ''
    f.percentage = 0
    f.resetValues()
    f.rolloutStrategy = RolloutStrategies.DEFAULT
    f.progressiveRollout = {
      initialPercentage: 0,
      endPercentage: 100,
      range: {
        start: new Date(),
        end: new Date()
      }
    }
    f.experimentationRollout = {
      start: new Date(),
      end: new Date()
    }
    return f
  }
}
