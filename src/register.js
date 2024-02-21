import React from 'react'

const register = () => {
  return (
    <div>
      <table class="m-auto w-3/4">
        <thead>
          <tr>
            <th class="bg-gray-500 text-white px-4 py-2">Name</th>
            <th class="bg-gray-500 text-white px-4 py-2">EmployeeID</th>
            <th class="bg-gray-500 text-white px-4 py-2">Department</th>
            <th class="bg-gray-500 text-white px-4 py-2">Date of Birth</th>
            <th class="bg-gray-500 text-white px-4 py-2">Gender</th>
            <th class="bg-gray-500 text-white px-4 py-2">Designation</th>
            <th class="bg-gray-500 text-white px-4 py-2">Salary</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border px-4 py-2">Jane Smith</td>
            <td class="border px-4 py-2">janesmith@example.com</td>
            <td class="border px-4 py-2">Electrical Engineering</td>
            <td class="border px-4 py-2">XYZ College</td>
            <td class="border px-4 py-2">9876543210</td>
            <td class="border px-4 py-2">City</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default register