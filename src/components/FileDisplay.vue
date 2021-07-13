<template>
  <div class="col-sm-12 col-lg-6">
    <div class="flag-file sticky-top round-box">
      <div class="container">
        <select v-model="format" class="form-select">
          <option>YAML</option>
          <option>JSON</option>
          <option>TOML</option>
        </select>
      </div>
      <div class="code container-fluid">
        <pre v-highlightjs="" class="sourcecode">
          <code v-bind:class="format">{{ getFormattedFlagFile() }}</code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import { formatToJson, formatToToml, formatToYaml } from '@/formaters/formaters'
import 'highlight.js/styles/base16/sandcastle.css'

export default {
  props: {
    flagFile: {
      type: Map,
      required: true
    }
  },
  data () {
    return {
      format: 'YAML'
    }
  },
  methods: {
    getFormattedFlagFile () {
      switch (this.format) {
        case 'JSON':
          return formatToJson(this.flagFile)
        case 'TOML':
          return formatToToml(this.flagFile)
        case 'YAML':
        default:
          return formatToYaml(this.flagFile)
      }
    }
  }
}
</script>

<style scoped>
.code {
  background-color: #282c34;
  text-align: left;
}

.flag-file {
  margin: 10px;
}

.sticky-top { top: 67px; }
</style>
