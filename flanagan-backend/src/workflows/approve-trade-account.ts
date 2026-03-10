import {
  createWorkflow,
  WorkflowResponse,
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"

type ApproveTradeAccountInput = {
  customer_id: string
}

const approveCustomerStep = createStep(
  "approve-customer-step",
  async (input: ApproveTradeAccountInput, { container }) => {
    const customerService = container.resolve(Modules.CUSTOMER)

    const customer = await customerService.retrieveCustomer(input.customer_id)
    const previousMetadata = customer.metadata || {}

    await customerService.updateCustomers(input.customer_id, {
      metadata: {
        ...previousMetadata,
        trade_account_status: "approved",
        trade_account_approved_at: new Date().toISOString(),
      },
    })

    return new StepResponse(
      { customer_id: input.customer_id },
      { customer_id: input.customer_id, previousMetadata }
    )
  },
  async (compensationInput, { container }) => {
    if (!compensationInput) return
    const customerService = container.resolve(Modules.CUSTOMER)
    await customerService.updateCustomers(compensationInput.customer_id, {
      metadata: compensationInput.previousMetadata,
    })
  }
)

export const approveTradeAccountWorkflow = createWorkflow(
  "approve-trade-account",
  (input: ApproveTradeAccountInput) => {
    const result = approveCustomerStep(input)
    return new WorkflowResponse(result)
  }
)
