<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"><img src="https://raw.githubusercontent.com/thomaspoignant/go-feature-flag/main/logo_128.png" width="30"/></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">GO Feature Flag Editor</a>
            </li>
          </ul>
          <ul class="navbar-nav mb-2 mb-lg-">
            <li class="nav-item">
              <a class="nav-link" href="https://github.com/thomaspoignant/go-feature-flag" target="_blank"> <font-awesome-icon :icon="['fab', 'github']" /> GitHub</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://thomaspoignant.github.io/go-feature-flag" target="_blank"> <font-awesome-icon :icon="['fas', 'book']" /> Documentation</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
