import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ProductModel } from 'src/Models/ProductModel';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProductServicesService } from 'src/app/Services/product-services.service';
import { debounceTime, distinctUntilChanged, fromEvent, merge, Subscription, tap } from 'rxjs';
import { ProductDataSourceService } from 'src/app/Services/ProductDataSource.service';
import { ProductFiltered } from 'src/app/ViewModels/ProductFiltered';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductsComponent implements OnInit,AfterViewInit, OnDestroy{
  dataSource: ProductDataSourceService;
  subscriptions:Subscription[]=[]
  products!: ProductModel[]
  private paginator!: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
}
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef;
  displayedColumns: string[] = ['id', 'name', 'quantity', 'price','categoryId','CreatedDate'];
  expandedElement: ProductModel | null = null;
  constructor(private productService: ProductServicesService) {
      this.dataSource = new ProductDataSourceService(this.productService);
      this.productService.getAllProducts().subscribe(x=>this.products = x);
  }

   ngOnInit():void{
    this.dataSource = new ProductDataSourceService(this.productService);
   let product :ProductFiltered =
   {page:0,size:3,filter:"",id:0,order: "asc"}
    this.dataSource.loadProducts(product);
    this.loadProducts();
  }
  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadProducts())
    )
    .subscribe();
    fromEvent(this.input.nativeElement,'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
            this.paginator.pageIndex = 0;

            this.loadProducts();
        })
    ).subscribe();
    console.log("fromAfter")
    console.log(this.products)
    this.paginator.page.pipe(tap(() => this.loadProducts())).subscribe();

  }
  Delete(productId:number){
    // this.productService.deleteProduct(productId);
    this.loadProducts()
  }
  loadProducts(){

    let product :ProductFiltered =
    {page:this.paginator.pageIndex,size:this.paginator.pageSize,filter:this.input.nativeElement.value,
      id:(this.sort.active)?1:0,order: this.sort.direction}

 this.dataSource.loadProducts(product)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(ele=>{
      ele.unsubscribe()
    })
  }

}

