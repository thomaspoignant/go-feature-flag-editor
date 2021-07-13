<template>
  <NavBar />
  <Header />
  <div class="container">
    <div class="row">
      <FlagForm :initialFlags="initialFlags" @updateFlags="updateFlags" />
      <FileDisplay :flagFile="flags"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Flag } from './models/flag'
import { FlagFormData } from '@/controllers/flag-form-controller'
import FlagForm from './components/FlagForm.vue'
import FileDisplay from './components/FileDisplay.vue'
import NavBar from './components/NavBar.vue'
import Header from './components/Header.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'

export default defineComponent({
  name: 'App',
  components: {
    FlagForm,
    FileDisplay,
    NavBar,
    Header
  },
  data () {
    return {
      initialFlags: [FlagFormData.default()],
      flags: new Map<string, Flag>()
    }
  },
  methods: {
    updateFlags (flags: Array<FlagFormData>): void {
      const file = new Map<string, Flag>()
      flags.forEach(f => {
        file.set(f.name, f.toFlag())
      })
      this.flags = file
    }
  },
  index: 200
})
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #eee;
  margin-top: 60px;
}
body {
  margin: 0;
  background-color: #2E313E;
  font-family: 'Poppins', sans-serif;
}
.container {
  width: 100%;
  margin: 0 !important;
  padding: 0 !important;
  max-width: unset;
}

.round-box {
  border-radius: 6px;
  border: 1px solid #444c56;
  padding: 20px;
}

/* unvisited link */
a:link {
  color: #5d6cc0;
  text-decoration: none;
}

/* visited link */
a:visited {
  color: #5d6cc0;
  text-decoration: none;
}

/* mouse over link */
a:hover {
  color: #009485;
  text-decoration: none;
}

/* selected link */
a:active {
  color: #009485;
  text-decoration: none;
}

</style>
