export class Helper {
    public static order<T>(a: T, b: T, key: string, desc: boolean = false) {

        const genreA = a[key].toUpperCase();
        const genreB = b[key].toUpperCase();
      
        let comparison = 0;
        if (desc) {            
            if (genreA < genreB) {
                comparison = 1;
            } else if (genreA > genreB) {
                comparison = -1;
            }
        } else {
            if (genreA > genreB) {
                comparison = 1;
            } else if (genreA < genreB) {
                comparison = -1;
            }            
        }
        return comparison;
      }
}
