export function ajouter (data){
var data2={
    event:data.event,
    date:new Date(),
    session:data.session
}
fetch("https://apipnp3.herokuapp.com/api/Journal/ajouter", {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json','Authorization': 'bearer '+data.token 
        }),
        body: JSON.stringify(data2)
    })

}