export class Logger {

    static isLog: boolean = false

    static log(...any: any[]) {
        if(this.isLog) {
            console.log(...any)
        }
    }
}