<template>
  <div class="container">

    <div class="row">
      <div class="">
        <div class="round-box header-info row">
          <div class="col-sm-1 d-flex justify-content-center">
            <img src="https://raw.githubusercontent.com/thomaspoignant/go-feature-flag/main/logo_128.png" alt="go-feature-flag logo" height="90" />
          </div>
          <div class="col-sm-10">
            <p><strong>GO Feature Flag Editor</strong> is an online helper to help you build your configuration file for the golang module <a href="https://github.com/thomaspoignant/go-feature-flag" target="_blank">go-feature-flag</a>.</p>
            <p class="info"><font-awesome-icon :icon="['fas', 'info-circle']" /> This editor is in an early stage and can be improved, all contributions are welcome <a href="https://github.com/thomaspoignant/go-feature-flag-editor" target="_blank">thomaspoignant/go-feature-flag-editor</a>.</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-info {
  background-color: #292C34;
  margin: 10px;
  padding: 20px;
}

.header-info h1 {
  font-size: 1.2em;
}

.info {
  color: #666666;
}
</style>
