// Exo 1
const hospitalName = 'Central Hospital'
const numberOfDoctors = 15
let isOpen = true

if (isOpen) {
  console.log(`Welcome to ${hospitalName}! We have ${numberOfDoctors} doctors currently available.`)
}

isOpen = false

if (!isOpen) {
  console.log(`${hospitalName} is currently closed.`)
}

// Exo 2
const doctors = ['Dr. Lee', 'Dr.Khan', 'Dr. Smith', 'Dr. Martin', 'Dr. Wang', 'Dr. Garcia']

for (const [index, name] of doctors.entries()) {
  console.log(`Doctor #${index + 1}: ${name}`)
}

doctors.push('Dr. Dubois')
console.log(`Updated count: ${doctors.length}`)

function findDoctor (name) {
  return doctors.includes(name) ? 'Doctor found' : 'Doctor not found'
}

console.log(findDoctor('Dr. Lee'))
console.log(findDoctor('Dr. Petit'))

// Exo 3
const patient = {
  name: 'Alice Martin',
  age: 34,
  conditions: ['diabetes', 'hypertension'],
  doctor: { name: 'Dr. Lee', specialty: 'Cardiology' }
}

console.log(patient.doctor.name)

console.log(patient.conditions.length)

console.log(`${patient.name} is treated by ${patient.doctor.name} (${patient.doctor.specialty}).`)

patient.conditions.push('anxiety')
console.log(patient)

// Exo 4
const patients = [
  { id: 1, name: 'Alice', age: 34 },
  { id: 2, name: 'John', age: 45 },
  { id: 3, name: 'Marie', age: 29 }
]

function filterByAge (minAge) {
  return patients.filter(patient => patient.age > minAge)
}

function addPatient (name, age) {
  const newId = patients.length + 1
  const newPatient = { id: newId, name, age }
  patients.push(newPatient)
}

console.log('Patients de plus de 30 ans :')
console.log(filterByAge(30))

addPatient('Lucas', 40)

console.log('Liste mise à jour des patients :')
console.log(patients)

// Exo 6
function createAppointment (doctor, patient, date) {
  if (!doctor || !patient || !date) {
    throw new Error('Missing required fields')
  }
  return { doctor, patient, date }
}

try {
  console.log(createAppointment('Dr. Lee', 'Alice', '2025-03-15'))
  console.log(createAppointment('Dr. Lee'))
} catch (err) {
  console.error('Error:', err.message)
}

// Exo 7
function getHospitalData () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'Central Hospital', uptime: 1234 })
    }, 1000)
  })
}

async function showData () {
  console.log('Fetching hospital data...')
  const data = await getHospitalData()
  console.log('Data loaded:', data)
}

showData()
