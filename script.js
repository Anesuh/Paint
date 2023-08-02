//Funções

//Desenha
const draw = (x, y) => {
    ctx.globalCompositeOperation = 'source-over'
    ctx.beginPath()
    ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize/2, 0, 2*Math.PI)
    ctx.fill()
}
//Apaga
const erase = (x, y) => {
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize/2, 0, 2*Math.PI)
    ctx.fill()
}

//Seleciona a ferramenta
const selectTool = ({target}) =>{
    const selectedTool = target.closest('button') //Seleciona o botão
    const action = selectedTool.getAttribute('data-action') //Recupera o atributo data-action (rubber ou brush)

    if (action){

        activeTool = action
        tools.forEach(tool => {
            tool.classList.remove('active') //Remove a classe active de todas as ferramentas
        });
        selectedTool.classList.add('active') //Adiciona a classe active a ferramenta clicada
    
    }
}

const changeSize = ({ target }) =>{
    const selectedSize = target.closest('button') //Seleciona o botão
    const size = selectedSize.getAttribute('data-size') //Recupera o atributo data-action (rubber ou brush)
    sizeButtons.forEach(button => {
        button.classList.remove('active')
    });
    selectedSize.classList.add('active')
    brushSize = size
}

//Elementos (DOM)
const inputColor = document.querySelector('.input_color')
const tools = document.querySelectorAll('.button_tool')
const sizeButtons = document.querySelectorAll('.button_size')
const buttonClear = document.querySelector('.button_clear')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

//Variaveis
let isPanting
let activeTool = 'brush'
let brushSize = 50
ctx.fillStyle = '#000'


//Canvas eventListners
canvas.addEventListener('mousedown', ({clientX, clientY}) => {
    isPanting = true
    if (activeTool == 'brush'){
        draw(clientX, clientY)
    }

    else if(activeTool == 'rubber'){
        console.log('erased!')
        erase(clientX, clientY)
    }
})

canvas.addEventListener('mouseup', ({clientX, clientY}) => {
    isPanting = false
})

canvas.addEventListener('mousemove', ({clientX, clientY}) => {
    if(isPanting){

        if(activeTool == 'brush'){
            draw(clientX, clientY)
        }

        else if(activeTool == 'rubber'){
            erase(clientX, clientY)
        }
    }
})

//Alterando a cor
inputColor.addEventListener('change', ({target}) => {
    ctx.fillStyle = target.value
})

//Mudando as ferramentas
tools.forEach(tool => {
    tool.addEventListener("click", selectTool)
});

sizeButtons.forEach(button => {
    button.addEventListener('click', changeSize)
});