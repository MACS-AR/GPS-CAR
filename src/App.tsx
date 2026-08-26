import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignupCompany from './pages/Auth/SignupCompany'
import SignupIndividual from './pages/Auth/SignupIndividual'
import DashboardLayout from './pages/Dashboard/Layout'

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup/company" element={<SignupCompany/>} />
      <Route path="/signup/individual" element={<SignupIndividual/>} />
      <Route path="/app/*" element={<DashboardLayout/>} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
