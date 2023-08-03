const data = JSON.parse(localStorage.getItem("data"));//extracting data from the prev webpage
const player1data = data.player1;//player 1 object stored
const player2data = data.player2;//player 2 object stored
const reload = document.querySelector("body img");// to exit the page and go to hoe page
const replay = document.querySelector(".replay");
const footer = document.querySelector(".footer");
reload.addEventListener("click",function()// reload applied 
{
    window.location.href = "index.html";
});
replay.addEventListener("click",function()// reload applied 
{
    window.location.href = "gameplay.html";
});


function player()//plyaers attributes defined
{
    this.name,// name 
    this.image,// image
    this.turn = [];// array having the divs selected by the player 
}
checkboard(player1data,player2data);//playing the game with 2 arguements
function checkboard(player1data,player2data) 
{
    let winner = document.createElement("div");
    winner.classList.add("winner");
    const player1 = new player();//player1 onject initialized
    const player2 = new player();//player2 object initialized
    const divs = Array.from(document.querySelectorAll(".gameboard div"));//stroing all the divs as array
    divs.forEach(div=>
        {
        div.addEventListener('click',check)//adding click event to operate further
    });
    const checkboardelements = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];//winning slots
    player1.image = document.querySelector('.player1 img');//img1 selector
    player2.image = document.querySelector('.player2 img');//img2 selector
    player1.name = document.querySelector('.name1');//player1 name selector
    player2.name = document.querySelector('.name2');//player2 name selector
    player1.image.src = player1data.url;//src for img1
    player2.image.src = player2data.url;//src for img2 
    player1.name.textContent = player1data.name;//storing the name of p1
    player2.name.textContent = player2data.name;//storing the name of p2
    let play = 1;//no of divs selected
    player1.image.classList.add("change");//indicating player1 to play first
    function check(e) // after click further operation
    {
        if (e.target.classList.contains('selected')) return;//if it is already clicked return i.e selected
        let chance =  play % 2 == 1 ? player1data : player2data;//deciding whose chance is it
        let divno = e.target.classList[0].toString()[1];//selecting the div no selected
        e.target.classList.add('selected');//setting it to be selected
        e.target.style.backgroundImage = `url(${chance.url})`; //indicating the selected div by the img of player
        player1.image.classList.toggle("change");//will toggle to the player's turn
        player2.image.classList.toggle("change");
        if(chance==player1data) 
        {
            player1.turn.push(+divno);
            if(player1.turn.length>=3)
            {
                let winornot = checkforwin(player1.turn);
                if(winornot.win)
                {
                    winner.textContent = player1data.name + " wins!!!";
                    footer.appendChild(winner);
                    winornot.windeck.forEach(Element=>
                {
                        let divwin = document.querySelector(".gameboard .a"+Element);
                        divwin.classList.add("change");
                })

                    return;

                }
            }
        }
        else
        {
            player2.turn.push(+divno);
            if(player2.turn.length>=3)
            {
                let winornot = checkforwin(player2.turn);
                if(winornot.win)
                {
                    winner.textContent = player2data.name + " wins!!!";
                    footer.appendChild(winner);

                    winornot.windeck.forEach(Element=>
                {
                        let divwin = document.querySelector(".gameboard .a"+Element);
                        divwin.classList.add("change");
                })

                    return;
                }
            }

        }
        play++;
        if(play===10)
        {
            winner.textContent = "draw";
            footer.appendChild(winner);

            return;
        }

    }
        function checkforwin(pno)//function that checks wherher input player has won or not 
        {
            let win = false;//initial status for winning 
            let windeck;//used to store the divs that the winner has
            checkboardelements.forEach(Element=>{//checking whether the turn has got one of the winning slots
                if(pno.includes(Element[0])&&(pno.includes(Element[1]))&&(pno.includes(Element[2])) )
                {
                    win = true;
                    windeck = Element;
                    return;
                }
            })
            return {win,windeck};// returning them as 1st and 2nd element 
        }
      
}

