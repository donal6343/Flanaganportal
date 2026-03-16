"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = syncIntactStock;
const utils_1 = require("@medusajs/framework/utils");
const intact_1 = require("../modules/intact");
async function syncIntactStock(container) {
    const logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    const intactService = container.resolve(intact_1.INTACT_MODULE);
    const inventoryService = container.resolve(utils_1.Modules.INVENTORY);
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    try {
        logger.info("[Intact Sync] Starting stock level sync...");
        const stockLevels = await intactService.getStockLevels();
        const { data: inventoryItems } = await query.graph({
            entity: "inventory_item",
            fields: ["id", "sku"],
        });
        const skuToInventoryMap = new Map(inventoryItems
            .filter((item) => item.sku != null)
            .map((item) => [item.sku, item.id]));
        let updated = 0;
        for (const stockLevel of stockLevels) {
            const inventoryItemId = skuToInventoryMap.get(stockLevel.product_code);
            if (!inventoryItemId)
                continue;
            const levels = await inventoryService.listInventoryLevels({
                inventory_item_id: inventoryItemId,
            });
            if (levels.length > 0) {
                await inventoryService.updateInventoryLevels([
                    {
                        inventory_item_id: inventoryItemId,
                        location_id: levels[0].location_id,
                        stocked_quantity: stockLevel.quantity_available,
                    },
                ]);
                updated++;
            }
        }
        logger.info(`[Intact Sync] Stock sync complete. Updated ${updated} items.`);
    }
    catch (error) {
        logger.error(`[Intact Sync] Stock sync failed: ${error}`);
    }
}
exports.config = {
    name: "sync-intact-stock",
    schedule: "*/30 * * * *",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy1pbnRhY3Qtc3RvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvam9icy9zeW5jLWludGFjdC1zdG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFRQSxrQ0ErQ0M7QUF0REQscURBR2tDO0FBQ2xDLDhDQUFpRDtBQUdsQyxLQUFLLFVBQVUsZUFBZSxDQUFDLFNBQTBCO0lBQ3RFLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDbEUsTUFBTSxhQUFhLEdBQXdCLFNBQVMsQ0FBQyxPQUFPLENBQUMsc0JBQWEsQ0FBQyxDQUFBO0lBQzNFLE1BQU0sZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDN0QsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVoRSxJQUFJLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUE7UUFFekQsTUFBTSxXQUFXLEdBQUcsTUFBTSxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUE7UUFFeEQsTUFBTSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDakQsTUFBTSxFQUFFLGdCQUFnQjtZQUN4QixNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1NBQ3RCLENBQUMsQ0FBQTtRQUVGLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxHQUFHLENBQy9CLGNBQWM7YUFDWCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDO2FBQ2xDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBYSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUNoRCxDQUFBO1FBRUQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFBO1FBQ2YsS0FBSyxNQUFNLFVBQVUsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUNyQyxNQUFNLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQ3RFLElBQUksQ0FBQyxlQUFlO2dCQUFFLFNBQVE7WUFFOUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDeEQsaUJBQWlCLEVBQUUsZUFBZTthQUNuQyxDQUFDLENBQUE7WUFFRixJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3RCLE1BQU0sZ0JBQWdCLENBQUMscUJBQXFCLENBQUM7b0JBQzNDO3dCQUNFLGlCQUFpQixFQUFFLGVBQWU7d0JBQ2xDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVzt3QkFDbEMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLGtCQUFrQjtxQkFDaEQ7aUJBQ0YsQ0FBQyxDQUFBO2dCQUNGLE9BQU8sRUFBRSxDQUFBO1lBQ1gsQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLDhDQUE4QyxPQUFPLFNBQVMsQ0FBQyxDQUFBO0lBQzdFLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUMzRCxDQUFDO0FBQ0gsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFHO0lBQ3BCLElBQUksRUFBRSxtQkFBbUI7SUFDekIsUUFBUSxFQUFFLGNBQWM7Q0FDekIsQ0FBQSJ9