
start()

async function start(){

    const response = await getServerArticles()

    response.content.forEach(item => {
        $('.comments__content').append(generateHtmlArticle(item))
    });
}

async function getServerArticles(){

    let response = await new Promise((resolve, reject)=>{
        $.ajax({
            url: './api/comments',
            method: 'GET',
            success: (data)=>{
                resolve(data)
            },
            error: (data)=>{
                reject(data)
            }
        })
    })

    return response
}


function generateHtmlArticle(struct) {
    return `
        <article class="comments__item comment">
            <div class="comment__header">
                <h3 class="comment__author">${struct.name}</р>
            </div>
            <div class="comment__body">
                <p class="comment__email">${struct.email}</p>
                <p class="comment__text">${struct.comment}</p>
            </div>
        </article>
    `;
}
