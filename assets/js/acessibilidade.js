document.addEventListener('DOMContentLoaded', () => {
    const inputFields = document.querySelectorAll('.input-name');
    
    inputFields.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                
                // Identify which page/function to call
                if (input.id === 'amigo') {
                    adicionarAmigo();
                } else if (input.id === 'nome-pessoa') {
                    buscarParSorteado();
                }
            }
        });
    });
});