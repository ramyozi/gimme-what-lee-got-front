import axios from 'axios';


const API_BASE = import.meta.env.VITE_API_BASE as string

export const getCategories = async () => {
  const response = await axios.get(`${API_BASE}/catalog/category/`)
  return response.data
}

export const getCategoryById = async (id : string) =>{
  const response = await axios.get(`${API_BASE}/catalog/category/${id}`)
  return response.data
}