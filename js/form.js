
$('.form__submit').click(async ()=>{

    let data = {
        name: $('#name').val(),
        email: $('#email').val(),
        comment: $('#comment').val()
    }

    let validation_errors = false 

    if (data.name.trim() == '') {
        validation_errors = true
        createMessage('Поле Имя - пустое')
    }

    if (!/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i.test(data.email)) {
        validation_errors = true
        createMessage('Поле Email не почта!')
    }

    if (data.comment.trim() == '') {
        validation_errors = true
        createMessage('Оставте отзыв!')
    }

    if (!validation_errors) {
        let response = await createArticle(data)
        $('.comments__content').prepend(generateHtmlArticle(response.content))
        $('#name').val('')
        $('#email').val('')
        $('#comment').val('')
        createMessage('Комментарий оставлен', false)
    }

})

async function createArticle(data){

    let response = await new Promise((resolve, reject)=>{
        $.ajax({
            url: './api/comments',
            method: 'POST',
            data: data,
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