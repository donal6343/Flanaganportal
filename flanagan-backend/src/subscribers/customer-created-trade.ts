import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

export default async function customerCreatedHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const customerService = container.resolve(Modules.CUSTOMER)

  const customerId = event.data.id

  try {
    const customer = await customerService.retrieveCustomer(customerId)

    await customerService.updateCustomers(customerId, {
      metadata: {
        ...(customer.metadata || {}),
        trade_account_status: "pending",
        trade_account_requested_at: new Date().toISOString(),
      },
    })

    logger.info(
      `[Trade Account] New registration pending approval: ${customer.email} (${customerId})`
    )
  } catch (error) {
    logger.error(
      `[Trade Account] Failed to set pending status for ${customerId}: ${error}`
    )
  }
}

export const config: SubscriberConfig = {
  event: "customer.created",
}
