"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, GraduationCap, Users, PlusCircle, Trash2, Minimize2, Maximize2, School } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Student {
  id: number
  name: string
  email: string
  major: string
  avatar: string
}

interface Course {
  id: number
  code: string
  name: string
  instructor: string
  color: string
}

interface Faculty {
  id: number
  name: string
  email: string
  department: string
  avatar: string
}

function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "John Doe", email: "john@example.com", major: "Computer Science", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", major: "Biology", avatar: "/placeholder.svg?height=40&width=40" },
  ])
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id' | 'avatar'>>({ name: '', email: '', major: '' })

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return re.test(email)
  }

  const addStudent = () => {
    if (!validateEmail(newStudent.email)) {
      toast.error('Please enter a valid email address', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      return
    }
    setStudents([...students, { ...newStudent, id: students.length + 1, avatar: "/placeholder.svg?height=40&width=40" }])
    setNewStudent({ name: '', email: '', major: '' })
    toast.success('Student added successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  const deleteStudent = (id: number) => {
    setStudents(students.filter(student => student.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <Input
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          className="text-xs"
        />
        <Input
          placeholder="Email"
          value={newStudent.email}
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          className="text-xs"
        />
        <Input
          placeholder="Major"
          value={newStudent.major}
          onChange={(e) => setNewStudent({ ...newStudent, major: e.target.value })}
          className="text-xs"
        />
      </div>
      <Button onClick={addStudent} className="w-full text-xs">
        <PlusCircle className="mr-2 h-3 w-3" /> Add Student
      </Button>
      <div className="overflow-y-auto max-h-[calc(100vh-300px)] rounded-md border">
        <AnimatePresence>
          {students.map((student) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-2 p-2 border-b last:border-b-0 hover:bg-secondary/50 transition-colors"
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-xs font-medium leading-none">{student.name}</p>
                <p className="text-xs text-muted-foreground">{student.email}</p>
              </div>
              <div className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                {student.major}
              </div>
              <Button variant="destructive" size="icon" onClick={() => deleteStudent(student.id)} className="h-6 w-6">
                <Trash2 className="h-3 w-3" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, code: "CS101", name: "Introduction to Programming", instructor: "Dr. Smith", color: "bg-blue-500" },
    { id: 2, code: "BIO201", name: "Cell Biology", instructor: "Dr. Johnson", color: "bg-green-500" },
  ])
  const [newCourse, setNewCourse] = useState<Omit<Course, 'id' | 'color'>>({ code: '', name: '', instructor: '' })

  const addCourse = () => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500']
    setCourses([...courses, { ...newCourse, id: courses.length + 1, color: colors[Math.floor(Math.random() * colors.length)] }])
    setNewCourse({ code: '', name: '', instructor: '' })
  }

  const deleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <Input
          placeholder="Course Code"
          value={newCourse.code}
          onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
          className="text-xs"
        />
        <Input
          placeholder="Course Name"
          value={newCourse.name}
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
          className="text-xs"
        />
        <Input
          placeholder="Instructor"
          value={newCourse.instructor}
          onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
          className="text-xs"
        />
      </div>
      <Button onClick={addCourse} className="w-full text-xs">
        <PlusCircle className="mr-2 h-3 w-3" /> Add Course
      </Button>
      <div className="overflow-y-auto max-h-[calc(100vh-300px)] rounded-md border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
          <AnimatePresence>
            {courses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="flex flex-col h-full overflow-hidden group">
                  <CardHeader className={`${course.color} text-white rounded-t-lg transition-all duration-300 group-hover:h-1/2 p-2`}>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xs">{course.code}</CardTitle>
                      <Button variant="destructive" size="icon" onClick={() => deleteCourse(course.id)} className="h-5 w-5">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <CardDescription className="text-white/80 text-[10px]">{course.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pt-2">
                    <p className="text-[10px]">Instructor: {course.instructor}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function FacultyManagement() {
  const [faculty, setFaculty] = useState<Faculty[]>([
  { id: 1, name: "Dr. Smith", email: "smith@example.com", department: "Computer Science", avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' dy='.3em' fill='%23cccccc'%3E?%3C/text%3E%3C/svg%3E` },
  { id: 2, name: "Dr. Johnson", email: "johnson@example.com", department: "Biology", avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' dy='.3em' fill='%23cccccc'%3E?%3C/text%3E%3C/svg%3E` },
])
  const [newFaculty, setNewFaculty] = useState<Omit<Faculty, 'id' | 'avatar'>>({ name: '', email: '', department: '' })

  const addFaculty = () => {
    const placeholderDataURL = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' dy='.3em' fill='%23cccccc'%3E?%3C/text%3E%3C/svg%3E`;
    
    setFaculty([...faculty, { ...newFaculty, id: faculty.length + 1, avatar: placeholderDataURL }])
    setNewFaculty({ name: '', email: '', department: '' })
  }

  const deleteFaculty = (id: number) => {
    setFaculty(faculty.filter(member => member.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <Input
          placeholder="Name"
          value={newFaculty.name}
          onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
          className="text-xs"
        />
        <Input
          placeholder="Email"
          value={newFaculty.email}
          onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
          className="text-xs"
        />
        <Input
          placeholder="Department"
          value={newFaculty.department}
          onChange={(e) => setNewFaculty({ ...newFaculty, department: e.target.value })}
          className="text-xs"
        />
      </div>
      <Button onClick={addFaculty} className="w-full text-xs">
        <PlusCircle className="mr-2 h-3 w-3" /> Add Faculty
      </Button>
      <div className="overflow-y-auto max-h-[calc(100vh-300px)] rounded-md border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
          <AnimatePresence>
            {faculty.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="flex flex-col h-full group">
                  <CardHeader className="flex flex-row items-center gap-2 group-hover:bg-secondary transition-colors p-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-xs">{member.name}</CardTitle>
                      <CardDescription className="text-[10px]">{member.email}</CardDescription>
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => deleteFaculty(member.id)} className="h-5 w-5">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </CardHeader>
                  <CardContent className="p-2">
                    <p className="text-[10px]">Department: {member.department}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function MinMaxButton({ isMinimized, onClick }: { isMinimized: boolean; onClick: () => void }) {
  return (
    <Button variant="outline" size="icon" onClick={onClick} className="h-6 w-6">
      {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
    </Button>
  )
}

export default function Dashboard() {
  const [minimizedSections, setMinimizedSections] = useState({
    students: false,
    courses: false,
    faculty: false,
  })

  const toggleMinimize = (section: 'students' | 'courses' | 'faculty') => {
    setMinimizedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      document.documentElement.style.setProperty('--hue-rotate', `${Math.random() * 360}deg`)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-secondary/10 transition-all duration-1000" 
      style={{ 
        '--hue-rotate': '0deg',
        backgroundImage: "url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      } as React.CSSProperties}
    >
      <div className="container mx-auto p-4 backdrop-blur-sm bg-white/30">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-4"
        >
          <School className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-2xl font-bold text-center text-primary">College Management System</h1>
        </motion.div>
        <div className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between p-2">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                <div>
                  <CardTitle className="text-sm">Student Management</CardTitle>
                  <CardDescription className="text-xs">Manage student information</CardDescription>
                </div>
              </div>
              <MinMaxButton
                isMinimized={minimizedSections.students}
                onClick={() => toggleMinimize('students')}
              />
            </CardHeader>
            <CardContent className="p-2">
              {!minimizedSections.students && <StudentManagement />}
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between p-2">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <div>
                  <CardTitle className="text-sm">Course Management</CardTitle>
                  <CardDescription className="text-xs">Manage course offerings</CardDescription>
                </div>
              </div>
              <MinMaxButton
                isMinimized={minimizedSections.courses}
                onClick={() => toggleMinimize('courses')}
              />
            </CardHeader>
            <CardContent className="p-2">
              {!minimizedSections.courses && <CourseManagement />}
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between p-2">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-primary" />
                <div>
                  <CardTitle className="text-sm">Faculty Management</CardTitle>
                  <CardDescription className="text-xs">Manage faculty information</CardDescription>
                </div>
              </div>
              <MinMaxButton
                isMinimized={minimizedSections.faculty}
                onClick={() => toggleMinimize('faculty')}
              />
            </CardHeader>
            <CardContent className="p-2">
              {!minimizedSections.faculty && <FacultyManagement />}
            </CardContent>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}