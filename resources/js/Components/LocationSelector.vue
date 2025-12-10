<script setup>
import { ref, computed, watch } from 'vue'

defineProps({
  modelValue: {
    type: Object,
    default: () => ({ state: '', lga: '' })
  },
  errors: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])

const states = ref([])
const lgas = ref([])

const loading = ref({
  states: false,
  lgas: false
})

const selectedState = computed({
  get: () => modelValue.state,
  set: (value) => {
    emit('update:modelValue', { ...modelValue, state: value, lga: '' })
    if (value) fetchLGAs(value)
  }
})

const selectedLGA = computed({
  get: () => modelValue.lga,
  set: (value) => {
    emit('update:modelValue', { ...modelValue, lga: value })
  }
})

const fetchStates = async () => {
  loading.value.states = true
  try {
    const response = await fetch('/api/states')
    states.value = await response.json()
  } catch (error) {
    console.error('Error fetching states:', error)
  } finally {
    loading.value.states = false
  }
}

const fetchLGAs = async (state) => {
  loading.value.lgas = true
  try {
    const response = await fetch(`/api/lgas?state=${state}`)
    const data = await response.json()
    lgas.value = data.map(lga => ({ id: lga, name: lga }))
  } catch (error) {
    console.error('Error fetching LGAs:', error)
  } finally {
    loading.value.lgas = false
  }
}

watch(() => modelValue.state, (newVal) => {
  if (newVal && lgas.value.length === 0) {
    fetchLGAs(newVal)
  }
}, { immediate: true })

// Fetch states on mount
fetchStates()
</script>

<template>
  <div class="space-y-4">
    <!-- State Selection -->
    <div>
      <label for="state" class="block text-sm font-medium text-gray-700 mb-1">
        State <span class="text-red-500">*</span>
      </label>
      <select
        id="state"
        v-model="selectedState"
        :disabled="loading.states || states.length === 0"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
      >
        <option value="">{{ loading.states ? 'Loading states...' : 'Select a state' }}</option>
        <option v-for="state in states" :key="state" :value="state">
          {{ state }}
        </option>
      </select>
      <p v-if="errors.state" class="mt-1 text-sm text-red-600">{{ errors.state }}</p>
    </div>

    <!-- LGA Selection -->
    <div>
      <label for="lga" class="block text-sm font-medium text-gray-700 mb-1">
        Local Government / Ward <span class="text-red-500">*</span>
      </label>
      <select
        id="lga"
        v-model="selectedLGA"
        :disabled="!selectedState || loading.lgas || lgas.length === 0"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
      >
        <option value="">
          {{ !selectedState ? 'Select a state first' : loading.lgas ? 'Loading LGAs...' : 'Select a Local Government' }}
        </option>
        <option v-for="lga in lgas" :key="lga.id" :value="lga.id">
          {{ lga.name }}
        </option>
      </select>
      <p v-if="errors.lga" class="mt-1 text-sm text-red-600">{{ errors.lga }}</p>
    </div>
  </div>
</template>
