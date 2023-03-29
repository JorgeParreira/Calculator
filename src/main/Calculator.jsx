import React, {Component} from "react";
import './Calculator.css'
import '../components/Button'
import Button from "../components/Button";
import Display from "../components/Display";

const inicialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...inicialState }

    constructor(props){
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory(){
        this.setState({ ...inicialState })
    }

    setOperation(operation){
        //Se estiver a usar o primeiro indíce do array values[0, 1], 
        // ao cliar numa operação, vou mudar o current para o segundo indíce do array. Então vou setar o 
        // o operation para de null para o que clicar, o current para 1 (2ª posição do array) 
        // e o clearDisplay para true, para limpar o display
        if(this.state.current === 0){
            this.setState({ operation, current: 1, clearDisplay: true })
        //Só cai neste else se já tiver uma operação declarada
        }else{
            //Verificar se já foi clicado no igual ou não
            const equals = operation === '='
            //Como já tem uma operação, aqui declaramos que esta é a operação atual
            const currentOperation = this.state.operation
            //A gerar um clone de values
            const values = [...this.state.values]
            try{
                //Calcular o valor com a função eval() e guardar o resultado no primeiro indíce do array
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
                if(isNaN(values[0]) || !isFinite(values[0])){
                    this.clearMemory()
                    return
                }
            } catch(e) {
                values[0] = this.state.values[0]
            }
            //Sempre que uma operação for executada, o valor vai ser armazenado no indíce 
                //0 e o indíce 1 vai voltar a 0
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
        
        
    }

    addDigit(n){
        if(n === '.' && this.state.displayValue.includes('.')){
            return
        }
        //precisa limpar o display? Só o vai fazer se a variável for 0 ou a flag do state estiver marcada como true
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        //Se precisar limpar o display, o currentValue passa a vazio, se não, passa a ser o valor que de facto está no display
        const currentValue = clearDisplay ? '' : this.state.displayValue
        //O displayValue vai ser ele próprio mais o valor digitado. Por outras palavras, vai concatenar
        const displayValue = currentValue + n
        //faz set do estado do display com o displayValue e mete o clearDisplay a false
        this.setState({ displayValue, clearDisplay: false })

        if(n != '.') {
            //apanhei o indíce do valor atual que eu estou a alterar
            const i = this.state.current
            //converti para float (antes estava com String)
            const newValue = parseFloat(displayValue)
            //criei um novo array [0,1] e estou a povoá-lo 
            const values = [...this.state.values]
            //altero o valor atual com o indíce
            values[i] = newValue
            //e faço set do values do objeto state
            //preenche o primeiro indicie do array
            this.setState({ values })
            console.log(values)
        }
    }

    render(){

        return(
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
                
               
            </div>
        )
    }
}
