
export interface CountryInfo {
  code: string;
  name: string;
  route: string;
  timezone?: string;
}

const countryMappings: Record<string, CountryInfo> = {
  'LK': { code: 'LK', name: 'Sri Lanka', route: '/sri-lanka/home' },
  'MM': { code: 'MM', name: 'Myanmar', route: '/myanmar/home' },
  'BD': { code: 'BD', name: 'Bangladesh', route: '/bangladesh/home' },
  'PK': { code: 'PK', name: 'Pakistan', route: '/pakistan/home' },
  'SG': { code: 'SG', name: 'Singapore', route: '/' },
  'CN': { code: 'CN', name: 'China', route: '/china/home' },
  'MY': { code: 'MY', name: 'Malaysia', route: '/malaysia/home' },
  'ID': { code: 'ID', name: 'Indonesia', route: '/indonesia/home' },
  'TH': { code: 'TH', name: 'Thailand', route: '/thailand/home' },
  'IN': { code: 'IN', name: 'India', route: '/india/home' },
  'AU': { code: 'AU', name: 'Australia', route: '/australia/home' },
  'QA': { code: 'QA', name: 'Qatar', route: '/qatar/home' },
  'SA': { code: 'SA', name: 'Saudi Arabia', route: '/saudi-arabia/home' },
  'AE': { code: 'AE', name: 'UAE', route: '/uae/home' },
  'US': { code: 'US', name: 'USA', route: '/usa/home' },
  'GB': { code: 'GB', name: 'UK', route: '/uk/home' },
};

const timezoneToCountry: Record<string, string> = {
  'Asia/Colombo': 'LK',
  'Asia/Yangon': 'MM',
  'Asia/Dhaka': 'BD',
  'Asia/Karachi': 'PK',
  'Asia/Singapore': 'SG',
};

export const detectCountryByTimezone = (): CountryInfo => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const countryCode = timezoneToCountry[timezone] || 'SG';
    return countryMappings[countryCode];
  } catch (error) {
    console.log('Timezone detection failed, defaulting to Singapore');
    return countryMappings['SG'];
  }
};

export const detectCountryByIP = async (): Promise<CountryInfo> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const countryCode = data.country_code;
    
    if (countryMappings[countryCode]) {
      return countryMappings[countryCode];
    }
    
    // Fallback to timezone detection
    return detectCountryByTimezone();
  } catch (error) {
    console.log('IP detection failed, using timezone fallback');
    return detectCountryByTimezone();
  }
};

export const getCurrentCountryFromPath = (pathname: string): CountryInfo => {
  const pathLower = pathname.toLowerCase();
  if (pathLower.includes('/sri-lanka')) return countryMappings['LK'];
  if (pathLower.includes('/myanmar')) return countryMappings['MM'];
  if (pathLower.includes('/bangladesh')) return countryMappings['BD'];
  if (pathLower.includes('/pakistan')) return countryMappings['PK'];
  if (pathLower.includes('/china')) return countryMappings['CN'];
  if (pathLower.includes('/malaysia')) return countryMappings['MY'];
  if (pathLower.includes('/indonesia')) return countryMappings['ID'];
  if (pathLower.includes('/thailand')) return countryMappings['TH'];
  if (pathLower.includes('/india')) return countryMappings['IN'];
  if (pathLower.includes('/australia')) return countryMappings['AU'];
  if (pathLower.includes('/qatar')) return countryMappings['QA'];
  if (pathLower.includes('/saudi-arabia')) return countryMappings['SA'];
  if (pathLower.includes('/uae')) return countryMappings['AE'];
  if (pathLower.includes('/usa')) return countryMappings['US'];
  if (pathLower.includes('/uk')) return countryMappings['GB'];
  return countryMappings['SG'];
};
