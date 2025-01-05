import api from "../utils/axiosConfig"


export function fetchQuickAccess() {
    return new Promise(async (resolve, reject) => {
        api.get('/fetch').then((res)=>{
            if(res.status === 200){
                resolve(res.data.data)
            }
            
        }).catch(err=>reject(err))
    })
}

