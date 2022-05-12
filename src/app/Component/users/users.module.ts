import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './all-users/all-users.component';
import { DetailsComponent } from './details/details.component';
import { RegesterComponent } from './regester/regester.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import{MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatInputModule} from '@angular/material/input'
import { MatSortModule } from '@angular/material/sort';
import { AddRolleComponent } from './add-rolle/add-rolle.component';
const routes:Routes=[
{path:'',component:AllUsersComponent },
{path:'regester',component:RegesterComponent},
{path:'UpdateUser',component:RegesterComponent},
{path:'details',component:DetailsComponent},
{path:'addRolle',component:AddRolleComponent}
]

@NgModule({
  declarations: [
    AllUsersComponent,
    DetailsComponent,
    RegesterComponent,
    AddRolleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSortModule,
    FormsModule

  ]
})
export class UsersModule { }
