"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = customerCreatedHandler;
const utils_1 = require("@medusajs/framework/utils");
async function customerCreatedHandler({ event, container, }) {
    const logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    const customerService = container.resolve(utils_1.Modules.CUSTOMER);
    const customerId = event.data.id;
    try {
        const customer = await customerService.retrieveCustomer(customerId);
        await customerService.updateCustomers(customerId, {
            metadata: {
                ...(customer.metadata || {}),
                trade_account_status: "pending",
                trade_account_requested_at: new Date().toISOString(),
            },
        });
        logger.info(`[Trade Account] New registration pending approval: ${customer.email} (${customerId})`);
    }
    catch (error) {
        logger.error(`[Trade Account] Failed to set pending status for ${customerId}: ${error}`);
    }
}
exports.config = {
    event: "customer.created",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItY3JlYXRlZC10cmFkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9jdXN0b21lci1jcmVhdGVkLXRyYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHlDQTRCQztBQTlCRCxxREFBOEU7QUFFL0QsS0FBSyxVQUFVLHNCQUFzQixDQUFDLEVBQ25ELEtBQUssRUFDTCxTQUFTLEdBQ3NCO0lBQy9CLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDbEUsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFM0QsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUE7SUFFaEMsSUFBSSxDQUFDO1FBQ0gsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFlLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUE7UUFFbkUsTUFBTSxlQUFlLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRTtZQUNoRCxRQUFRLEVBQUU7Z0JBQ1IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO2dCQUM1QixvQkFBb0IsRUFBRSxTQUFTO2dCQUMvQiwwQkFBMEIsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRTthQUNyRDtTQUNGLENBQUMsQ0FBQTtRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQ1Qsc0RBQXNELFFBQVEsQ0FBQyxLQUFLLEtBQUssVUFBVSxHQUFHLENBQ3ZGLENBQUE7SUFDSCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE1BQU0sQ0FBQyxLQUFLLENBQ1Ysb0RBQW9ELFVBQVUsS0FBSyxLQUFLLEVBQUUsQ0FDM0UsQ0FBQTtJQUNILENBQUM7QUFDSCxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRSxrQkFBa0I7Q0FDMUIsQ0FBQSJ9