let searchContainer = document.getElementById("resultContainer");
let searchElement = document.getElementById("searchEl");
let spinner = document.getElementById("spinner");
let options={
    method:"GET"
};
let url="https://apis.ccbp.in/wiki-search?search=";
function createAndAppend(response)
{
    let {title,link,description} = response;
    //RESULT CONTAINER
    let result_contain = document.createElement("div");
    result_contain.setAttribute("class","result")
    //TITLE ELEMENT
    let titleElement = document.createElement("a");
    titleElement.href = link;
    titleElement.textContent = title.toUpperCase();
    titleElement.target = "_blank";
    titleElement.setAttribute("class","title");
    result_contain.appendChild(titleElement);
    //LINK ELEMENT
    let linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.textContent = link;
    linkElement.target = "_blank";
    linkElement.setAttribute("class","link");
    result_contain.appendChild(linkElement);
    //DESCRIPTION ELEMENT
    let descriptionElement= document.createElement("p");
    descriptionElement.textContent = description;
    descriptionElement.setAttribute("class","description");
    result_contain.appendChild(descriptionElement);
    searchContainer.appendChild(result_contain);

}
function fetchData(event)
{
    if(event.key === "Enter")
    {
        spinner.classList.toggle("d-none");
        searchContainer.textContent = "";
        let searchValue = searchElement.value;
        let url="https://apis.ccbp.in/wiki-search?search=" + searchValue;
        fetch(url,options)
        .then(function(response)
        {
            return response.json();
        })
        .then(function(responseData)
        {
            spinner.classList.toggle("d-none");
            let { search_results } = responseData;
            for(let s of search_results)
            {
                createAndAppend(s);
            }
        });
    }
}
searchElement.addEventListener('keydown',fetchData);