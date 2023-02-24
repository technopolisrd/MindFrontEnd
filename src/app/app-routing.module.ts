import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "dashboard",
    loadChildren: () => import("./protected/protected.module").then(m => m.ProtectedModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false
  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
