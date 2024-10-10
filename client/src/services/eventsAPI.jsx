export async function getAllEvents() {
    const response = await fetch('/api/events');
    return await response.json();
  }
  
  export async function getEventsByLocation(locationId) {
    const response = await fetch(`/api/events/location/${locationId}`);
    return await response.json();
  }
  