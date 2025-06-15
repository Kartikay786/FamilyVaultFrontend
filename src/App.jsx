import WebsiteLayout from './Layout/Website/WebsiteLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/Website/Home/HomePage'
import LoginScreen from './Pages/Auth/Login'
import AuthLayout from './Layout/Auth/AuthLayout'
import RegisterScreen from './Pages/Auth/Regsiter'
import ForgotPasswordScreen from './Pages/Auth/ForgotPassword'
import DashobardLayout from './Layout/DashboardLayout/DashobardLayout'
import Dashboard from './Pages/Website/Dashboard/Dashboard'
import VaultOverview from './Pages/Website/Dashboard/VaultOverview'
import RecentMemories from './Pages/Website/Dashboard/RecentMemory'
import CreateVault from './Pages/Website/VaultMgmt/CreateVault'
import EditVaultSettings from './Pages/Website/VaultMgmt/Edit-Vault'
import VaultDetail from './Pages/Website/VaultMgmt/VaultDetail'
import EditMemory from './Pages/Website/MemoryMgmt/EditMemory'
import MemoryTimeline from './Pages/Website/MemoryMgmt/MemoryTimeline'
import MemoryDetails from './Pages/Website/MemoryMgmt/MemoryDetails'
import MemorySearch from './Pages/Website/MemoryMgmt/MemorySearch'
import Uploadmemory from './Pages/Website/MemoryMgmt/UploadMemory'
import FamilyTree from './Pages/Website/FamilyTree/FamilyTree'
import ProfileScreen from './Pages/Website/FamilyTree/Profile'
import LegacyAccess from './Pages/Website/FamilyTree/LegacyAccess'
import AccessControl from './Pages/Website/Setting/AccessControl'
import Settings from './Pages/Website/Setting/Settings'
import AddMember from './Pages/Website/FamilyTree/AddMember'
import FamilyMember from './Pages/Website/FamilyTree/FamilyMembers'

const App = () => {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<WebsiteLayout/>} >
          <Route index element={<HomePage/>} />
        </Route>

        <Route path='/auth' element={<AuthLayout/>}>
            <Route path='login' element={<LoginScreen/>} />
            <Route path='register' element={<RegisterScreen/>} />
            <Route path='forgotpassword' element={<ForgotPasswordScreen/>} />
        </Route>

        <Route path='/family' element={<DashobardLayout/>}>
            <Route path='dashboard' element={<Dashboard/>} /> 
            <Route path='vaultoverview' element={<VaultOverview/>} /> 
            <Route path='recentMemory' element={<RecentMemories/>} /> 
            <Route path='createvault' element={<CreateVault/>} />
            <Route path='editvault' element={<EditVaultSettings/>} />
            <Route path='vaultdetail' element={<VaultDetail/>} />
            <Route path='editmemory' element={<EditMemory/>} />
            <Route path='memorydetail' element={<MemoryDetails/>} />
            <Route path='memorysearch' element={<MemorySearch/>} />
            <Route path='memorytimeline' element={<MemoryTimeline/>} />
            <Route path='uploadmemory' element={<Uploadmemory/>} />
            <Route path='familytree' element={<FamilyTree/>} />
            <Route path='profile' element={<ProfileScreen/>} />
            <Route path='legacyacces' element={<LegacyAccess/>} />
            <Route path='accessControl' element={<AccessControl/>} />
            <Route path='setting' element={<Settings/>} />
            <Route path='addMember' element={<AddMember/>} />
            <Route path='familymember' element={<FamilyMember/>} />
        </Route>
        
      </Routes>
     </BrowserRouter> 
    </>
  )
}

export default App