
const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
let gameOver = false;
document.addEventListener('keypress', (e) => {
    if (e.code == 'Space' && personagem.pulando == false) {
        personagem.saltar()
    }
});


class Entidade {
    #gravidade
    constructor(x,y,largura,altura){
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.#gravidade = 0.5
    }
    get gravidade(){
        return this.#gravidade
    }
    desenhar = function(cor){
        ctx.fillStyle = cor;
        ctx.fillRect(this.x,this.y,this.largura,this.altura);
    }
}


class Personagem extends Entidade{
    #pulando
    #velocidadeY
    constructor(x,y,largura,altura){
        super(x,y,largura,altura)
        this.#pulando = false
        this.#velocidadeY = 0
    }
    saltar = function(){
        this.#velocidadeY = 15;
        this.#pulando = true;
    }
    get pulando(){
        return this.#pulando
    }
    atualizarPersonagem(){
        if (this.#pulando == true) {
            this.#velocidadeY -= this.gravidade; // Diminui a velocidade cada ciclo
            this.y -= this.#velocidadeY; // Muda a posição Y
    
            // Implementando conceito chão
            if (this.y >= canvas.height - 50) {
                this.#velocidadeY = 0;
                this.#pulando = false;
                this.y = canvas.height - 50; // Ajuste fino na posição
            }
        }
    }
}


class Obstaculo extends Entidade{
    constructor(x,y,largura,altura,velocidadeX){
        super(x,y,largura,altura)
        this.velocidadeX = velocidadeX
    }
}


const personagem = new Personagem(
    100,
    canvas.height - 50,
    50,
    50,
    
)
console.log(personagem)

function loop() {
    if (gameOver == false) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        personagem.desenhar('black')
        personagem.atualizarPersonagem(); // Atualiza a posição do personagem
        personagem.desenhar('black'); // Desenha o personagem atualizado
        requestAnimationFrame(loop);
        
    }
}
loop()