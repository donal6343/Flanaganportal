"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const utils_1 = require("@medusajs/framework/utils");
const intact_1 = require("../../../../../../modules/intact");
async function GET(req, res) {
    const logger = req.scope.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    try {
        const customerEmail = req.auth_context?.actor_id;
        if (!customerEmail) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const invoiceNumber = req.params.invoiceNumber;
        const intactService = req.scope.resolve(intact_1.INTACT_MODULE);
        const pdfBuffer = await intactService.getInvoicePdf(invoiceNumber);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="invoice-${invoiceNumber}.pdf"`);
        return res.send(pdfBuffer);
    }
    catch (error) {
        logger.error(`[Intact] Failed to fetch invoice PDF: ${error}`);
        return res.status(500).json({ message: "Failed to fetch invoice PDF" });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2ludGFjdC9pbnZvaWNlcy9baW52b2ljZU51bWJlcl0vcGRmL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0Esa0JBd0JDO0FBNUJELHFEQUFxRTtBQUNyRSw2REFBZ0U7QUFHekQsS0FBSyxVQUFVLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQy9ELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRWxFLElBQUksQ0FBQztRQUNILE1BQU0sYUFBYSxHQUFJLEdBQTBELENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQTtRQUN4RyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDbkIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFBO1FBQzFELENBQUM7UUFFRCxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQTtRQUU5QyxNQUFNLGFBQWEsR0FBd0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsc0JBQWEsQ0FBQyxDQUFBO1FBQzNFLE1BQU0sU0FBUyxHQUFHLE1BQU0sYUFBYSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUVsRSxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO1FBQ2hELEdBQUcsQ0FBQyxTQUFTLENBQ1gscUJBQXFCLEVBQ3JCLGlDQUFpQyxhQUFhLE9BQU8sQ0FDdEQsQ0FBQTtRQUNELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUM1QixDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMseUNBQXlDLEtBQUssRUFBRSxDQUFDLENBQUE7UUFDOUQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxDQUFDLENBQUE7SUFDekUsQ0FBQztBQUNILENBQUMifQ==