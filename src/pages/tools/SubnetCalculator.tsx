import { useState } from 'react'
import { Network, Search, AlertTriangle } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

interface SubnetInfo {
  networkAddress: string
  broadcastAddress: string
  subnetMask: string
  prefixLength: number
  hostRange: string
  totalHosts: number
  usableHosts: number
  ipClass: string
  isPrivate: boolean
}

function ipToInt(ip: string): number {
  const parts = ip.split('.').map(Number)
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0
}

function intToIp(int: number): string {
  return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join('.')
}

function getIpClass(ip: string): string {
  const first = parseInt(ip.split('.')[0])
  if (first >= 1 && first <= 126) return 'A'
  if (first >= 128 && first <= 191) return 'B'
  if (first >= 192 && first <= 223) return 'C'
  if (first >= 224 && first <= 239) return 'D (Multicast)'
  return 'E (Reserved)'
}

function isPrivateIp(ip: string): boolean {
  const parts = ip.split('.').map(Number)
  if (parts[0] === 10) return true
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true
  if (parts[0] === 192 && parts[1] === 168) return true
  return false
}

function calculateSubnet(cidr: string): SubnetInfo | null {
  const match = cidr.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\/(\d{1,2})$/)
  if (!match) return null

  const ip = match[1]
  const prefix = parseInt(match[2])
  const parts = ip.split('.').map(Number)

  if (parts.some(p => p < 0 || p > 255) || prefix < 0 || prefix > 32) return null

  const ipInt = ipToInt(ip)
  const maskInt = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0
  const networkInt = (ipInt & maskInt) >>> 0
  const broadcastInt = (networkInt | ~maskInt) >>> 0

  const totalHosts = prefix === 32 ? 1 : Math.pow(2, 32 - prefix)
  const usableHosts = prefix >= 31 ? (prefix === 32 ? 1 : 0) : totalHosts - 2

  return {
    networkAddress: intToIp(networkInt),
    broadcastAddress: intToIp(broadcastInt),
    subnetMask: intToIp(maskInt),
    prefixLength: prefix,
    hostRange: prefix >= 31
      ? (prefix === 32 ? intToIp(networkInt) : 'No usable hosts')
      : `${intToIp(networkInt + 1)} — ${intToIp(broadcastInt - 1)}`,
    totalHosts,
    usableHosts,
    ipClass: getIpClass(ip),
    isPrivate: isPrivateIp(ip),
  }
}

export default function SubnetCalculator() {
  const [cidr, setCidr] = useState('')
  const [result, setResult] = useState<SubnetInfo | null>(null)
  const [error, setError] = useState('')

  const calculate = () => {
    setError('')
    const trimmed = cidr.trim()
    if (!trimmed) return

    const info = calculateSubnet(trimmed)
    if (!info) {
      setError('Invalid CIDR notation. Use format: 192.168.1.0/24')
      setResult(null)
      return
    }
    setResult(info)
  }

  const fields = result ? [
    { label: 'Network Address', value: result.networkAddress },
    { label: 'Broadcast Address', value: result.broadcastAddress },
    { label: 'Subnet Mask', value: result.subnetMask },
    { label: 'Prefix Length', value: `/${result.prefixLength}` },
    { label: 'Usable Host Range', value: result.hostRange },
    { label: 'Total Hosts', value: result.totalHosts.toLocaleString() },
    { label: 'Usable Hosts', value: result.usableHosts.toLocaleString() },
    { label: 'IP Class', value: result.ipClass },
    { label: 'Private Range', value: result.isPrivate ? 'Yes' : 'No' },
  ] : []

  return (
    <ToolLayout title="Subnet Calculator" description="Calculate subnet information from CIDR notation." icon={Network}>
      <div className="space-y-6">
        <div className="flex gap-3">
          <input
            value={cidr}
            onChange={(e) => setCidr(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && calculate()}
            placeholder="Enter CIDR (e.g. 192.168.1.0/24)"
            className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-mono focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
          />
          <button
            onClick={calculate}
            disabled={!cidr.trim()}
            className="bg-violet-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-violet-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Search className="w-4 h-4" />
            Calculate
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl text-sm border border-red-200 dark:border-red-800/50">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {result && (
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-100 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">Subnet Results for {cidr.trim()}</span>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {fields.map((field) => (
                <div key={field.label} className="px-4 py-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{field.label}</span>
                  <span className="text-sm font-mono font-medium text-gray-900 dark:text-white">{field.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Common CIDR Blocks</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
            {[
              { cidr: '/8', hosts: '16M', mask: '255.0.0.0' },
              { cidr: '/16', hosts: '65K', mask: '255.255.0.0' },
              { cidr: '/24', hosts: '256', mask: '255.255.255.0' },
              { cidr: '/25', hosts: '128', mask: '255.255.255.128' },
              { cidr: '/26', hosts: '64', mask: '255.255.255.192' },
              { cidr: '/27', hosts: '32', mask: '255.255.255.224' },
              { cidr: '/28', hosts: '16', mask: '255.255.255.240' },
              { cidr: '/30', hosts: '4', mask: '255.255.255.252' },
            ].map((item) => (
              <button
                key={item.cidr}
                onClick={() => { setCidr(`192.168.1.0${item.cidr}`); setError(''); setResult(null) }}
                className="text-left p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="text-violet-600 dark:text-violet-400 font-semibold">{item.cidr}</div>
                <div className="text-gray-400">{item.hosts} hosts</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
