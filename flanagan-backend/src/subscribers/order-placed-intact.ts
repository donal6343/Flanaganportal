import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { INTACT_MODULE } from "../modules/intact"
import { IntactModuleService } from "../modules/intact/service/intact-module"
import { IntactOrder, IntactOrderLine } from "../modules/intact/types"

export default async function orderPlacedHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const intactService: IntactModuleService = container.resolve(INTACT_MODULE)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const orderId = event.data.id

  try {
    logger.info(`[Intact] Pushing order ${orderId} to Intact Software...`)

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
    })

    if (!order) {
      logger.warn(`[Intact] Order ${orderId} not found.`)
      return
    }

    const lines: IntactOrderLine[] = (order.items || [])
      .filter((item): item is NonNullable<typeof item> => item != null)
      .map((item) => ({
        product_code: String((item as any).variant?.sku || ""),
        quantity: Number(item.quantity) || 0,
        unit_price: (Number(item.unit_price) || 0) / 100,
        description: String(item.title || ""),
      }))

    const shippingAddress = order.shipping_address as Record<string, string> | null

    const intactOrder: IntactOrder = {
      order_number: `FF-${order.display_id}`,
      customer_code: order.email as string,
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
    }

    const result = await intactService.pushOrder(intactOrder)
    logger.info(
      `[Intact] Order ${orderId} pushed successfully. Intact ref: ${result.order_number}`
    )
  } catch (error) {
    logger.error(`[Intact] Failed to push order ${orderId}: ${error}`)
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
