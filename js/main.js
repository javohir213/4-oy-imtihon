const elFirstList = document.querySelector(".user-list");
const elPostList = document.querySelector(".user-post");
const elCommentList = document.querySelector(".user-comment");
const elUserTemplate = document.querySelector(".user").content;
const elPostTemplate = document.querySelector(".user-post-template").content;
const elCommentTemplate = document.querySelector(".comments").content;


function renderUser(arr, element) {
    element.innerHTML = "";
    
    const fragment = document.createDocumentFragment();
    arr.forEach(user => {
        const clonedItem = elUserTemplate.cloneNode(true);
        
        clonedItem.querySelector(".user-list__item").dataset.userId = user.id;
        clonedItem.querySelector(".user-list__id").textContent = user.id;
        clonedItem.querySelector(".user-list__title").textContent = user.username;
        clonedItem.querySelector(".user-list__name").textContent = user.name;
        clonedItem.querySelector(".user-list__email").textContent = user.email;
        clonedItem.querySelector(".user-list__email").href = "mailto:"+user.email;
        clonedItem.querySelector(".user-list__geo").href = "https://www.google.com/maps/place/" + user.address.geo.lat + "," + user.address.geo.lng;
        clonedItem.querySelector(".user-list__street").textContent = user.address.street;
        clonedItem.querySelector(".user-list__suite").textContent = user.address.suite;
        clonedItem.querySelector(".user-list__city").textContent = user.address.city;
        clonedItem.querySelector(".user-list__zipcode").textContent = user.address.zipcode;
        clonedItem.querySelector(".user-list__phone").textContent = user.phone;
        
        clonedItem.querySelector(".user-list__site").href = user.website;
        clonedItem.querySelector(".user-list__site").textContent = user.website;
        clonedItem.querySelector(".company__name").textContent = user.company.name;
        clonedItem.querySelector(".company__catch").textContent = user.company.catchPhrase;
        clonedItem.querySelector(".company__bs").textContent = user.company.bs;
        
        fragment.appendChild(clonedItem);
    });
    element.appendChild(fragment);
};

async function getUser(){
    
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    
    renderUser(data, elFirstList);
};

getUser();


function renderPost(arr, element) {
    element.innerHTML = "";
    
    const fragment = document.createDocumentFragment();
    arr.forEach(post => {
        const clonePostTemplate = elPostTemplate.cloneNode(true);
        
        clonePostTemplate.querySelector(".user-post__item").dataset.postId = post.id;
        clonePostTemplate.querySelector(".user-post__title").textContent = post.title;
        clonePostTemplate.querySelector(".user-post__text").textContent = post.body;
        
        fragment.appendChild(clonePostTemplate);
    });
    
    element.appendChild(fragment);
};

elFirstList.addEventListener("click", evt => {
    
    if(evt.target.matches(".user-list__item")){

        let userId = evt.target.dataset.userId;

        elCommentList.innerHTML = "";

        async function getPost(){
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            const data = await res.json()
            renderPost(data,elPostList);
        }
        getPost()
    }
});

function renderComments(arr,element) {
    element.innerHTML = "";
    
    const fragment = document.createDocumentFragment();
    arr.forEach( comment => {
        const cloneCommentItem = elCommentTemplate.cloneNode(true);
        
        
        cloneCommentItem.querySelector(".user-comment__item").dataset.commentId = comment.postId;
        cloneCommentItem.querySelector(".user-comment__title").textContent = comment.name;
        cloneCommentItem.querySelector(".user-comment__email").textContent = comment.email;
        cloneCommentItem.querySelector(".user-comment__email").href ="mailto:" + comment.email;
        cloneCommentItem.querySelector(".user-comment__text").textContent = comment.body;
        
        fragment.appendChild(cloneCommentItem);
    });
    element.appendChild(fragment);
};

elPostList.addEventListener("click", evt => {
    
    let postId = evt.target.dataset.postId;

    if (evt.target.matches(".user-post__item")) {
        console.log(postId);
        
        async function getComment(){
    
            const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);
            const data = await res.json();
            let newData = [];
            for(let i of data){
                if(i.postId == postId){
                    newData.push(i);
                    renderComments(newData, elCommentList);
                }
            }
        };
        getComment()
    }
});







