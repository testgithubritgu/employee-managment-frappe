import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const Calculator = () => {
    const [value, setValue] = useState<string>("")
    const onchange = (e:string) =>{
        console.log(e)
        setValue(prev => prev+e)
    }

  return (
    <>
          <Card className='max-w-sm mx-auto w-full'>
              <CardHeader className='text-center'>
                  <CardTitle className='text-lg font-bold'>Calculator</CardTitle>
                  <CardDescription>Calculate your expences
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <Input type='text' value={value} placeholder='Enter Amount' className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'/>
                  <div className='calci-btn grid grid-cols-4 gap-3 mt-10 '>
                      <button onClick={(e: any) => onchange(e.target.innerHTML)}>1</button>
                      <button onClick={(e: any) => onchange(e.target.innerHTML)} >2</button>
                      <button onClick={(e: any) => onchange(e.target.innerHTML)}>3</button>
                      <button onClick={(e: any) => onchange(e.target.innerHTML)}>-</button>
                      <button onClick={(e: any) => onchange(e.target.innerHTML)}>4</button>
                      <button onClick={(e: any) => onchange(e.target.innerHTML)}>5</button>
                      <button onClick={(e: any) => onchange(e.target.innerHTML)}>6</button>
                      <button onClick={(e: any) => onchange(e.target.innerHTML)}>+</button>
                      <button onClick={(e: any) => onchange(e.target.innerHTML)}>7</button>
                      <button onClick={(e: any) => onchange(e.target.innerHTML)}>8</button>
                      <button onClick={(e: any) => onchange(e.target.innerHTML)}>9</button>
                      <button onClick={(e: any) => onchange(e.target.innerHTML)}>*</button>
                      <button onClick={(e: any) => onchange(e.target.innerHTML)}>.</button>
                      <button onClick={(e: any) => onchange(e.target.innerHTML)}>0</button>
                      <button onClick={(e: any) => onchange(e.target.innerHTML)}>_</button>
                      <button onClick={(e: any) => onchange(e.target.innerHTML)}>%</button>
                      <button className='col-span-4' onClick={()=>setValue(eval(value))}>=</button>
                  </div>
              </CardContent>
              <CardFooter>
                  <p>calculate your data</p>
              </CardFooter>
          </Card>
    </>
  )
}

export default Calculator
