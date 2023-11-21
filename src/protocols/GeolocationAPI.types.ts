interface Datasource {
    sourcename: string;
    attribution: string;
    license: string;
    url: string;
  }
  
  interface Timezone {
    name: string;
    offset_STD: string;
    offset_STD_seconds: number;
    offset_DST: string;
    offset_DST_seconds: number;
  }
  
  interface Rank {
    importance: number;
    popularity: number;
    confidence: number;
    confidence_city_level: number;
    match_type: string;
  }
  
  interface Properties {
    datasource: Datasource;
    country: string;
    country_code: string;
    region: string;
    state: string;
    state_district: string;
    county: string;
    city: string;
    municipality: string;
    lon: number;
    lat: number;
    state_code: string;
    formatted: string;
    address_line1: string;
    address_line2: string;
    category: string;
    timezone: Timezone;
    plus_code: string;
    plus_code_short: string;
    result_type: string;
    rank: Rank;
    place_id: string;
    district?: string; // Optional property for the second feature
  }
  
  interface Geometry {
    type: string;
    coordinates: [number, number];
  }
  
  interface Bbox {
    0: number;
    1: number;
    2: number;
    3: number;
  }
  
  interface Feature {
    type: string;
    properties: Properties;
    geometry: Geometry;
    bbox: Bbox;
  }
  
  interface Parsed {
    city: string;
    state: string;
    expected_type: string;
  }
  
  interface Query {
    text: string;
    parsed: Parsed;
  }
  
export type GeoLocationAPIResponse = {
    features: Feature[];
    query: Query;
    type: string;
}