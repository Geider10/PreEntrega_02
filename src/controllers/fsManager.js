import { existsSync, writeFileSync, readFileSync } from "fs"

class FsManager {
    constructor(filePath){
        this.filePath = filePath
    }
    creatFile(){
        if(!existsSync(this.filePath)){
            writeFileSync(this.filePath,JSON.stringify([]))
        }
    }
    loadProducts(){
        const file = readFileSync(this.filePath,"utf-8")
        return JSON.parse(file)
    }
    saveProducts(products){
        writeFileSync(this.filePath,JSON.stringify(products, null, 2))
    }
}

export default FsManager