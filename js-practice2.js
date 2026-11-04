// Declare three variables
const hospitalName = 'Central Hospital'
const doctorCount = 12
let isOpen = true

// Display welcome message when open
if (isOpen) {
  console.log(`Welcome to ${hospitalName}! We have ${doctorCount} doctors currently available.`)
}

isOpen = false

if (!isOpen) {
  console.log(`We are sorry, but ${hospitalName} is currently closed. Please visit the emergency clinic for urgent care.`)
}

// Create an array containing at least five doctor names
const doctors = ['Dr. Lee', 'Dr. Khan', 'Dr. Smith', 'Dr. Patel', 'Dr. Gomez']

// Use a for...of loop with .entries() to print each doctor with a 1-based index
for (const [index, doctor] of doctors.entries()) {
  console.log(`Doctor #${index + 1}: ${doctor}`)
}

// Add a new doctor using push() and print the updated count
const updatedCount = doctors.push('Dr. Taylor')
console.log(`New doctor added. Updated doctor count: ${updatedCount}`)

// 4. Function to check if a doctor exists in the array
function findDoctor (name) {
  if (doctors.includes(name)) {
    return 'Doctor found'
  }
  return 'Doctor not found'
}

// Verification calls for findDoctor
console.log(findDoctor('Dr. Khan')) // Outputs: Doctor found
console.log(findDoctor('Dr. House')) // Outputs: Doctor not found

// 2.3 Objects and Nested Data
const patient = {
  name: ' Alice Martin ',
  age: 34,
  conditions: [' diabetes ', ' hypertension '],
  doctor: { name: 'Dr. Lee ', specialty: ' Cardiology ' }
}

console.log(`Patient Name: ${patient.name.trim()}`)
console.log(`Number of Patient Conditions: ${patient.conditions.length}`)
console.log(`${patient.name.trim()} is treated by ${patient.doctor.name.trim()}`)

// Add a new condition dynamically (”anxiety”) and display the updated object.
patient.conditions.push(' anxiety ')
console.log(`Updated Patient Conditions: ${patient.conditions.map(condition => condition.trim()).join(', ')}`)
