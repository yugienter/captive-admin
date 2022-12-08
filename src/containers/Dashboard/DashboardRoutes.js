import React, { Suspense, lazy } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import Loader from "@iso/components/utility/loader";

const routes = [
  {
    path: "",
    component: lazy(() => import("@iso/containers/Widgets/Widgets")),
    exact: true,
  },
  {
    path: "company",
    component: lazy(() => import("@iso/containers/Company/View")),
  },
  {
    path: "host",
    component: lazy(() => import("@iso/containers/Host/View")),
  },
  {
    path: "product",
    component: lazy(() => import("@iso/containers/Product/View")),
  },
  {
    path: "campaign",
    component: lazy(() => import("@iso/containers/Campaign/View")),
  },
  {
    path: "direct-offer",
    component: lazy(() => import("@iso/containers/DirectOffer/View")),
  },
  {
    path: "invoice/:invoiceId",
    component: lazy(() => import("@iso/containers/Invoice/SingleInvoice")),
  },
  {
    path: "invoice",
    component: lazy(() => import("@iso/containers/Invoice/Invoices")),
  },
  {
    path: "payment-manage",
    component: lazy(() => import("@iso/containers/PaymentManage/View")),
  },
  {
    path: 'payment-manage/:paymentCode',
    component: lazy(() => import('@iso/containers/PaymentManage/View')),
  },
  {
    path: 'payment',
    component: lazy(() => import('@iso/containers/Payment/View')),
  },
  {
    path: "payment-job/:hostCode/:jobCode",
    component: lazy(() => import("@iso/containers/HostPayment/View")),
  },
  {
    path: "payment-job",
    component: lazy(() => import("@iso/containers/PaymentJob/View")),
  },
  {
    path: "host-payment",
    component: lazy(() => import("@iso/containers/PaymentJob/View")),
  },
  {
    path: "notification",
    component: lazy(() => import("@iso/containers/Notification")),
  },
  {
    path: "users",
    component: lazy(() => import("@iso/containers/Users/View")),
  },
  {
    path: "blank_page",
    component: lazy(() => import("@iso/containers/BlankPage")),
  },
];

export default function AppRouter() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}
