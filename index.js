var novoArrayTratadoSemSpace = novoArrayTratado.map(x => x.split(" "));

// pega a maior linha contando a quantidade de string

var max = novoArrayTratado[0].length;
for (let i = 0; i < novoArrayTratado.length; i++) {
    if (novoArrayTratado[i].length >= max && novoArrayTratado[i] != 'as habilidades e o conhecimento apresentados no capítulo e de ajudá-lo a se preparar para o teste final. Você terá várias chances e a nota não') {
        max = novoArrayTratado[i].length;
        indexOfMax = novoArrayTratado[i];
    }
    console.log(max, indexOfMax);
}

for (let i = 0; i < novoArrayTratado.length; i++) {
    if (novoArrayTratadoSemSpace[i] == "Resposta corretaResposta correta") {
        console.log("achou for de fora", i, x);
    }

    for (let x = 0; x < novoArrayTratado[i].length; x++) {
        if (novoArrayTratado[i][x] == "ptsPergunta") {
            console.log((String("=").repeat(max)));
            console.log((String(" ").repeat((max / 2) - (novoArrayTratado[i].length / 2))) + "[ " + novoArrayTratado[i] + " ]");
            console.log("");
            var flag = "pamonha";
            cont = 1;
            while (!novoArrayTratado[i + cont][0] == "") {
		console.log(novoArrayTratado[i + cont][0]);
                if(cont == 1){
			console.log(novoArrayTratado[i][x + 1] + "-) " + novoArrayTratado[i + cont]);
		}else {
			console.log(novoArrayTratado[i + cont]);
		}
                cont++;
            }
            console.log("");
            break;
            
        } else if (novoArrayTratado[i][x] == "" && !novoArrayTratado[i].find(r => r == "Correto!Correto!") && !novoArrayTratado[i].find(r => r == "Refer")) {
            console.log("[ ]" + novoArrayTratado[i]);
            break;
        } else if (novoArrayTratado[i][x] != "" && novoArrayTratado[i][x] == "Correto!Correto!") {
	    var respCorreta = "%c[X]" + novoArrayTratado[i].replace("Correto!Correto!", " ✓ Correto");
            console.log(respCorreta, "background: #FFF; color: #289b10");
            break;
        } else if (novoArrayTratado[i][x] == "Resposta corretaResposta correta") {
            console.log("achou for de dentro", i, x);
            break;
        } else if (novoArrayTratado[i][0] == "Refer") {
            console.log("");
            console.log((String(" ").repeat((max / 2) - (novoArrayTratado[i].length / 2))) + "%c- " +  novoArrayTratado[i], "background: #FFF; color: #f57c0b");
            break;
        }
    }
}
