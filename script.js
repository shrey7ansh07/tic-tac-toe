const player = (name,url) =>
{
    return {name,url};
}
const playerNaruto = [];
const playerOP = [];
playerNaruto.push(player("naruto","images/naruto/naruto.jpg"));
playerNaruto.push(player("sasuke","images/naruto/sasuke.jpeg"));
playerNaruto.push(player("itachi","images/naruto/itachi.jpeg"));
playerNaruto.push(player("kakashi","images/naruto/kakashi.jpeg"));
playerOP.push(player("luffy","images/op/luffy.jpeg"));
playerOP.push(player("sanji","images/op/sanji.jpeg"));
playerOP.push(player("shanks","images/op/shanks.jpeg"));
playerOP.push(player("zoro","images/op/zoro.jpg"));
const selected = Array.from(document.querySelectorAll(".player"));
const player1name = document.querySelector(".player1");
const player2name = document.querySelector(".player2");
const play = document.querySelector('.play');
play.addEventListener("click",playgame);
selected.forEach(Element=>{
    Element.addEventListener('mouseenter',showname);
});
selected.forEach(Element=>{
    Element.addEventListener('mouseleave',removename);
});
selected.forEach(Element=>{
    Element.addEventListener('click',changename);
});
function changename(e)
{
    playerNaruto.forEach(Element=>{
        if(Element.name===e.target.classList[1])
        {
        player1name.textContent = Element.name;
        }
        });
    playerOP.forEach(Element=>{
        if(Element.name===e.target.classList[1])
        {
        player2name.textContent = Element.name;
        }
        });
}
function showname(e)
{
    let name = e.target.classList[1].toString();
    e.target.textContent = name;
}
function removename(e)
{
    e.target.textContent = "";
}
function playgame(e)
{
    if(player1name.textContent==="Player 1"||player2name.textContent==="Player 2")
    {
        return;
    }
    const player1 = playerNaruto.find(Element => Element.name === player1name.textContent);
    const player2 = playerOP.find(Element => Element.name === player2name.textContent);
    

    
    const players = {player1,player2};
    localStorage.setItem("data",JSON.stringify(players));
    window.location.href = "gameplay.html";
}








