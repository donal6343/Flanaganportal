"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntactModuleService = void 0;
const intact_client_1 = require("./intact-client");
class IntactModuleService {
    constructor(_deps, options) {
        this.options = options;
        this.client = new intact_client_1.IntactClient(options);
    }
    async getProducts(page, pageSize) {
        return this.client.getProducts(page, pageSize);
    }
    async getProduct(productCode) {
        return this.client.getProduct(productCode);
    }
    async getStockLevels(productCodes) {
        return this.client.getStockLevels(productCodes);
    }
    async getPrices(customerCode, productCodes) {
        return this.client.getPrices(customerCode, productCodes);
    }
    async pushOrder(order) {
        return this.client.createOrder(order);
    }
    async getInvoices(customerCode, page, pageSize) {
        return this.client.getInvoices(customerCode, page, pageSize);
    }
    async getInvoicePdf(invoiceNumber) {
        return this.client.getInvoicePdf(invoiceNumber);
    }
    async getCustomer(customerCode) {
        return this.client.getCustomer(customerCode);
    }
    async healthCheck() {
        return this.client.healthCheck();
    }
}
exports.IntactModuleService = IntactModuleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50YWN0LW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2ludGFjdC9zZXJ2aWNlL2ludGFjdC1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbURBQThDO0FBZTlDLE1BQWEsbUJBQW1CO0lBSTlCLFlBQVksS0FBMkIsRUFBRSxPQUE0QjtRQUNuRSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksNEJBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FDZixJQUFhLEVBQ2IsUUFBaUI7UUFFakIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDaEQsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBbUI7UUFDbEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxZQUF1QjtRQUMxQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ2pELENBQUM7SUFFRCxLQUFLLENBQUMsU0FBUyxDQUNiLFlBQXFCLEVBQ3JCLFlBQXVCO1FBRXZCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFBO0lBQzFELENBQUM7SUFFRCxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQWtCO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUVELEtBQUssQ0FBQyxXQUFXLENBQ2YsWUFBb0IsRUFDcEIsSUFBYSxFQUNiLFFBQWlCO1FBRWpCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0lBRUQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxhQUFxQjtRQUN2QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ2pELENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQW9CO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDOUMsQ0FBQztJQUVELEtBQUssQ0FBQyxXQUFXO1FBQ2YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ2xDLENBQUM7Q0FDRjtBQXRERCxrREFzREMifQ==