import valores from "./valores"
import formaDePagamento from "./formaDePagamento"

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        if (itens.length === 0)//se atributo "itens" nao possuir nada, ja retorna a mensagem de carrinho vazio
            return "Não há itens no carrinho de compra!"

        let total = 0 // variavel para calcular o total da compra
        let lista_comprados = [] //lista criada para verificar se chantily e queijo nao estao acompanhados dos itens principais

        for (let i of itens) {

            let [item, qtd] = i.split(",")//descontroi a string em dois valores[antesDaVirgula,DepoisDaVirgula]

            if (qtd == 0)
                return "Quantidade inválida!"

            if (valores[item])
                total += parseFloat(valores[item]) * parseInt(qtd);
            else
                return "Item inválido!"

            lista_comprados.push(item)
        }

        const produtosInseparaveis = [["cafe", "chantily"], ["sanduiche", "queijo"]]
        for (let prod of produtosInseparaveis) {//verificar se na lista de itens comprados existem extras sem o acompanhamento
            if (!lista_comprados.includes(prod[0]) && lista_comprados.includes(prod[1])) {
                return "Item extra não pode ser pedido sem o principal"
            }
        }

        if (formaDePagamento[metodoDePagamento])
            total *= formaDePagamento[metodoDePagamento]
        else
            return "Forma de pagamento inválida!"

        let text = `R$ ${total.toFixed(2)}`
        return text.replace(".", ",")
    }

}

export { CaixaDaLanchonete }
