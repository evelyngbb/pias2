document.addEventListener('DOMContentLoaded', () => {
    // 1. Pega o formulário de busca e o input pelo ID
    const formBusca = document.getElementById('form-busca');
    const inputBusca = document.getElementById('input-busca');

    if (formBusca) {
        formBusca.addEventListener('submit', function(e) {
            // Previne o envio padrão do formulário (que recarregaria a página)
            e.preventDefault(); 

            // Pega o termo digitado e coloca em minúsculas
            const termoBusca = inputBusca.value.toLowerCase().trim(); // AQUI!
            
            if (termoBusca === '') return; // Se vazio, não faz nada

            // --- Lógica de Redirecionamento de Categoria ---
            // Verifica se o termo digitado é uma categoria válida.
            // O usuário será redirecionado se digitar algo que contenha 'fantasia', 'romance' ou 'suspense'.
            if (termoBusca.includes('fantasia')) {
                window.location.href = 'fantasia.html';
                return; 
            }
            if (termoBusca.includes('romance')) {
                window.location.href = 'romance.html';
                return;
            }
            if (termoBusca.includes('suspense')) {
                window.location.href = 'suspense.html';
                return;
            }

            // --- Lógica de Filtragem de Livros na Página Atual ---
            
            // Só executa a filtragem se o usuário NÃO foi redirecionado.
            const cardsLivro = document.querySelectorAll('book-card'); // AQUI!
            let resultadosEncontrados = false;
            
            cardsLivro.forEach(card => {
                // Pega o título do livro dentro do card (tag <h3>)
                const titulo = card.querySelector('h3').textContent.toLowerCase();
                
                // Verifica se o título do livro contém o termo de busca
                if (titulo.includes(termoBusca)) {
                    card.style.display = 'block'; // Mostra o card
                    resultadosEncontrados = true;
                } else {
                    card.style.display = 'none'; // Esconde o card
                }
            });

            // Se for executada a filtragem e não achar nada
            if (cardsLivro.length > 0 && !resultadosEncontrados) {
                alert(`Nenhum livro encontrado com o termo "${termoBusca}" nesta categoria.`);
                
                // Opcional: Mostrar todos os livros novamente após o alerta
                cardsLivro.forEach(card => card.style.display = 'block');
            }
            
            // Limpa o campo de busca
            inputBusca.value = '';

        });
    }
});