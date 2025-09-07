import { createRouter, createWebHistory } from "vue-router";

// auth
import Login from "@/pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
import ChangePassword from "../pages/auth/ChangePassword.vue";
import Dashboard from "@/pages/auth/Dashboard.vue";
import CompletedServiceList from "@/pages/auth/CompletedServiceList.vue";
import HelpPage from "../pages/auth/HelpPage.vue";

// sa
import ServiceOrder from "@/pages/sa/ServiceOrder.vue";
import ServiceList from "@/pages/sa/ServiceList.vue";
import ServiceDetail from "../pages/sa/ServiceDetail.vue";
import ServiceEdit from "../pages/sa/ServiceEdit.vue";

// qc
import FirstQC from "../pages/qc/FirstQC.vue";
import FinalQC from "../pages/qc/FinalQC.vue";

// mechanic
import MechanicTasks from "../pages/mechanic/MechanicTasks.vue";
import MechanicReport from "../pages/mechanic/MechanicReport.vue";

// inventory
import AddSparepart from "../pages/inventory/AddSparepart.vue";
import Inventory from "../pages/inventory/Inventory.vue";

// admin audit
import ApproveService from "../pages/adminAudit/ApproveService.vue";
import ApprovalSparepart from "../pages/adminAudit/ApprovalSparepart.vue";
import ManageUser from "../pages/adminAudit/ManageUser.vue";
import DailyReport from "../pages/adminAudit/DailyReport.vue";
import AuditTrail from "../pages/adminAudit/AuditTrail.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/auth/change-password",
    name: "ChangePassword",
    component: ChangePassword,
  },
  {
    path: "/auth/help",
    name: "HelpPage",
    component: HelpPage,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/auth/complete",
    name: "CompleteServiceList",
    component: CompletedServiceList,
  },

  // Sales Assistant Route
  {
    path: "/sa/service-order",
    name: "ServiceOrder",
    component: ServiceOrder,
  },
  {
    path: "/sa/service-list",
    name: "ServiceList",
    component: ServiceList,
  },
  {
    path: "/sa/service-detail/:id",
    name: "ServiceDetail",
    component: ServiceDetail,
  },
  {
    path: "/sa/service-edit/:id",
    name: "ServiceEdit",
    component: ServiceEdit,
  },

  // Qulity Control Route
  {
    path: "/qc/first-qc",
    name: "FirstQC",
    component: FirstQC,
  },
  {
    path: "/qc/final-qc",
    name: "FinalQC",
    component: FinalQC,
  },

  // Mechanic Route
  {
    path: "/mechanic/tasks",
    name: "MechanicTasks",
    component: MechanicTasks,
  },
  {
    path: "/mechanic/report",
    name: "MechanicReport",
    component: MechanicReport,
  },

  // Inventory Route
  {
    path: "/inventory/add-sparepart",
    name: "AddSparepart",
    component: AddSparepart,
  },
  {
    path: "/inventory/sparepart-list",
    name: "Inventory",
    component: Inventory,
  },
 
  // Admin Audit Route
  {
    path: "/adminAudit/approve-service",
    name: "ApproveService",
    component: ApproveService,
  },
  {
    path: "/adminAudit/approval",
    name: "ApprovalSparepart",
    component: ApprovalSparepart,
  },
  {
    path: "/adminAudit/manage-user",
    name: "ManageUser",
    component: ManageUser,
  },
  {
    path: "/adminAudit/daily-report",
    name: "DailyReport",
    component: DailyReport,
  },
  {
    path: "/adminAudit/audit-trail",
    name: "AuditTrail",
    component: AuditTrail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
