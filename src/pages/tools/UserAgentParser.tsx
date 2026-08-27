import { useState } from 'react'
import { Monitor, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

interface UaInfo {
  browser: string
  browserVersion: string
  os: string
  osVersion: string
  platform: string
  raw: string
}

function parseUserAgent(ua: string): UaInfo {
  let browser = 'Unknown'
  let browserVersion = ''
  let os = 'Unknown'
  let osVersion = ''
  let platform = 'Unknown'

  // Browser
  if (ua.includes('Firefox/') && !ua.includes('Seamonkey')) {
    browser = 'Firefox'
    browserVersion = ua.match(/Firefox\/([\d.]+)/)?.[1] || ''
  } else if (ua.includes('Edg/')) {
    browser = 'Edge'
    browserVersion = ua.match(/Edg\/([\d.]+)/)?.[1] || ''
  } else if (ua.includes('OPR/') || ua.includes('Opera/')) {
    browser = 'Opera'
    browserVersion = ua.match(/(?:OPR|Opera)\/([\d.]+)/)?.[1] || ''
  } else if (ua.includes('Chrome/') && ua.includes('Safari/')) {
    browser = 'Chrome'
    browserVersion = ua.match(/Chrome\/([\d.]+)/)?.[1] || ''
  } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
    browser = 'Safari'
    browserVersion = ua.match(/Version\/([\d.]+)/)?.[1] || ''
  } else if (ua.includes('MSIE') || ua.includes('Trident/')) {
    browser = 'Internet Explorer'
    browserVersion = ua.match(/(?:MSIE |Trident.*rv:)([\d.]+)/)?.[1] || ''
  }

  // OS
  if (ua.includes('Windows NT 10')) { os = 'Windows'; osVersion = '10/11' }
  else if (ua.includes('Windows NT 6.3')) { os = 'Windows'; osVersion = '8.1' }
  else if (ua.includes('Windows NT 6.2')) { os = 'Windows'; osVersion = '8' }
  else if (ua.includes('Windows NT 6.1')) { os = 'Windows'; osVersion = '7' }
  else if (ua.includes('Windows')) { os = 'Windows'; osVersion = '' }
  else if (ua.includes('Mac OS X')) { os = 'macOS'; osVersion = ua.match(/Mac OS X ([\d_]+)/)?.[1]?.replace(/_/g, '.') || '' }
  else if (ua.includes('Android')) { os = 'Android'; osVersion = ua.match(/Android ([\d.]+)/)?.[1] || '' }
  else if (ua.includes('iPhone') || ua.includes('iPad')) { os = ua.includes('iPad') ? 'iPadOS' : 'iOS'; osVersion = ua.match(/OS ([\d_]+)/)?.[1]?.replace(/_/g, '.') || '' }
  else if (ua.includes('Linux')) { os = 'Linux' }
  else if (ua.includes('CrOS')) { os = 'Chrome OS' }

  // Platform
  if (ua.includes('Mobile') || ua.includes('Android')) platform = 'Mobile'
  else if (ua.includes('iPad') || ua.includes('Tablet')) platform = 'Tablet'
  else platform = 'Desktop'

  return { browser, browserVersion, os, osVersion, platform, raw: ua }
}

export default function UserAgentParser() {
  const [copied, setCopied] = useState(false)
  const info = parseUserAgent(navigator.userAgent)

  const handleCopy = () => {
    navigator.clipboard.writeText(info.raw)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const fields = [
    { label: 'Browser', value: info.browser },
    { label: 'Version', value: info.browserVersion },
    { label: 'Operating System', value: info.os },
    { label: 'OS Version', value: info.osVersion },
    { label: 'Platform', value: info.platform },
  ]

  return (
    <ToolLayout title="User Agent Parser" description="Parse and inspect your browser's user agent string." icon={Monitor}>
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-gray-100 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Parsed Information</span>
            <button onClick={handleCopy} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-violet-400 transition-colors">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy UA'}
            </button>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {fields.map((field) => (
              <div key={field.label} className="px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">{field.label}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{field.value || '—'}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Raw User Agent String</label>
          <div className="relative">
            <textarea
              readOnly
              value={info.raw}
              className="w-full h-28 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-mono text-gray-600 dark:text-gray-400 resize-none"
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
