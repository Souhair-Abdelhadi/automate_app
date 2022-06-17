const deleteData = async (url,body) => {


    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin','http://localhost:3000');
    headers.append('Authorization','bearer '+localStorage.getItem('access_token'))



    if(body){
            const res1 = await fetch("http://localhost:3001/" + url, {
                mode: 'cors',
                method: 'DELETE',
                headers: headers,
                body : JSON.stringify(body)
            });
            const body1 = res1;
            var status1,clone_body1 = res1.clone();
            await body1.json().then((data) => {
                status1 = data
            })
            console.log("status : ", status1)
            if (status1.status == 'TOKEN_ERROR') {
                const res2 = await fetch('http://localhost:3001/token', {
                    mode: 'cors',
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        token: localStorage.getItem('refresh_token'),
                        email: JSON.parse(localStorage.getItem('user')).email
                    })
                })
                const body2 = res2 
                var clone_body2 = res2.clone();
                var access_token;
                var refresh_token;
                await body2.json().then((data) => {
                    status1 = data
                    access_token = data.access_token
                    refresh_token = data.refresh_token
                })
                console.log("status 2:", status1)
                if (status1.status == 'OK') {
                    localStorage.setItem('access_token', access_token)
                    headers.set('Authorization', 'bearer ' + access_token)
                    const res3 = await fetch("http://localhost:3001/" + url, {
                        mode: 'cors',
                        method: 'DELETE',
                        headers: headers,
                        body : JSON.stringify(body)
                    })
                    console.log("access_token refreshed")
                    const body3 = res3 
                    console.log(body3)
                    return body3
                }
                else {
                    return {
                        status: "ERROR",
                        message: "you need to log in again"
                    }
                }
            }
            else {
                return clone_body1
            }
      
    }
    
            
}

export default deleteData;