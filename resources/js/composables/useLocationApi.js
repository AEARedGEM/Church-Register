export const useLocationApi = () => {
  const fetchCountries = async () => {
    const response = await fetch('/api/countries')
    return await response.json()
  }

  const fetchStatesByCountry = async (country) => {
    const response = await fetch(`/api/states?country=${country}`)
    return await response.json()
  }

  const fetchLGAsByState = async (state) => {
    const response = await fetch(`/api/lgas?state=${state}`)
    return await response.json()
  }

  return {
    fetchCountries,
    fetchStatesByCountry,
    fetchLGAsByState
  }
}
