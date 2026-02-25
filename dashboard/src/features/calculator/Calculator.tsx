import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useCallback, useRef, useState } from 'react'

const buttons = [
    "1", "2", "3", "-",
    "4", "5", "6", "+",
    "7", "8", "9", "*",
    ".", "0", "C", "%",
]

const Calculator = () => {
    const [value, setValue] = useState<string>("")
    const prevValue = useRef<string>("")
    const handleClick = useCallback((btn: string) => {
        if (value === "Error") {
            setValue(btn === "C" ? "" : btn)
            return
        }
        if (btn === "C") {
            setValue("")
            return
        }
        setValue(prev => prev + btn)
    }, [value])

    const calculate = () => {
        if (!value) return

        if (/[+\-*/.%]$/.test(value)) {
            setValue("Error")
            return
        }
        try {
            prevValue.current = (value)
            const result: number = Function(`return ${value}`)()
            setValue(result.toString())
        } catch (error) {
            setValue("Error")
        }
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
                    <Input aria-label="Calculator display" type='text' readOnly value={value} placeholder='Enter Amount' className='text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' />
                    <div className="grid grid-cols-4 gap-3 mt-6">
                        {buttons.map((btn) => (
                            <button
                                type="button"
                                aria-label={`Input ${btn}`}
                                key={btn}
                                onClick={() => handleClick(btn)}
                                className="border cursor-pointer rounded py-2 hover:bg-muted"
                            >
                                {btn}
                            </button>
                        ))}

                        <button
                            type="button"
                            onClick={calculate}
                            className="col-span-4 bg-black text-white rounded py-2"
                        >
                            =
                        </button>
                    </div>
                    <button
                        type="button" onClick={()=>setValue((prevValue.current) ?? "")}>
                        see the previouse value
                    </button>
                </CardContent>
                <CardFooter>
                    <p>calculate your data</p>

                </CardFooter>
            </Card>
        </>
    )
}

export default Calculator
