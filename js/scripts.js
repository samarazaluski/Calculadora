const previonsOperationsText = document .querySelector("#previons-operations");
const currentOperationText = document .querySelector("#current-operation");
const buttons = document .querySelectorAll("#buttons-container button");

class calculadora{
    constructor(previonsOperationsText, currentOperationText){
        this.previonsOperationsText = previonsOperationsText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    addDigit(digit){

        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }

        this.currentOperation=digit
        this.updateScreen ()
    }
    
    processOperation(operation){

        if(this.currentOperationText.innerText===""&& operation !== "C"){
            if(this.previonsOperationsText!==""){
                this.changeOperation(operation);

            }
            return;
        }




        
        let operationValue
        const previons = +this.previonsOperationsText.innerText.split(" ")[0];
        const current =  +this.currentOperationText.innerText;


        switch(operation){
            case"+":
             operationValue = previons + current
             this.updateScreen(operationValue, operation, current,previons);
            break;
            case"-":
            operationValue = previons + current
            this.updateScreen(operationValue, operation, current,previons);
           break;
           case"/":
           operationValue = previons + current
           this.updateScreen(operationValue, operation, current,previons);
          break;
          case"*":
          operationValue = previons + current
          this.updateScreen(operationValue, operation, current,previons);
         break;
         case"DEL":
          this.processDelOperator();
         break;
         case"CE":
         this.processClearCurrentOperation();
        break;
        break;
         case"C":
         this.processALLOperation();
        break;
        case"=":
        this.processeEqualOperator();
       break;
            default:
                return;
        }
    }


updateScreen(
    operationValue = null, 
    operation = null, 
    current= null,
     previons=null,
     )   
    {
    
    console.log(operationValue,operation,current,previons);

    if(operationValue === null){
        this.currentOperationText.innerText += this.currentOperation;
    } else{
        if(previons=== 0){
            operationValue = current
        }

        this.previonsOperationsText.innerText = ` ${ operationValue }  ${ operation } `;
        this.currentOperationText.innerText = "";
    }
}

changeOperation(operation){
    const mathOperation  = ["*","/","-","+"]

    if(!mathOperation.includes(operation)){
        return
    }

    this.previonsOperationsText.innerText = this.previonsOperationsText.innerText.slice(0, -1) +operation;
}
//deletar o digito
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);

    }

    //deletar todos número de baixo

    processClearCurrentOperation(){
        this.currentOperationText.innerText = "";
    }

    //deletar tudo

    processALLOperation(){
        this.currentOperationText.innerText="";
        this.previonsOperationsText.innerText="";
    }

    processeEqualOperator(){
        const operation = previonsOperationsText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}


const calc = new calculadora(previonsOperationsText, currentOperationText);



buttons.forEach((btn)=>{
    btn.addEventListener("click", (e) =>{
        const value = e.target.innerText;

        console.log(value);

        if(+value>=0 || value ==="."){
            calc.addDigit(value);
        
        } else{
            calc.processOperation(value);
        }
    })
})