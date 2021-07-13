<template>
  <div class="col-sm-12 col-lg-6 flag-form">
    <form @change="validateForm()">
      <div
        v-for="(flag, counter) in flags" v-bind:key="counter" class="flagBox round-box">
        <div class="container">
          <h1 class="h1">Define flag</h1>
          <p>Define how your flag is named, what percentage you should rollout, etc ...</p>
          <div class="config-box row">
            <!-- flag name -->
            <div class="row pb-4">
              <div class="col-md-2"><label :for="'flag_name_' + counter">Flag name</label></div>
              <div class="col-md-8"><input type="text"
                                           class="form-control"
                                           v-bind:class="{ 'is-invalid': hasError(flag, 'name') }"
                                           :id="'flag_name_' + counter"
                                           :aria-describedby="'flag_name_help'+ counter"
                                           placeholder="Flag name"
                                           required v-model="flag.name">
                <div v-if="hasError(flag, 'name')" class="custom-invalid-feedback">
                  The flag name is mandatory.
                </div>
                <small :id="'flag_name_help'+ counter" class="form-text text-muted" v-bind:class="{ 'd-none': hasError(flag, 'name') }">This is the name you will refer in your code.</small></div>
            </div>

            <!-- percentage -->
            <div class="row pb-4">
              <div class="col-md-2"><label :for="'percentage_' + counter">Percentage</label></div>
              <div class="col-md-8">
                <vue-slider :id="'percentage_' + counter" v-model="flag.percentage" :silent="true" :dotSize="25" />
                <small class="form-text text-muted">The percentage of your users affect by the flag</small>
              </div>
              <div class="col-md-2 d-sm-none d-md-block">{{ flag.percentage}}%</div>
            </div>

            <!-- version -->
            <div class="row pb-4">
              <div class="col-md-2"><label :for="'flag_version_' + counter">Version</label></div>
              <div class="col-md-8">
                <input type="text" class="form-control"
                       :id="'flag_version_' + counter"
                       :aria-describedby="'flag_version_help'+ counter"
                       placeholder="Version"
                       required v-model="flag.version">
                <small :id="'flag_version_help'+ counter" class="form-text text-muted" v-bind:class="{ 'd-none': hasError(flag, 'version') }">Version for your flag to keep track of the changes <i>(this is not mandatory)</i>.</small></div>
            </div>

            <!-- Check boxes -->
            <div class="row offset-sm-1">
              <div class="col-sm-5 col-md-4 col-xl-3">
                <Switch v-model:checked="flag.trackEvents" label="Track events" />
              </div>
              <div class="col-sm-5 col-md-4 col-xl-3">
                <Switch v-model:checked="flag.disable" label="Disable" :id="'disable_' + counter"/>
              </div>
            </div>
          </div>

          <h1>Variation</h1>
          <p>Specify the values you want to return</p>

          <div class="config-box row">
            <div class="row">
              <div class="col-md-2"><label :for="'type_' + counter">Variation type</label></div>

              <!-- type selector -->
              <div class="col-md-4">
                <select v-model="flag.type" :id="'type_' + counter" @change="flag.resetValues()" class="form-select" data-live-search="true">
                  <option value="" disabled>Select an option</option>
                  <option v-for="f in flagTypes" v-bind:value="f" v-bind:key="f">{{ f }}</option>
                </select>
              </div>
            </div>

            <div class="row" v-if="flag.type !== ''">
              <div class="col-md-12 pt-2 pb-2">Variation values</div>

              <!-- boolean variation -->
              <div class="row" v-if="flag.type === 'boolean'">
                <div class="col-sm-3 offset-sm-2">
                  <Switch v-model:checked="flag.true" label="True variation" />
                </div>
                <div class="col-sm-3">
                  <Switch v-model:checked="flag.false" label="False variation" />
                </div>
                <div class="col-sm-3">
                  <Switch v-model:checked="flag.default" label="Default variation" />
                </div>
              </div>

              <!-- json / array variation -->
              <div v-else-if="flag.type === 'json' || flag.type === 'array'" class="row">
                <div class="col-lg-4">
                  <label :for="'true_' + counter">True variation</label>
                  <v-ace-editor v-model:value="flag.true"
                                lang="json"
                                theme="tomorrow_night"
                                class="jsonEditor"
                                @change="validateForm()" />
                  <div v-if="hasError(flag, 'true')" class="custom-invalid-feedback">
                    Invalid format
                  </div>
                </div>
                <div class="col-lg-4">
                  <label :for="'false_' + counter">False variation</label>
                  <v-ace-editor v-model:value="flag.false"
                                lang="json"
                                theme="tomorrow_night"
                                class="jsonEditor"
                                @change="validateForm()" />
                  <div v-if="hasError(flag, 'false')" class="custom-invalid-feedback">
                    Invalid format
                  </div>
                </div>
                <div class="col-md-4">
                  <label :for="'default_' + counter">Default variation</label>
                  <v-ace-editor v-model:value="flag.default"
                                lang="json"
                                theme="tomorrow_night"
                                class="jsonEditor"
                                @change="validateForm()" />
                  <div v-if="hasError(flag, 'default')" class="custom-invalid-feedback">
                    Invalid format
                  </div>
                </div>
              </div>

              <!-- number -->
              <div class="row" v-if="flag.type === 'number'">
                <div class="col-sm-3 offset-sm-2">
                  <label :for="'true_' + counter">True variation</label>
                  <input :id="'true_' + counter" type="number" v-model="flag.true" required class="form-control" v-bind:class="{ 'is-invalid': hasError(flag, 'true') }">
                  <div v-if="hasError(flag, 'true')" class="custom-invalid-feedback">
                    Invalid format
                  </div>
                </div>
                <div class="col-sm-3">
                  <label :for="'false_' + counter">False variation</label>
                  <input :id="'false_' + counter" type="number" v-model="flag.false" required class="form-control" v-bind:class="{ 'is-invalid': hasError(flag, 'false') }">
                  <div v-if="hasError(flag, 'false')" class="custom-invalid-feedback">
                    Invalid format
                  </div>
                </div>
                <div class="col-sm-3">
                  <label :for="'default_' + counter">Default variation</label>
                  <input :id="'default_' + counter" type="number" v-model="flag.default" required class="form-control" v-bind:class="{ 'is-invalid': hasError(flag, 'default') }">
                  <div v-if="hasError(flag, 'default')" class="custom-invalid-feedback">
                    Invalid format
                  </div>
                </div>
              </div>

              <!-- Text -->
              <div class="row" v-if="flag.type === 'string'">
                <div class="col-sm-3 offset-sm-2">
                  <label :for="'true_' + counter">True variation</label>
                  <input :id="'true_' + counter" type="text" v-model.trim="flag.true" required class="form-control">
                </div>
                <div class="col-sm-3">
                  <label :for="'false_' + counter">False variation</label>
                  <input :id="'false_' + counter" type="text" v-model.trim="flag.false" required class="form-control">
                </div>
                <div class="col-sm-3">
                  <label :for="'default_' + counter">Default:</label>
                  <input :id="'default_' + counter" type="text" v-model.trim="flag.default" required class="form-control">
                </div>
              </div>
            </div>
          </div>

          <h1>Targeting</h1>
          <p>Target a subset of your users by setting a rule.</p>
          <div class="config-box row">
            <div class="row">
              <div class="col-md-2"><label :for="'flag_rule_' + counter">Rule</label></div>
              <div class="col-md-8">
                <input type="text" class="form-control" :id="'flag_rule_' + counter" :aria-describedby="'flag_rule_help'+ counter" placeholder="Rule" v-model="flag.rule">
                <small :id="'flag_rule_help'+ counter" class="form-text text-muted">
                  Please follow the rule format describe in the <a href="https://thomaspoignant.github.io/go-feature-flag/flag_format/#rule-format" target="_blank">documentation</a>.
                </small>
              </div>
            </div>
          </div>

          <h1>Rollout strategy</h1>
          <div class="config-box row">
            <div class="row pb-4">
              <div class="col-md-2"><label :for="'type_' + counter">Strategy</label></div>
              <div class="col-md-5">
                <select v-model="flag.rolloutStrategy" :id="'strategy_' + counter" class="form-select" data-live-search="true">
                  <option v-for="f in rolloutStrategies" v-bind:value="f" v-bind:key="f">{{ f }}</option>
                </select>
              </div>
            </div>

            <!-- progressive rollout -->
            <div class="progressive-rollout" v-if="flag.rolloutStrategy === 'Progressive rollout'">
              <div class="row pb-4">
                <div class="col-md-2"><label :for="'rollout_pr_init_percentage_' + counter">Initial percentage</label></div>
                <div class="col-md-8">
                  <vue-slider :id="'rollout_pr_init_percentage_' + counter" v-model="flag.progressiveRollout.initialPercentage" :silent="true" :dotSize="25" />
                  <small class="form-text text-muted">The initial percentage used during the start date of the release ramp (<a href="https://thomaspoignant.github.io/go-feature-flag/rollout/progressive/" target="_blank">see documentation</a>).</small>
                </div>
                <div class="col-md-2 d-sm-none d-md-block">{{ flag.progressiveRollout.initialPercentage }}%</div>
              </div>
              <div class="row pb-4">
                <div class="col-md-2"><label :for="'rollout_pr_end_percentage_' + counter">End percentage</label></div>
                <div class="col-md-8">
                  <vue-slider :id="'rollout_pr_end_percentage_' + counter" v-model="flag.progressiveRollout.endPercentage" :silent="true" :dotSize="25" />
                  <small class="form-text text-muted">The end percentage when your rollout is complete (<a href="https://thomaspoignant.github.io/go-feature-flag/rollout/progressive/" target="_blank">see documentation</a>).</small>
                </div>
                <div class="col-md-2 d-sm-none d-md-block">{{ flag.progressiveRollout.endPercentage }}%</div>
              </div>
              <div class="row pb-4">
                <div class="col-md-2"><label :for="'rollout_pr_start_date_' + counter">Release ramp</label></div>
                <div class="col-md-8">
                  <DatePicker v-model="flag.progressiveRollout.range" is-range is-dark mode="dateTime" >
                    <template v-slot="{ inputValue, inputEvents }">
                      <div class="row">
                        <div class="col-md-6">
                          From<input
                            :value="inputValue.start"
                            v-on="inputEvents.start"
                            class="form-control"
                          />
                        </div>
                        <div class="col-md-6">
                          To <input
                            :value="inputValue.end"
                            v-on="inputEvents.end"
                            class="form-control"
                          />
                        </div>
                      </div>
                    </template>
                  </DatePicker>
                </div>
              </div>
            </div>
            <!-- Scheduled rollout -->
            <div class="scheduled-rollout" v-if="flag.rolloutStrategy === 'Scheduled rollout'">
              <div class="card text-white bg-dark mb-3">
                <div class="card-header"><font-awesome-icon :icon="['fas', 'info-circle']" /> Scheduled rollout configuration not available in the editor.</div>
                <div class="card-body">
                  <p class="card-text">Sorry, this is not possible to edit a scheduled rollout yet in the editor.</p>
                  <p class="card-text">Please <a href="https://thomaspoignant.github.io/go-feature-flag/rollout/scheduled/" target="_blank">refer to the documentation</a> to do it manually.</p>
                </div>
              </div>
            </div>
            <!-- experimentation rollout -->
            <div class="experimentation-rollout" v-if="flag.rolloutStrategy === 'Experimentation rollout'">
              <div class="row pb-4">
                <div class="col-md-2"><label :for="'rollout_pr_start_date_' + counter">Experimentation time</label></div>
                <div class="col-md-8">
                  <DatePicker v-model="flag.experimentationRollout" is-range is-dark mode="dateTime" >
                    <template v-slot="{ inputValue, inputEvents }">
                      <div class="row">
                        <div class="col-md-6">
                          From<input
                          :value="inputValue.start"
                          v-on="inputEvents.start"
                          class="form-control"
                        />
                        </div>
                        <div class="col-md-6">
                          To <input
                          :value="inputValue.end"
                          v-on="inputEvents.end"
                          class="form-control"
                        />
                        </div>
                      </div>
                    </template>
                  </DatePicker>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="offset-md-4 col-md-4 pb-4">
      <button @click="addFlag" class="form-control">Add another feature flag</button>
    </div>
  </div>
