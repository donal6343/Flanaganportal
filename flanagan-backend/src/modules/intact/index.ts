import { Module } from "@medusajs/framework/utils"
import { IntactModuleService } from "./service/intact-module"

export const INTACT_MODULE = "intactModule"

export default Module(INTACT_MODULE, {
  service: IntactModuleService,
})
