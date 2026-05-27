import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useInitDataStore = defineStore('initData', () => {
  const websiteId = ref('')
  const userId  = ref('')

  return { websiteId, userId }
})
