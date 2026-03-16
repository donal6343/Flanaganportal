"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntactClient = void 0;
class IntactClient {
    constructor(options) {
        this.apiUrl = options.apiUrl.replace(/\/$/, "");
        this.apiKey = options.apiKey;
        this.apiSecret = options.apiSecret;
        this.companyId = options.companyId;
    }
    async request(endpoint, method = "GET", body) {
        const url = `${this.apiUrl}/${this.companyId}${endpoint}`;
        const headers = {
            "Content-Type": "application/json",
            "X-API-Key": this.apiKey,
            "X-API-Secret": this.apiSecret,
        };
        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Intact API error [${response.status}] ${endpoint}: ${errorText}`);
        }
        return response.json();
    }
    async getProducts(page = 1, pageSize = 100) {
        return this.request(`/products?page=${page}&pageSize=${pageSize}`);
    }
    async getProduct(productCode) {
        return this.request(`/products/${encodeURIComponent(productCode)}`);
    }
    async getStockLevels(productCodes) {
        const params = productCodes
            ? `?codes=${productCodes.map(encodeURIComponent).join(",")}`
            : "";
        return this.request(`/stock${params}`);
    }
    async getPrices(customerCode, productCodes) {
        const params = new URLSearchParams();
        if (customerCode)
            params.set("customer", customerCode);
        if (productCodes)
            params.set("codes", productCodes.join(","));
        const qs = params.toString() ? `?${params.toString()}` : "";
        return this.request(`/prices${qs}`);
    }
    async createOrder(order) {
        return this.request("/orders", "POST", order);
    }
    async getInvoices(customerCode, page = 1, pageSize = 20) {
        return this.request(`/invoices?customer=${encodeURIComponent(customerCode)}&page=${page}&pageSize=${pageSize}`);
    }
    async getInvoicePdf(invoiceNumber) {
        const url = `${this.apiUrl}/${this.companyId}/invoices/${encodeURIComponent(invoiceNumber)}/pdf`;
        const response = await fetch(url, {
            headers: {
                "X-API-Key": this.apiKey,
                "X-API-Secret": this.apiSecret,
            },
        });
        if (!response.ok) {
            throw new Error(`Intact API error [${response.status}] fetching invoice PDF: ${invoiceNumber}`);
        }
        return Buffer.from(await response.arrayBuffer());
    }
    async getCustomer(customerCode) {
        return this.request(`/customers/${encodeURIComponent(customerCode)}`);
    }
    async healthCheck() {
        try {
            await this.request("/health");
            return true;
        }
        catch {
            return false;
        }
    }
}
exports.IntactClient = IntactClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50YWN0LWNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2ludGFjdC9zZXJ2aWNlL2ludGFjdC1jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBVUEsTUFBYSxZQUFZO0lBTXZCLFlBQVksT0FBNEI7UUFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFBO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUE7SUFDcEMsQ0FBQztJQUVPLEtBQUssQ0FBQyxPQUFPLENBQ25CLFFBQWdCLEVBQ2hCLFNBQWlDLEtBQUssRUFDdEMsSUFBYztRQUVkLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsRUFBRSxDQUFBO1FBRXpELE1BQU0sT0FBTyxHQUEyQjtZQUN0QyxjQUFjLEVBQUUsa0JBQWtCO1lBQ2xDLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTTtZQUN4QixjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDL0IsQ0FBQTtRQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNoQyxNQUFNO1lBQ04sT0FBTztZQUNQLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDOUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNqQixNQUFNLFNBQVMs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