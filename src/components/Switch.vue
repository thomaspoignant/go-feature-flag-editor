<template>
  <label class="container">
    <input
      v-bind="$attrs"
      class="input"
      type="checkbox"
      :checked="checked"
      @change="$emit('update:checked', $event.target.checked)"
    />
    <span class="switch"></span>
    <span class="label">{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: 'Switch',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.container {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.label {
  margin-left: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.switch {
  --switch-container-width: 50px;
  --switch-size: calc(var(--switch-container-width) / 2);
  --light-gray: #555;
  --gray: #cbd5e0;
  --dark-gray: #a0aec0;
  --teal: #666;
  --dark-teal: #666;

  /* Vertically center the inner circle */
  display: flex;
  align-items: center;
  position: relative;
  height: var(--switch-size);
  flex-basis: var(--switch-container-width);
  /* Make the container element rounded */
  border-radius: var(--switch-size);
  transition: background-color 0.25s ease-in-out;

  background-color: var(--light-gray);
  flex-shrink: 0;
}

.switch::before {
  content: "";
  position: absolute;
  /* Move a little bit the inner circle to the right */
  left: 1px;
  height: calc(var(--switch-size) - 4px);
  width: calc(var(--switch-size) - 4px);
  /* Make the inner circle fully rounded */
  border-radius: 9999px;
  background-color: white;
  transition: transform 0.375s ease-in-out;
  border: 2px solid var(--light-gray);
}
.input:checked + .switch {
  border-color: var(--teal);
  /* Teal background */
  background-color: #009485;
}

.input:checked + .switch::before {
  border-color: var(--teal);
  border-color: #666;
  /* Move the inner circle to the right */
  transform: translateX(
    calc(var(--switch-container-width) - var(--switch-size))
  );
}
.input:focus + .switch::before {
  border-color: var(--dark-gray);
}

.input:focus:checked + .switch::before {
  border-color: var(--dark-teal);
}
.input:disabled + .switch {
  background-color: var(--gray);
}

.input:disabled + .switch::before {
  background-color: var(--dark-gray);
  border-color: var(--dark-gray);
}

</style>
