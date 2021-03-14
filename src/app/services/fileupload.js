const fs = require('fs');
const path = require('path');


module.exports = class FileUpload {

    constructor(){
        this.dirname =path.join(__dirname,'..','..','..','storage','uploads');
    }
    
    
    async upload(file,dir=''){
        const  {name,size,encoding,tempFilePath,truncated,mimetype,md5} = file;
        const targetDir=path.join(this.dirname,dir) ;
        try{
            if(!fs.existsSync(targetDir)){
                fs.mkdirSync(targetDir, { recursive: true });
            }
            const tempFileName = Date.now()+'.'+name;

            const filename = dir?(dir+"/"+tempFileName):tempFileName;

            const uploadPath = path.join(this.dirname,filename);
            
            await file.mv(uploadPath);
            
            const info = {
                name,size,encoding,tempFilePath,truncated,mimetype,md5,
                savePath:filename
            };
            return info;
        }
        catch(error){
            throw error;
        }
    }

}