import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/components/auth/login_screen";
import SignUpScreen from "./src/components/auth/singup_screen";
import UserDashboard from "./src/components/user/user_dashboard";
import ServiceForm from "./src/components/user/service_form";
import UserAppointment from "./src/components/user/user_appo";
import Header from "./src/components/user/user_header";
import SettingsScreen from "./src/components/user/settings";
import UserNotification from "./src/components/user/usernotif";
import AdminDashboard from "./src/components/admin/admin_dashboard";
import AppointmentApproval from "./src/components/admin/appo_approval";
import AdminNotifications from "./src/components/admin/admin_notif";
import AdminAvailability from "./src/components/admin/admin_availability";
import AdminHeader from "./src/components/admin/admin_header";
import AdminSettingsScreen from "./src/components/admin/admin_settings";
import ApprovedAppointmentsByAdmin from "./src/components/admin/approved_appoint_admin";
import ApprovedAppointments from "./src/components/user/approved_appointments";
import { AppProvider } from "./src/hooks/contextprovider";
import { NotificationProvider } from "./src/components/notificationContext";
import AboutUs from "./src/components/about";
import AdminProfile from "./src/components/admin/admin_profile";
import Profile from "./src/components/user/user_profile";


export default function App() {
  const NavStack = createStackNavigator();

  return (
    <NotificationProvider>
    <AppProvider>
    <NavigationContainer>
      
      <NavStack.Navigator initialRouteName="ServiceHome">
        {/* <NavStack.Screen
          name="Home"
          component={Tabberss}
          options={{ headerShown: false }}
        /> */}
        {/* sign up and login boundary */}
        <NavStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        {/* sign up and login boundary */}
         <NavStack.Screen
          name="UserDashboard"
          component={UserDashboard}
          options={{
            header: () => <Header />
          }}
        />
        <NavStack.Screen
          name="ServiceForm"
          component={ServiceForm}
          options={{
            header: () => <Header />
          }}
        />
        <NavStack.Screen
          name="UserAppointment"
          component={UserAppointment}
           options={{
            header: () => <Header />
          }}
        />
         <NavStack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ 
            header:()=> <Header/>
           }}
        />
        <NavStack.Screen
          name="UserNotification"
          component={UserNotification}
          options={{ 
            header:()=> <Header/>
           }}
        />
        <NavStack.Screen
          name="ApprovedAppointments"
          component={ApprovedAppointments}
          options={{ 
            header:()=> <Header/>
           }}
        />
        <NavStack.Screen
          name="Profile"
          component={Profile}
          options={{ 
            header:()=> <Header/>
           }}
        />
        <NavStack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{ 
            header:()=> <AdminHeader/>
           }}
        />
        <NavStack.Screen
          name="AppointmentApproval"
          component={AppointmentApproval}
          options={{ 
            header:()=> <AdminHeader/>
           }}
        />
        <NavStack.Screen
          name="AdminNotifications"
          component={AdminNotifications}
          options={{ 
            header:()=> <AdminHeader/>
           }}
        />
          <NavStack.Screen
          name="AdminAvailability"
          component={AdminAvailability}
          options={{ 
            header:()=> <AdminHeader/>
           }}
        />
        <NavStack.Screen
          name="AdminSettingsScreen"
          component={AdminSettingsScreen}
          options={{ 
            header:()=> <AdminHeader/>
           }}
        />
        <NavStack.Screen
          name="ApprovedAppointmentsByAdmin"
          component={ApprovedAppointmentsByAdmin}
          options={{ 
            header:()=> <AdminHeader/>
           }}
        />
        <NavStack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{ 
            header:()=> <AdminHeader/> && <Header/>
           }}
        />
        <NavStack.Screen
          name="AdminProfile"
          component={AdminProfile}
          options={{ 
            header:()=> <AdminHeader/>
           }}
        />
      </NavStack.Navigator>
    </NavigationContainer>
    </AppProvider>
    </NotificationProvider>
  );
}
