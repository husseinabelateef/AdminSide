export interface User {
  name: string;
  email: string;
  mobileNo: string[];
  username:string;
  
  address: {
    street: string;
    postalCode: string;
    city:string
  };
  Delivery:Date;
  password:string
}
