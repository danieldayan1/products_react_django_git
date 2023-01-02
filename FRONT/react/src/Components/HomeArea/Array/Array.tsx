import "./Array.css";

function Array(): JSX.Element {
    
    function getRandomPrice(min:number,max:number){
        const price = Math.floor(min + Math.random()*max);
        return price;
    }
    
    let arr = [
        {id:1 , name:"chips" , price:getRandomPrice(10,20)},
        {id:2 , name:"ice cream" , price:getRandomPrice(15,30)},
        {id:3 , name:"coca cola" , price:getRandomPrice(5,10)},
        {id:4 , name:"burger" , price:getRandomPrice(30,50)},
    ]

    return (
        <div className="Array">
			{arr.map(item => <span className="box">ID:{item.id} Name:{item.name} price:{item.price}</span>)}
        </div>
    );
}

export default Array;
