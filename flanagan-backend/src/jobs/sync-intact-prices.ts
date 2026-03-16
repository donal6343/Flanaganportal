import { MedusaContainer } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { INTACT_MODULE } from "../modules/intact"
import { IntactModuleService } from "../modules/intact/service/intact-module"

export default async function syncIntactPrices(container: MedusaContainer) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const intactService: IntactModuleService = container.resolve(INTACT_MODULE)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  try {
    logger.info("[Intact Sync] Starting price sync...")

    const prices = await intactService.getPrices()

    const { data: productVariants } = await query.graph({
      entity: "product_variant",
      fields: ["id", "sku"],
    })

    const skuToVariantMap = new Map(
      productVariants
        .filter((v) => v.sku != null)
        .map((v) => [v.sku as string, v.id])
    )

    let updated = 0
    for (const price of prices) {
      const variantId = skuToVariantMap.get(price.product_code)
      if (!variantId) continue
      updated++
    }

    logger.info(
      `[Intact Sync] Price sync complete. Matched ${updated} variants.`
    )
  } catch (error) {
    logger.error(`[Intact Sync] Price sync failed: ${error}`)
  }
}

export const config = {
  name: "sync-intact-prices",
  schedule: "0 */2 * * *",
}
