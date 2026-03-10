export interface IntactModuleOptions {
  apiUrl: string
  apiKey: string
  apiSecret: string
  companyId: string
  syncIntervalMinutes?: number
}

export interface IntactProduct {
  code: string
  description: string
  category: string
  unit_price: number
  currency: string
  stock_quantity: number
  barcode?: string
  brand?: string
  weight?: number
  image_url?: string
}

export interface IntactStockLevel {
  product_code: string
  warehouse: string
  quantity_available: number
  quantity_on_order: number
}

export interface IntactPrice {
  product_code: string
  customer_code?: string
  price_list?: string
  unit_price: number
  currency: string
  discount_percent?: number
}

export interface IntactOrder {
  order_number: string
  customer_code: string
  order_date: string
  delivery_address: {
    name: string
    address_1: string
    address_2?: string
    city: string
    postcode: string
    country: string
  }
  lines: IntactOrderLine[]
  notes?: string
}

export interface IntactOrderLine {
  product_code: string
  quantity: number
  unit_price: number
  discount_percent?: number
  description?: string
}

export interface IntactInvoice {
  invoice_number: string
  order_number: string
  customer_code: string
  invoice_date: string
  due_date: string
  total_amount: number
  currency: string
  status: "paid" | "unpaid" | "overdue"
  pdf_url?: string
  lines: IntactInvoiceLine[]
}

export interface IntactInvoiceLine {
  product_code: string
  description: string
  quantity: number
  unit_price: number
  line_total: number
}

export interface IntactCustomer {
  customer_code: string
  name: string
  email: string
  phone?: string
  credit_limit?: number
  payment_terms?: string
  price_list?: string
}
