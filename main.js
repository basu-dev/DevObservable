

 class Observable{
    constructor(observer){
        this.observer=observer
    }
    subscribe({next,error,complete}){
        return this.observer({next,error,complete})
    }
    map(cb=(v)=>v){
         return new Observable(({next,error,complete})=>{
             this.subscribe({
                 next:value=>{
                    next(cb(value))
                 }
             })
         })
    }
    do(cb){
        return new Observable(({next})=>{
            this.subscribe({
                next:(v)=>{
                    cb(v);
                    next(v);
                }
            })
        })
    }
    filter(cb){
        return new Observable(({next})=>{
            this.subscribe({
                next:(value)=>{
                    if(cb(value)){
                        next(value)
                    }
                }
            })
        })
    }
 }

const creater= new Observable(({next,error,complete})=>{
    let i=0;
    const btn=document.querySelector("input[name=textinput]");
    console.log(btn)
    btn.addEventListener('input',(e)=>{next(e.target.value)});
});
const subscriber= creater
.do(x=>console.log("From do",x))
.filter(x=>x.length >2 && x.length<10)
.map(x=>`<h2 >${x}</h2>`)
.subscribe({
    next:(value)=>{
        console.log(value)
       let div= document.createElement("div");
        div.innerHTML=value;
        document.body.append(div)},
    error:(err)=>{cosnsole.log(err)},
    complete:(msg)=>{console.log(msg)}
    }
)
