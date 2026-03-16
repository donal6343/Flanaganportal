"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = orderPlacedHandler;
const utils_1 = require("@medusajs/framework/utils");
const intact_1 = require("../modules/intact");
async function orderPlacedHandler({ event, container, }) {
    const logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    const intactService = container.resolve(intact_1.INTACT_MODULE);
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const orderId = event.data.id;
    try {
        logger.info(`[Intact] Pushing order ${orderId} to Intact Software...`);
        const { data: [order] } = await query.graph({
            entity: "order",
            fields: [
                "id",
                "display_id",
                "email",
                "currency_code",
                "shipping_address.*",
                "items.*",
                "items.variant.*",
                "customer.*",
            ],
            filters: { id: orderId },
        });
        if (!order) {
            logger.warn(`[Intact] Order ${orderId} not found.`);
            return;
        }
        const lines = (order.items || [])
            .filter((item) => item != null)
            .map((item) => ({
            product_code: String(item.variant?.sku || ""),
            quantity: Number(item.quantity) || 0,
            unit_price: (Number(item.unit_price) || 0) / 100,
            description: String(item.title || ""),
        }));
        const shippingAddress = order.shipping_address;
        const intactOrder = {
            order_number: `FF-${order.display_id}`,
            customer_code: order.email,
            order_date: new Date().toISOString().split("T")[0],
            delivery_address: {
                name: `${shippingAddress?.first_name || ""} ${shippingAddress?.last_name || ""}`.trim(),
                address_1: shippingAddress?.address_1 || "",
                address_2: shippingAddress?.address_2 || undefined,
                city: shippingAddress?.city || "",
                postcode: shippingAddress?.postal_code || "",
                country: shippingAddress?.country_code || "",
            },
            lines,
        };
        const result = await intactService.pushOrder(intactOrder);
        logger.info(`[Intact] Order ${orderId} pushed successfully. Intact ref: ${result.order_number}`);
    }
    catch (error) {
        logger.error(`[Intact] Failed to push order ${orderId}: ${error}`);
    }
}
exports.config = {
    event: "order.placed",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcGxhY2VkLWludGFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9vcmRlci1wbGFjZWQtaW50YWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLHFDQWtFQztBQXZFRCxxREFBOEU7QUFDOUUsOENBQWlEO0FBSWxDLEtBQUssVUFBVSxrQkFBa0IsQ0FBQyxFQUMvQyxLQUFLLEVBQ0wsU0FBUyxHQUNzQjtJQUMvQixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2xFLE1BQU0sYUFBYSxHQUF3QixTQUFTLENBQUMsT0FBTyxDQUFDLHNCQUFhLENBQUMsQ0FBQTtJQUMzRSxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWhFLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFBO0lBRTdCLElBQUksQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLE9BQU8sd0JBQXdCLENBQUMsQ0FBQTtRQUV0RSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDMUMsTUFBTSxFQUFFLE9BQU87WUFDZixNQUFNLEVBQUU7Z0JBQ04sSUFBSTtnQkFDSixZQUFZO2dCQUNaLE9BQU87Z0JBQ1AsZUFBZTtnQkFDZixvQkFBb0I7Z0JBQ3BCLFNBQVM7Z0JBQ1QsaUJBQWlCO2dCQUNqQixZQUFZO2FBQ2I7WUFDRCxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFO1NBQ3pCLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLE9BQU8sYUFBYSxDQUFDLENBQUE7WUFDbkQsT0FBTTtRQUNSLENBQUM7UUFFRCxNQUFNLEtBQUssR0FBc0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQzthQUNqRCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQW9DLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO2FBQ2hFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNkLFlBQVksRUFBRSxNQUFNLENBQUUsSUFBWSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDO1lBQ3RELFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDcEMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHO1lBQ2hELFdBQVcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7U0FDdEMsQ0FBQyxDQUFDLENBQUE7UUFFTCxNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsZ0JBQWlELENBQUE7UUFFL0UsTUFBTSxXQUFXLEdBQWdCO1lBQy9CLFlBQVksRUFBRSxNQUFNLEtBQUssQ0FBQyxVQUFVLEVBQUU7WUFDdEMsYUFBYSxFQUFFLEtBQUssQ0FBQyxLQUFlO1lBQ3BDLFVBQVUsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsZ0JBQWdCLEVBQUU7Z0JBQ2hCLElBQUksRUFBRSxHQUFHLGVBQWUsRUFBRSxVQUFVLElBQUksRUFBRSxJQUFJLGVBQWUsRUFBRSxTQUFTLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFO2dCQUN2RixTQUFTLEVBQUUsZUFBZSxFQUFFLFNBQVMsSUFBSSxFQUFFO2dCQUMzQyxTQUFTLEVBQUUsZUFBZSxFQUFFLFNBQVMsSUFBSSxTQUFTO2dCQUNsRCxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksSUFBSSxFQUFFO2dCQUNqQyxRQUFRLEVBQUUsZUFBZSxFQUFFLFdBQVcsSUFBSSxFQUFFO2dCQUM1QyxPQUFPLEVBQUUsZUFBZSxFQUFFLFlBQVksSUFBSSxFQUFFO2FBQzdDO1lBQ0QsS0FBSztTQUNOLENBQUE7UUFFRCxNQUFNLE1BQU0sR0FBRyxNQUFNLGFBQWEsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDekQsTUFBTSxDQUFDLElBQUksQ0FDVCxrQkFBa0IsT0FBTyxxQ0FBcUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUNwRixDQUFBO0lBQ0gsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxPQUFPLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUNwRSxDQUFDO0FBQ0gsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUUsY0FBYztDQUN0QixDQUFBIn0=