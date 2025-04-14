const key = "52c7df3d27a3144e7a6094443e4404e6"; // Substitua por uma variável de ambiente em produção

function colocarDadosNaTela(dados) {
    console.log(dados);
    document.querySelector(".clima-cidade").innerHTML = "Clima em " + dados.name;
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
    document.querySelector(".prev").innerHTML = dados.weather[0].description;
    document.querySelector(".umi").innerHTML = dados.main.humidity + "% umidade";
    document.querySelector(".icone-nuvem").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}

async function buscarCidade(cidade) {
    try {
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`);
        
        if (!resposta.ok) {
            throw new Error("Cidade não encontrada");
        }

        const dados = await resposta.json();
        colocarDadosNaTela(dados);

        // Chamar função para alterar o background
        alterarBackground(cidade);
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
        alert("Erro: Não foi possível encontrar a cidade. Verifique o nome e tente novamente.");
    }
}

async function alterarBackground(cidade) {
    try {
        const resposta = await fetch(`https://api.unsplash.com/search/photos?query=${cidade}&client_id=2WkRYzund5k95RNAG61Hpsk7yGaWadmpFBEDEjPmeUM`);
        
        if (!resposta.ok) {
            throw new Error("Imagem não encontrada");
        }

        const dados = await resposta.json();
        const imagemUrl = dados.results[0]?.urls?.regular;

        if (imagemUrl) {
            document.body.style.backgroundImage = `url(${imagemUrl})`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
        } else {
            console.warn("Nenhuma imagem encontrada para a cidade.");
        }
    } catch (erro) {
        console.error("Erro ao buscar imagem:", erro);
    }
}

function cliqueiNoBotao() {
    const inputCidade = document.querySelector(".input-cidade");
    const cidade = document.querySelector(".input-cidade").value.trim();

    if (cidade === "") {
        alert("Por favor, insira o nome de uma cidade.");
        return;
    }

    buscarCidade(cidade);
    inputCidade.value = ""; // Limpa o campo de entrada após a busca

}
