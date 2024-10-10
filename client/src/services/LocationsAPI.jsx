const getAllLocations = async () => {
    const response = await fetch('/api/locations');
    return await response.json();
  }
  
export default getAllLocations;