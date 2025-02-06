// envia o formulário de adicionar amigo ao pressionar Enter
document.addEventListener('DOMContentLoaded', () => {
    const inputAmigo = document.getElementById('amigo');
    
    inputAmigo.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            adicionarAmigo();
        }
    });
});