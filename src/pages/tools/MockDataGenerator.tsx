import { useState, useMemo } from 'react'
import { Braces, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function MockDataGenerator() {
  const [type, setType] = useState<'name' | 'email' | 'phone' | 'address' | 'sentence' | 'json'>('name')
  const [count, setCount] = useState(5)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const firstNames = ['James','Mary','Robert','Patricia','John','Jennifer','Michael','Linda','David','Elizabeth','William','Barbara','Richard','Susan','Joseph','Jessica','Thomas','Sarah','Christopher','Karen','Charles','Lisa','Daniel','Nancy','Matthew','Betty','Anthony','Margaret','Mark','Sandra']
  const lastNames = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez','Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin']
  const domains = ['gmail.com','yahoo.com','outlook.com','example.com','test.com']
  const streets = ['Main St','Oak Ave','Pine Rd','Maple Dr','Cedar Ln','Elm St','First Ave','Second St','Park Blvd','Lake Dr']
  const cities = ['New York','Los Angeles','Chicago','Houston','Phoenix','Philadelphia','San Antonio','San Diego','Dallas','Austin']

  const rand = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]
  const randNum = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

  const generate = useMemo(() => {
    const items: string[] = []
    for (let i = 0; i < count; i++) {
      const first = rand(firstNames), last = rand(lastNames)
      switch (type) {
        case 'name': items.push(`${first} ${last}`); break
        case 'email': items.push(`${first.toLowerCase()}.${last.toLowerCase()}@${rand(domains)}`); break
        case 'phone': items.push(`(${randNum(200,999)}) ${randNum(200,999)}-${randNum(1000,9999)}`); break
        case 'address': items.push(`${randNum(1,9999)} ${rand(streets)}, ${rand(cities)}`); break
        case 'sentence': items.push(`The quick brown fox jumps over the lazy dog. This is sample number ${i + 1}.`); break
        case 'json': break
      }
    }
    if (type === 'json') {
      const objs = Array.from({ length: count }, (_, i) => ({ id: i + 1, name: `${rand(firstNames)} ${rand(lastNames)}`, email: `${rand(firstNames).toLowerCase()}@${rand(domains)}`, age: randNum(18, 65) }))
      return JSON.stringify(objs, null, 2)
    }
    return items.join('\n')
  }, [type, count])

  const copy = () => { navigator.clipboard.writeText(generate); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <ToolLayout title="Mock Data Generator" description="Generate fake names, emails, addresses, and JSON data." icon={Braces}>
      <div className="flex flex-wrap gap-3 mb-4">
        <select value={type} onChange={e => setType(e.target.value as typeof type)} className="p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 outline-none text-gray-900 dark:text-white">
          <option value="name">Names</option><option value="email">Emails</option><option value="phone">Phones</option><option value="address">Addresses</option><option value="sentence">Sentences</option><option value="json">JSON Objects</option>
        </select>
        <input type="number" value={count} onChange={e => setCount(Math.max(1, Math.min(100, Number(e.target.value))))} min={1} max={100} className="w-20 p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-center focus:ring-2 focus:ring-violet-500 outline-none text-gray-900 dark:text-white" />
        <span className="self-center text-sm text-gray-500 dark:text-gray-400">items</span>
      </div>
      <div className="relative">
        <pre className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-mono overflow-auto max-h-96 text-gray-900 dark:text-white whitespace-pre-wrap">{generate}</pre>
        <button onClick={copy} className="absolute top-3 right-3 p-2 text-gray-400 hover:text-violet-600">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}</button>
      </div>
    </ToolLayout>
  )
}
