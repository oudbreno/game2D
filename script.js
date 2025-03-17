
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
    verificarColisao() {
        if (
            this.x < obstaculo.x + obstaculo.largura &&
            this.x + personagem.largura > obstaculo.x &&
            this.y < obstaculo.y + obstaculo.altura &&
            this.y + personagem.altura > obstaculo.y
        ) {
            alert("Game Over");
            gameOver==true;
            return; // Para evitar verificações adicionais após a colisão
        }
    }
}
const personagem = new Personagem(
    100,
    canvas.height - 50,
    50,
    50,
)
console.log(personagem)


class Obstaculo extends Entidade{
    constructor(x,y,largura,altura,velocidadeX){
        super(x,y,largura,altura)
        this.velocidadeX = velocidadeX
    }
    atualizarObstaculo() {
        this.x -= this.velocidadeX;
        
        if (this.x <= 0 -this.largura) {
            this.x = canvas.width;
            this.velocidadeX = Math.min(obstaculo.velocidadeX + 1, 10);
    
            let nova_altura = Math.random() * 20 + 10;
            this.altura = nova_altura;
            this.y = canvas.height - nova_altura;
        }
    }
}


const obstaculo = new Obstaculo (
    canvas.width,
    canvas.height - 50,
    50,
    100,
    3
);


function loop() {
    if (gameOver == false) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        personagem.desenhar('black')
        personagem.atualizarPersonagem(); // Atualiza a posição do personagem
        personagem.desenhar('black'); // Desenha o personagem atualizado
        obstaculo.desenhar();
        obstaculo.atualizarObstaculo();
        obstaculo.desenhar();

        personagem.verificarColisao();
        
        requestAnimationFrame(loop);
        
    }
}
loop()

function reiniciarJogo() {
    gameOver = false; 
    personagem.x = 50;
    personagem.y = canvas.height - personagem.altura; 
    obstaculo.x = canvas.width; 
    obstaculo.velocidadeX = 3; 
    
    loop()
}