import { useState } from 'react'
import { GraduationCap, Plus, Trash2 } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

interface Course {
  id: number
  name: string
  credits: number
  grade: string
}

const gradePoints: Record<string, number> = {
  'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'D-': 0.7, 'F': 0.0,
}

let nextId = 1

export default function GpaCalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: nextId++, name: '', credits: 3, grade: 'A' },
  ])

  const addCourse = () => {
    setCourses([...courses, { id: nextId++, name: '', credits: 3, grade: 'A' }])
  }

  const removeCourse = (id: number) => {
    if (courses.length > 1) setCourses(courses.filter(c => c.id !== id))
  }

  const updateCourse = (id: number, field: keyof Course, value: string | number) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c))
  }

  const totalCredits = courses.reduce((sum, c) => sum + (c.credits || 0), 0)
  const totalQualityPoints = courses.reduce((sum, c) => sum + (c.credits || 0) * (gradePoints[c.grade] ?? 0), 0)
  const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0

  return (
    <ToolLayout title="GPA Calculator" description="Calculate your GPA by adding courses with credit hours and grades." icon={GraduationCap}>
      <div className="space-y-3 mb-6">
        {courses.map((course) => (
          <div key={course.id} className="flex gap-2 items-end p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Course Name</label>
              <input value={course.name} onChange={e => updateCourse(course.id, 'name', e.target.value)} placeholder="e.g. Math 101" className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-gray-900 dark:text-white" />
            </div>
            <div className="w-20">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Credits</label>
              <input type="number" min={1} max={5} value={course.credits} onChange={e => updateCourse(course.id, 'credits', parseInt(e.target.value) || 1)} className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-gray-900 dark:text-white" />
            </div>
            <div className="w-24">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Grade</label>
              <select value={course.grade} onChange={e => updateCourse(course.id, 'grade', e.target.value)} className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-gray-900 dark:text-white">
                {Object.keys(gradePoints).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <button onClick={() => removeCourse(course.id)} disabled={courses.length === 1} className="p-2.5 text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button onClick={addCourse} className="flex items-center gap-2 px-4 py-2.5 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-xl text-sm font-medium hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors mb-6">
        <Plus className="w-4 h-4" /> Add Course
      </button>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 text-center">
          <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">{totalCredits}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Credits</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 text-center">
          <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">{totalQualityPoints.toFixed(1)}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Quality Points</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 text-center">
          <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">{gpa.toFixed(2)}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">GPA</div>
        </div>
      </div>
    </ToolLayout>
  )
}
