import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export interface Country {
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
}

export interface CountryResponse {
  page: number;
  totalPages: number;
  totalItems: number;
  data: Country[];
}

export const fetchCountries = async (page: number): Promise<CountryResponse> => {
  const res = await axios.get<CountryResponse>(`${backendUrl}=${page}`);
  return res.data;
};

