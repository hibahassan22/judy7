import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TripsListPage from "./components/TripsListPage";
import TripDetailsPage from "./components/TripDetailsPage";
import NotificationsPanel from "./components/NotificationsPanel";
import NotificationsBellPage from "./components/NotificationsBellPage";
import UsersPage from "./components/UsersPage";
import ActivityLogPage from "./components/ActivityLogPage";
import SettingsPage from "./components/SettingsPage";
import RewardsPage from "./components/RewardsPage";
import ClientsPage from "./components/ClientsPage";
import SupportPage from "./components/SupportPage";
import DriversPage from "./components/DriversPage";
import CreateTripPage from "./components/CreateTripPage";
import NewTripFormPage from "./components/NewTripFormPage";
import DashboardPage from "./components/DashboardPage";
import ApprovalsPage from "./components/ApprovalsPage";
import PermissionsPage from "./components/PermissionsPage";
import SystemManagementPage from "./components/SystemManagementPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout><DashboardPage /></Layout>} path="/dashboard" />
        <Route element={<Layout><TripsListPage /></Layout>} path="/trips" />
        <Route element={<Layout><TripDetailsPage /></Layout>} path="/trips/:tripId" />
        <Route element={<Layout><NotificationsPanel /></Layout>} path="/notifications" />
        <Route element={<Layout><NotificationsBellPage /></Layout>} path="/alerts" />
        <Route element={<Layout><UsersPage /></Layout>} path="/users" />
        <Route element={<Layout><ActivityLogPage /></Layout>} path="/activity" />
        <Route element={<Layout><ApprovalsPage /></Layout>} path="/approvals" />
        <Route element={<Layout><PermissionsPage /></Layout>} path="/permissions" />
        <Route element={<Layout><SystemManagementPage /></Layout>} path="/system" />
        <Route element={<Layout><SettingsPage /></Layout>} path="/settings" />
        <Route element={<Layout><RewardsPage /></Layout>} path="/rewards" />
        <Route element={<Layout><ClientsPage /></Layout>} path="/clients" />
        <Route element={<Layout><SupportPage /></Layout>} path="/support" />
        <Route element={<Layout><DriversPage /></Layout>} path="/drivers" />
        <Route element={<Layout><DriversPage /></Layout>} path="/drivers/:driverId" />
        <Route element={<Layout><CreateTripPage /></Layout>} path="/create-trip" />
        <Route element={<Layout><NewTripFormPage /></Layout>} path="/new-trip" />
        <Route element={<Layout><TripsListPage /></Layout>} path="/*" />
      </Routes>
    </BrowserRouter>
  );
}
