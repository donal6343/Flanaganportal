"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveTradeAccountWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const utils_1 = require("@medusajs/framework/utils");
const approveCustomerStep = (0, workflows_sdk_1.createStep)("approve-customer-step", async (input, { container }) => {
    const customerService = container.resolve(utils_1.Modules.CUSTOMER);
    const customer = await customerService.retrieveCustomer(input.customer_id);
    const previousMetadata = customer.metadata || {};
    await customerService.updateCustomers(input.customer_id, {
        metadata: {
            ...previousMetadata,
            trade_account_status: "approved",
            trade_account_approved_at: new Date().toISOString(),
        },
    });
    return new workflows_sdk_1.StepResponse({ customer_id: input.customer_id }, { customer_id: input.customer_id, previousMetadata });
}, async (compensationInput, { container }) => {
    if (!compensationInput)
        return;
    const customerService = container.resolve(utils_1.Modules.CUSTOMER);
    await customerService.updateCustomers(compensationInput.customer_id, {
        metadata: compensationInput.previousMetadata,
    });
});
exports.approveTradeAccountWorkflow = (0, workflows_sdk_1.createWorkflow)("approve-trade-account", (input) => {
    const result = approveCustomerStep(input);
    return new workflows_sdk_1.WorkflowResponse(result);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwcm92ZS10cmFkZS1hY2NvdW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9hcHByb3ZlLXRyYWRlLWFjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBSzBDO0FBQzFDLHFEQUFtRDtBQU1uRCxNQUFNLG1CQUFtQixHQUFHLElBQUEsMEJBQVUsRUFDcEMsdUJBQXVCLEVBQ3ZCLEtBQUssRUFBRSxLQUErQixFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUN2RCxNQUFNLGVBQWUsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUUzRCxNQUFNLFFBQVEsR0FBRyxNQUFNLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDMUUsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtJQUVoRCxNQUFNLGVBQWUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtRQUN2RCxRQUFRLEVBQUU7WUFDUixHQUFHLGdCQUFnQjtZQUNuQixvQkFBb0IsRUFBRSxVQUFVO1lBQ2hDLHlCQUF5QixFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO1NBQ3BEO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsT0FBTyxJQUFJLDRCQUFZLENBQ3JCLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFDbEMsRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxDQUNyRCxDQUFBO0FBQ0gsQ0FBQyxFQUNELEtBQUssRUFBRSxpQkFBaUIsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDekMsSUFBSSxDQUFDLGlCQUFpQjtRQUFFLE9BQU07SUFDOUIsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDM0QsTUFBTSxlQUFlLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRTtRQUNuRSxRQUFRLEVBQUUsaUJBQWlCLENBQUMsZ0JBQWdCO0tBQzdDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FDRixDQUFBO0FBRVksUUFBQSwyQkFBMkIsR0FBRyxJQUFBLDhCQUFjLEVBQ3ZELHVCQUF1QixFQUN2QixDQUFDLEtBQStCLEVBQUUsRUFBRTtJQUNsQyxNQUFNLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN6QyxPQUFPLElBQUksZ0NBQWdCLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDckMsQ0FBQyxDQUNGLENBQUEifQ==