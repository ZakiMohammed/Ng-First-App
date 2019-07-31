export class Pagination{
    numbers:number[];
    numbersCount: number;
    index:number;
    count: number;
    totalCount: number;
    filterCount: number;
    currentPage: number;      
    list:any;    
    searchText:string;
    orderBy:string;
    orderDir:string;
    nextDotsVisible:boolean;
    prevDotsVisible:boolean;
    nextVisible:boolean;
    prevVisible:boolean;
    firstVisible:boolean;
    lastVisible:boolean;
  
    public nextCallBack: { (): void; };
    public previousCallBack: { (): void; };
    public firstCallBack: { (): void; };
    public lastCallBack: { (): void; };
    public currentCallBack: { (): void; };
    public searchCallBack: { (): void; };
    public orderCallBack: { (by): void; };
  
    constructor(numbers:number[], index:number, count:number, list:any, searchText:string, orderBy:string, orderDir:string, numbersCount: number = 5, currentPage: number = 1 ){
        this.numbers = numbers;
        this.index = index;
        this.count = count;
        this.list = list;    
        this.searchText = searchText;    
        this.orderBy = orderBy;
        this.orderDir = orderDir;
        this.numbersCount = numbersCount;
        this.currentPage = currentPage;
        this.nextVisible = false;
        this.prevVisible = false;
        this.nextDotsVisible = false;
        this.prevDotsVisible = false;
        this.firstVisible = true;
        this.lastVisible = true;
    }
  
    next(){        
        if(this.index + this.count < this.filterCount){            
            this.index += this.count;
            this.currentPage++;
            this.nextCallBack();
        }
    }
  
    previous(){        
        if(this.index - this.count >= 0){            
            this.index -= this.count;
            this.currentPage--;
            this.previousCallBack();
        }
    }
  
    first(){        
        this.index = 0;
        this.currentPage = 1;
        this.firstCallBack();
    }
  
    last(){        
        this.index = (Math.ceil(this.filterCount / this.count) * this.count) - this.count;        
        this.currentPage = Math.ceil(this.filterCount / this.count);
        this.lastCallBack();
    }
  
    current(page:number){
        this.index = this.count * (page - 1);
        this.currentPage = page;
        this.currentCallBack();    
    }
  
    nextDots(){
        this.adjustNumbers(true);
    }
  
    previousDots(){
        this.adjustNumbers(false, true);
    }
  
    search(){
        this.index = 0;
        this.searchCallBack();
    }
  
    order(by:string){
        this.orderBy = by;
        this.orderDir = this.orderDir == 'ASC' ? 'DESC' : 'ASC'
        this.orderCallBack(by);
    }
  
    adjustNumbers(nextDots:boolean = false, prevDots:boolean = false){
  
      if (this.filterCount === 0){
          this.nextVisible = false;
          this.prevVisible = false;
          this.nextDotsVisible = false;
          this.prevDotsVisible = false;
          this.firstVisible = false;
          this.lastVisible = false;
          this.numbers = [];
          return;
      }
  
        let limit = 0;
        let start = 0;
        let end = 0;
        let mod = this.currentPage % this.numbersCount;
        let lastPage = Math.ceil(this.filterCount / this.count);        
  
        if (mod > 0) {
            limit = this.currentPage + (this.numbersCount - mod);
        }
        else {
            let prevPage = this.currentPage - 1;
            limit = prevPage + (this.numbersCount - (prevPage % this.numbersCount));
        }
  
        start = (limit - this.numbersCount) + 1;
        end = (start + this.numbersCount) - 1;
  
        if (nextDots) {
            start = this.numbers[0] + this.numbersCount;
            end = this.numbers[this.numbers.length - 1] + this.numbersCount;
        }
        if (prevDots) {
            start = this.numbers[0] - this.numbersCount;
            end = start + (this.numbersCount - 1);
        }
  
        if (end >= lastPage) {
            end = lastPage;
            this.nextDotsVisible = false;
        }
        else {
            this.nextDotsVisible = true;
        }
  
        this.prevDotsVisible = start !== 1;
        this.prevVisible = this.currentPage !== 1;
        this.nextVisible = this.currentPage !== lastPage;
  
        this.numbers = [];
        for (let i = start; i <= end; i++) {
            this.numbers.push(i);
        }
    }
  }