export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export function extractInitials(fullName: string) {
  const words = fullName?.trim()?.split(/\s+/);
  let initials = '';

  if (words?.length === 1) {
    initials = words[0].substring(0, 2);
  } else {
    for (let i = 0; i < Math.min(2, words?.length); i++) {
      initials += words[i][0];
    }
  }

  return initials.toUpperCase();
}

export function extractTime(date: string) {
  const dateTime = new Date(date).toLocaleString();
  return dateTime;
}


export const getCityName = async (userLocation:any) => {
  try {
    const apiKey = 'AIzaSyAMnCr9yLPHekNsJVDiwaj6pFqKVvN1XWo';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation?.latitude},${userLocation?.longitude}&key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const cityName = data.results[0].address_components.find(
        (component: any) => component.types.includes('locality'),
      );
      if (cityName) {
        return cityName.long_name
      } else {
        console.log('City name not found');
      }
    } else {
      console.log('Error in geocoding request');
    }
  } catch (error) {
    console.error('Error fetching geocoding data:', error);
  }
};