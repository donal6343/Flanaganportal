import { MedusaContainer } from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils"
import { INTACT_MODULE } from "../modules/intact"
import { IntactModuleService } from "../modules/intact/service/intact-module"

export default async function syncIntactStock(container: MedusaContainer) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const intactService: IntactModuleService = container.resolve(INTACT_MODULE)
  const inventoryService = container.resolve(Modules.INVENTORY)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  try {
    logger.info("[Intact Sync] Starting stock level sync...")

    const stockLevels = await intactService.getStockLevels()

    const { data: inventoryItems } = await query.graph({
      entity: "inventory_item",
      fields: ["id", "sku"],
    })

    const skuToInventoryMap = new Map(
      inventoryItems
        .filter((item) => item.sku != null)
        .map((item) => [item.sku as string, item.id])
    )

    let updated = 0
    for (const stockLevel of stockLevels) {
      const inventoryItemId = skuToInventoryMap.get(stockLevel.product_code)
      if (!inventoryItemId) continue

      const levels = await inventoryService.listInventoryLevels({
        inventory_item_id: inventoryItemId,
      })

      if (levels.length > 0) {
        await inventoryService.updateInventoryLevels([
          {
            inventory_item_id: inventoryItemId,
            location_id: levels[0].location_id,
            stocked_quantity: stockLevel.quantity_available,
          },
        ])
        updated++
      }
    }

    logger.info(`[Intact Sync] Stock sync complete. Updated ${updated} items.`)
  } catch (error) {
    logger.error(`[Intact Sync] Stock sync failed: ${error}`)
  }
}

export const config = {
  name: "sync-intact-stock",
  schedule: "*/30 * * * *",
}
