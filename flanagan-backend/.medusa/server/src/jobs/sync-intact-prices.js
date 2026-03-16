"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = syncIntactPrices;
const utils_1 = require("@medusajs/framework/utils");
const intact_1 = require("../modules/intact");
async function syncIntactPrices(container) {
    const logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    const intactService = container.resolve(intact_1.INTACT_MODULE);
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    try {
        logger.info("[Intact Sync] Starting price sync...");
        const prices = await intactService.getPrices();
        const { data: productVariants } = await query.graph({
            entity: "product_variant",
            fields: ["id", "sku"],
        });
        const skuToVariantMap = new Map(productVariants
            .filter((v) => v.sku != null)
            .map((v) => [v.sku, v.id]));
        let updated = 0;
        for (const price of prices) {
            const variantId = skuToVariantMap.get(price.product_code);
            if (!variantId)
                continue;
            updated++;
        }
        logger.info(`[Intact Sync] Price sync complete. Matched ${updated} variants.`);
    }
    catch (error) {
        logger.error(`[Intact Sync] Price sync failed: ${error}`);
    }
}
exports.config = {
    name: "sync-intact-prices",
    schedule: "0 */2 * * *",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy1pbnRhY3QtcHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2pvYnMvc3luYy1pbnRhY3QtcHJpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLG1DQWtDQztBQXRDRCxxREFBcUU7QUFDckUsOENBQWlEO0FBR2xDLEtBQUssVUFBVSxnQkFBZ0IsQ0FBQyxTQUEwQjtJQUN2RSxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2xFLE1BQU0sYUFBYSxHQUF3QixTQUFTLENBQUMsT0FBTyxDQUFDLHNCQUFhLENBQUMsQ0FBQTtJQUMzRSxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWhFLElBQUksQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQTtRQUVuRCxNQUFNLE1BQU0sR0FBRyxNQUFNLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUU5QyxNQUFNLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNsRCxNQUFNLEVBQUUsaUJBQWlCO1lBQ3pCLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7U0FDdEIsQ0FBQyxDQUFBO1FBRUYsTUFBTSxlQUFlLEdBQUcsSUFBSSxHQUFHLENBQzdCLGVBQWU7YUFDWixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDO2FBQzVCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUN2QyxDQUFBO1FBRUQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFBO1FBQ2YsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUMzQixNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUN6RCxJQUFJLENBQUMsU0FBUztnQkFBRSxTQUFRO1lBQ3hCLE9BQU8sRUFBRSxDQUFBO1FBQ1gsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQ1QsOENBQThDLE9BQU8sWUFBWSxDQUNsRSxDQUFBO0lBQ0gsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO0lBQzNELENBQUM7QUFDSCxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQUc7SUFDcEIsSUFBSSxFQUFFLG9CQUFvQjtJQUMxQixRQUFRLEVBQUUsYUFBYTtDQUN4QixDQUFBIn0=