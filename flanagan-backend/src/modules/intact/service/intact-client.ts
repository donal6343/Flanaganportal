import {
  IntactModuleOptions,
  IntactProduct,
  IntactStockLevel,
  IntactPrice,
  IntactOrder,
  IntactInvoice,
  IntactCustomer,
} from "../types"

export class IntactClient {
  private apiUrl: string
  private apiKey: string
  private apiSecret: string
  private companyId: string

  constructor(options: IntactModuleOptions) {
    this.apiUrl = options.apiUrl.replace(/\/$/, "")
    this.apiKey = options.apiKey
    this.apiSecret = options.apiSecret
    this.companyId = options.companyId
  }

  private async request<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" = "GET",
    body?: unknown
  ): Promise<T> {
    const url = `${this.apiUrl}/${this.companyId}${endpoint}`

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-API-Key": this.apiKey,
      "X-API-Secret": this.apiSecret,
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Intact API error [${response.status}] ${endpoint}: ${errorText}`
      )
    }

    return response.json() as Promise<T>
  }

  async getProducts(
    page = 1,
    pageSize = 100
  ): Promise<{ data: IntactProduct[]; total: number }> {
    return this.request(
      `/products?page=${page}&pageSize=${pageSize}`
    )
  }

  async getProduct(productCode: string): Promise<IntactProduct> {
    return this.request(`/products/${encodeURIComponent(productCode)}`)
  }

  async getStockLevels(
    productCodes?: string[]
  ): Promise<IntactStockLevel[]> {
    const params = productCodes
      ? `?codes=${productCodes.map(encodeURIComponent).join(",")}`
      : ""
    return this.request(`/stock${params}`)
  }

  async getPrices(
    customerCode?: string,
    productCodes?: string[]
  ): Promise<IntactPrice[]> {
    const params = new URLSearchParams()
    if (customerCode) params.set("customer", customerCode)
    if (productCodes) params.set("codes", productCodes.join(","))
    const qs = params.toString() ? `?${params.toString()}` : ""
    return this.request(`/prices${qs}`)
  }

  async createOrder(order: IntactOrder): Promise<{ order_number: string }> {
    return this.request("/orders", "POST", order)
  }

  async getInvoices(
    customerCode: string,
    page = 1,
    pageSize = 20
  ): Promise<{ data: IntactInvoice[]; total: number }> {
    return this.request(
      `/invoices?customer=${encodeURIComponent(customerCode)}&page=${page}&pageSize=${pageSize}`
    )
  }

  async getInvoicePdf(invoiceNumber: string): Promise<Buffer> {
    const url = `${this.apiUrl}/${this.companyId}/invoices/${encodeURIComponent(invoiceNumber)}/pdf`

    const response = await fetch(url, {
      headers: {
        "X-API-Key": this.apiKey,
        "X-API-Secret": this.apiSecret,
      },
    })

    if (!response.ok) {
      throw new Error(
        `Intact API error [${response.status}] fetching invoice PDF: ${invoiceNumber}`
      )
    }

    return Buffer.from(await response.arrayBuffer())
  }

  async getCustomer(customerCode: string): Promise<IntactCustomer> {
    return this.request(`/customers/${encodeURIComponent(customerCode)}`)
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.request("/health")
      return true
    } catch {
      return false
    }
  }
}
