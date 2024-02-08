import {useState} from 'react'
import Label from "./components/Label"
import Button from "./components/Button"
import Input from "./components/Input"
import ReferenceTable from "./components/ReferenceTable"
import { IMCResult, calculateIMC } from "./lib/IMC"
import ResultsTable from './components/ResultsTable'

function App() {
  
  const [IMCData, setIMCData] = useState<null | {
    weight: number
    height: number
    IMC: number
    IMCResult: string
  }>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()//evita que o formulario faça um reload no página

    /*Pegar os dados do formulário*/
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData) as {weight: string, height: string}

    /*Lidando com os campos vazios*/
    const {weight, height} = data
    if(!weight || !height) {
      alert('Necessário preencher todos os campos.')
      return
    }

    /*Fazer o parse e o handle nas strings para numbers*/
    const weightNumber = parseFloat(weight.replace(',', '.'))
    const heightNumber = parseFloat(height.replace(',', '.')) /100

    if (isNaN(weightNumber) || isNaN(heightNumber)) {
      alert('Preencha os campos com números válidos.')
      return
    }

    /*Lidar com números inválidos*/
    if (weightNumber < 2 || weightNumber > 600) {
      alert('O peso precisa estar entre 2 e 600 kg')
    }

    if (heightNumber < 0.5 || heightNumber > 2.5) {
      alert('A altura precisa estar entre 50cm e 2,5mt')
    }

    /*Calcular IMC*/
    const IMC = calculateIMC(weightNumber, heightNumber)
    const IMCResultString = IMCResult(IMC)

    /*Mostrar resultado*/
    setIMCData({
      weight: weightNumber,
      height: heightNumber,
      IMC: IMC,
      IMCResult: IMCResultString

    })

    /*Limpar o formulário*/
    e.currentTarget.reset()//limpa o formulario
  }

  function handleClickReset (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setIMCData(null)
  }

  return (
    <main className="bg-white max-w-4xl mx-auto md:py-24 md:px-48 py-10 px-5">
      <section id="form">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="weight">Peso (kg)</Label>
            <Input disabled={!!IMCData} name="weight" className="mt-1" type="text" id="weight"/>
          </div>
          <div className="mt-4">
            <Label htmlFor="height">Altura (cm)</Label>
            <Input disabled={!!IMCData} name="height" className="mt-1" type="text" id="height"/>
          </div>
          {IMCData ? (
            <Button onClick={handleClickReset} type="button">Refazer</Button>
          ) : (
            <Button type="submit">Calcular</Button>
          )}          
        </form>
      </section>
      <section id="result" className="py-10 px-4 h-40">
        {IMCData ? (
          <ResultsTable IMCData={IMCData} />
        ) : (
          <p className="text-center text-neutral-400 text-xl">Saiba agora se está em seu peso ideal!</p>
        )}
      </section>
      <section id="reference-table">
        <ReferenceTable />
      </section>
    </main>
  )
}

export default App