</template>

<script>
import { FlagValueTypes, RolloutStrategies } from '@/models/flag-value'
import { FlagFormData } from '@/controllers/flag-form-controller'
import VueSlider from 'vue-slider-component'
import Switch from '@/components/Switch'
import { VAceEditor } from 'vue3-ace-editor'
import { isNumeric } from '@/utils'
import { DatePicker } from 'v-calendar'

export default {
  name: 'FlagForm',
  props: {
    initialFlags: {
      type: Array,
      required: true
    }
  },

  components: {
    VueSlider,
    Switch,
    VAceEditor,
    DatePicker
  },

  data () {
    return {
      flags: [FlagFormData.default()],
      flagTypes: Object.keys(FlagValueTypes).map(v => FlagValueTypes[v]),
      rolloutStrategies: Object.keys(RolloutStrategies).map(v => RolloutStrategies[v])
    }
  },
  watch: {
    flags: {
      handler (newVal) {
        this.$emit('updateFlags', newVal)
      },
      deep: true
    }
  },
  methods: {
    addFlag () {
      this.flags.push(FlagFormData.default())
    },
    validateForm () {
      this.flags.forEach(flag => {
        flag.formErrors = []
        if (flag.name === undefined || flag.name.length === 0) {
          flag.formErrors.push('name')
        }

        if (flag.type === 'json' || flag.type === 'array') {
          try { JSON.parse(flag.true.toString()) } catch (e) { flag.formErrors.push('true') }
          try { JSON.parse(flag.false.toString()) } catch (e) { flag.formErrors.push('false') }
          try { JSON.parse(flag.default.toString()) } catch (e) { flag.formErrors.push('default') }
        }

        if (flag.type === 'number') {
          if (!isNumeric(flag.true)) { flag.formErrors.push('true') }
          if (!isNumeric(flag.false)) { flag.formErrors.push('false') }
          if (!isNumeric(flag.default)) { flag.formErrors.push('default') }
        }
      })
    },
    hasError (flag, fieldName) {
      return flag.formErrors.includes(fieldName)
    }
  },

  computed: {
    flagFile: {
      get () {
        return this.flags
      }
    }
  }
}
</script>

<style>
.jsonEditor{
  height: 200px;
}

.flagBox {
  margin: 10px;
  padding: 20px;
}

.custom-invalid-feedback {
  width: 100%;
  margin-top: .25rem;
  font-size: .875em;
  color: #dc3545;
}

.flagBox h1 {
  color: #ffffff;
  font-family: 'Lato', sans-serif;
  font-size: 34px;
  font-weight: 300;
}

.config-box input,
.config-box select,
.config-box textarea{
  background-color: #292C34;
  color: #B4B4B4;
}

.config-box {
  background-color: #292C34;
  padding: 20px 0 20px 0;
  margin-bottom: 15px;
}

</style>
