import { useState } from 'react'
import { Fingerprint, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

async function hashMessage(message: string, algorithm: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(message)
  const hashBuffer = await crypto.subtle.digest(algorithm, data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function HashGenerator() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState('')
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    if (!input) return
    setLoading(true)
    const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']
    const results: Record<string, string> = {}
    for (const algo of algorithms) {
      results[algo] = await hashMessage(input, algo)
    }
    setHashes(results)
    setLoading(false)
  }

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <ToolLayout title="Hash Generator" description="Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from any text." icon={Fingerprint} info="Compute SHA-1, SHA-256, SHA-384, and SHA-512 cryptographic hashes instantly using the browser's Web Crypto API. Perfect for verifying file integrity after downloads, comparing data fingerprints, understanding how password hashing works, or experimenting with the same algorithms that secure Bitcoin transactions and digital signatures.">

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-mono resize-y focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <button onClick={generate} disabled={!input || loading} className="mt-4 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50">
          {loading ? 'Generating...' : 'Generate Hashes'}
        </button>

        {Object.keys(hashes).length > 0 && (
          <div className="mt-6 space-y-3">
            {Object.entries(hashes).map(([algo, hash]) => (
              <div key={algo} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-20 text-xs font-medium text-gray-500 dark:text-gray-400 flex-shrink-0">{algo}</div>
                <div className="flex-1 font-mono text-xs break-all text-gray-800 dark:text-gray-200">{hash}</div>
                <button onClick={() => handleCopy(hash, algo)} className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex-shrink-0">
                  {copied === algo ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Hashing Works and Why It Matters</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          A cryptographic hash function takes any input—whether a single word or an entire file—and produces a fixed-length string that acts as a unique fingerprint. SHA-256 always outputs exactly 64 hexadecimal characters regardless of input size. Even a one-bit change to the input produces a completely different hash, which is why hashing is the foundation of file integrity verification. When you download software, the publisher often provides a SHA-256 checksum: compute the hash of your downloaded file and compare it to the published value. If they match, the file was not corrupted or tampered with in transit.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          Password storage relies on hashing, but plain SHA-256 is not enough. Modern systems add a unique random salt to each password before hashing and repeat the process thousands of times using purpose-built algorithms like bcrypt, scrypt, or Argon2. This tool lets you see raw SHA output to understand the concept, but never store passwords using un salted SHA hashes in production—rainbow table attacks can reverse them in seconds.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          SHA-256 is also the hashing algorithm used in Bitcoin's proof-of-work mining process and in constructing Merkle trees that verify transaction integrity across the blockchain. It is one of the most widely deployed cryptographic primitives in existence.
        </p>
      </section>
    </ToolLayout>
  )
}
