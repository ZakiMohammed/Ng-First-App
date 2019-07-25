export class User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: any;
    phone: string;
    website: string;
    company: any;

    get fullAddress() {
        return  this.address.street + ', ' + 
                this.address.suite + ', ' +
                this.address.city + ', ' +
                this.address.zipcode;
    }

    get fullCompany() {
        return  this.company.name + ', ' + 
                this.company.catchPhrase + ', ' +
                this.company.bs;
    }
}
