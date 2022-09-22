import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PanelComponent } from './shared/panel/panel.component';
import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';
import { EditUserComponent } from './auth/edit-user/edit-user.component';
import { SuburbsComponent } from './auth/suburbs/suburbs.component';
import { EmployeeRolsComponent } from './auth/employee-rols/employee-rols.component';
import { SupportJobsComponent } from './auth/support-jobs/support-jobs.component';

const routes: Routes = [
  { path: '', component: HomeComponent,  pathMatch: "full"  },
  { path: 'panel', component: PanelComponent,  canActivate: [AuthGuard]  },
  { path: 'edit-user/:id', component: EditUserComponent,  canActivate: [AuthGuard]  },
  { path: 'suburbs', component: SuburbsComponent,  canActivate: [AuthGuard]  },
  { path: 'employee-rols', component: EmployeeRolsComponent,  canActivate: [AuthGuard]  },
  { path: 'support-jobs', component: SupportJobsComponent,  canActivate: [AuthGuard]  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
