/**
 * LocalStorage utilities for PRD data persistence
 */

const STORAGE_KEY = 'prd-draft'

/**
 * Load PRD data from localStorage
 * @returns {Object|null} The saved PRD data or null if not found
 */
export function loadPrdData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.error('Error loading PRD data from localStorage:', error)
  }
  return null
}

/**
 * Save PRD data to localStorage
 * @param {Object|null} data - The PRD data to save, or null to clear
 */
export function savePrdData(data) {
  try {
    if (data === null) {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
  } catch (error) {
    console.error('Error saving PRD data to localStorage:', error)
  }
}

/**
 * Check if there is saved PRD data
 * @returns {boolean}
 */
export function hasSavedData() {
  return localStorage.getItem(STORAGE_KEY) !== null
}
