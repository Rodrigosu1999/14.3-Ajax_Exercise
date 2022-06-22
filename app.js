const $form = $("#form").get(0);
const $ul = $("ul");
const $delButton = $("#removeimgs").get(0);
const apiKey = "Z52KsmsMQqYR6CyAywu8VnM116SOv52k";

//This function gets the value from a random index of the API's array
async function getGif(input) {
    const res = await axios.get("http://api.giphy.com/v1/gifs/search", {params:{api_key: apiKey,q: input}});
    const gifArr = res.data.data;
    const randomIndex = Math.floor(Math.random() * gifArr.length)
    const finGif = gifArr[randomIndex];
    return finGif;
}


$form.addEventListener("submit", async function (event) {
    event.preventDefault();
    //The event listener runs the getGif function and  gets a valid url for an image to be created inside of an li
    //If the "gif" value is undefine the alert will be triggered, otherwise it means that the url is valid and the image will be appended by running the function "addGif"
    try{
        const gif = await getGif($("input").val());
        const newGif = `<li><img class="gifs" src="${gif.images.original.url}"></li>`
         addGif(newGif);
    } catch(e){
        alert("Keyword was not found")
    }
})

//This function appends the li to the ul
function addGif(gif) {
    $ul.append(gif);
}

//This functions deletes all images inside the ul
$delButton.addEventListener("click", async function (event) {
    event.preventDefault();
    $ul.empty();
})