export interface PaginatedResponse {
  data: AfishaEvent[]
  total: number
  page: number
  limit: number
}
export interface AfishaEvent {
  id?: string
  name: string
  description: string
  datetime: string  
  location: string
  category: string
  price: number
  photo: string
}