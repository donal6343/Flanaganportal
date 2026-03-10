import { IntactClient } from "./intact-client"
import {
  IntactModuleOptions,
  IntactProduct,
  IntactStockLevel,
  IntactPrice,
  IntactOrder,
  IntactInvoice,
  IntactCustomer,
} from "../types"

type InjectedDependencies = {
  [key: string]: unknown
}

export class IntactModuleService {
  private client: IntactClient
  private options: IntactModuleOptions

  constructor(_deps: InjectedDependencies, options: IntactModuleOptions) {
    this.options = options
    this.client = new IntactClient(options)
  }

  async getProducts(
    page?: number,
    pageSize?: number
  ): Promise<{ data: IntactProduct[]; total: number }> {
    return this.client.getProducts(page, pageSize)
  }

  async getProduct(productCode: string): Promise<IntactProduct> {
    return this.client.getProduct(productCode)
  }

  async getStockLevels(productCodes?: string[]): Promise<IntactStockLevel[]> {
    return this.client.getStockLevels(productCodes)
  }

  async getPrices(
    customerCode?: string,
    productCodes?: string[]
  ): Promise<IntactPrice[]> {
    return this.client.getPrices(customerCode, productCodes)
  }

  async pushOrder(order: IntactOrder): Promise<{ order_number: string }> {
    return this.client.createOrder(order)
  }

  async getInvoices(
    customerCode: string,
    page?: number,
    pageSize?: number
  ): Promise<{ data: IntactInvoice[]; total: number }> {
    return this.client.getInvoices(customerCode, page, pageSize)
  }

  async getInvoicePdf(invoiceNumber: string): Promise<Buffer> {
    return this.client.getInvoicePdf(invoiceNumber)
  }

  async getCustomer(customerCode: string): Promise<IntactCustomer> {
    return this.client.getCustomer(customerCode)
  }

  async healthCheck(): Promise<boolean> {
    return this.client.healthCheck()
  }
}
