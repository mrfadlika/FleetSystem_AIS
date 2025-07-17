import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, Home, Clock, Plus, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import SideBar from "../../utils/sidebar/SideBar";
import Header from '../../utils/Header';

const initialProfile = {
  username: "Your First Name",
  fullName: "Your First Name",
  gender: "Your First Name",
  country: "Your First Name",
  language: "Your First Name",
  timeZone: "Your First Name",
  emails: [
    {
      email: "chaeunwoo@gmail.com",
      primary: true,
      addedAgo: "1 month ago",
    },
  ],
};

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [form, setForm] = useState(profile);
  const [newEmail, setNewEmail] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleEdit = () => {
    setForm(profile);
    setEditMode(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddEmail = () => {
    if (newEmail && !form.emails.some(e => e.email === newEmail)) {
      setForm({
        ...form,
        emails: [
          ...form.emails,
          { email: newEmail, primary: false, addedAgo: "just now" },
        ],
      });
      setNewEmail("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(form);
    setEditMode(false);
    // Simulasi request JSON
    console.log("REQUEST JSON:", JSON.stringify(form, null, 2));
  };

  return (
    <div className="min-h-screen bg-[#232428] flex flex-col">
      {/* Header */}
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar />
        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center py-12 px-4 bg-[#232428]">
          {!editMode ? (
            <>
              <h1 className="text-2xl font-bold text-white mb-6 w-full max-w-3xl">Welcome, Cha Eun-woo</h1>
              <div className="w-full max-w-3xl bg-[#343538] rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center relative">
                {/* Edit Icon */}
                <button
                  className="absolute top-5 right-5 p-2 rounded-full bg-[#232526] hover:bg-[#74CD25] transition"
                  title="Edit Profile"
                  onClick={handleEdit}
                >
                  <Edit2 className="w-5 h-5 text-[#74CD25] group-hover:text-white" />
                </button>
                {/* Avatar */}
                <div className="flex-shrink-0 flex flex-col items-center md:items-start md:mr-10 mb-6 md:mb-0">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=180&h=180&fit=crop&crop=face"
                    alt="User"
                    className="w-36 h-36 rounded-full object-cover border-4 border-[#74CD25] shadow-lg"
                  />
                </div>
                {/* Info */}
                <div className="flex-1 flex flex-col items-center md:items-start">
                  <h2 className="text-xl font-bold text-white mb-2">Personal Info</h2>
                  <div className="text-gray-400 text-sm mb-1">Username</div>
                  <div className="text-lg font-semibold text-white mb-3">{profile.username}</div>
                  <div className="text-gray-400 text-sm mb-1">Email</div>
                  <div className="text-lg font-semibold text-[#74CD25] mb-3 break-all">{profile.emails[0].email}</div>
                  <div className="flex gap-4 mt-4">
                    <span className="inline-block px-4 py-1 rounded-full bg-[#232526] text-xs text-white font-semibold border border-[#343538]">Admin</span>
                    <span className="inline-block px-4 py-1 rounded-full bg-[#74CD25] text-xs text-white font-semibold border border-[#74CD25]">Active</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-white mb-8 w-full max-w-3xl text-center md:text-left">Edit Profile</h1>
              <form
                className="w-full max-w-3xl bg-[#343538] rounded-2xl shadow-xl p-8 flex flex-col gap-8"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Avatar & Name */}
                  <div className="flex flex-col items-center md:items-start min-w-[200px] md:w-1/3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face"
                      alt="User"
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#74CD25] mb-2"
                    />
                    <div className="text-lg font-bold text-white leading-tight">Cha Eun-woo</div>
                    <div className="text-xs text-gray-400 leading-tight">{form.emails[0].email}</div>
                  </div>
                  {/* Form Fields & Email */}
                  <div className="flex-1 flex flex-col gap-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">Username</label>
                        <input
                          type="text"
                          name="username"
                          value={form.username}
                          onChange={handleChange}
                          className="w-full rounded-lg px-3 py-2 bg-[#232428] text-white border border-[#232526] focus:outline-none focus:ring-2 focus:ring-[#74CD25]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          className="w-full rounded-lg px-3 py-2 bg-[#232428] text-white border border-[#232526] focus:outline-none focus:ring-2 focus:ring-[#74CD25]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">Gender</label>
                        <input
                          type="text"
                          name="gender"
                          value={form.gender}
                          onChange={handleChange}
                          className="w-full rounded-lg px-3 py-2 bg-[#232428] text-white border border-[#232526] focus:outline-none focus:ring-2 focus:ring-[#74CD25]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">Country</label>
                        <input
                          type="text"
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          className="w-full rounded-lg px-3 py-2 bg-[#232428] text-white border border-[#232526] focus:outline-none focus:ring-2 focus:ring-[#74CD25]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">Language</label>
                        <input
                          type="text"
                          name="language"
                          value={form.language}
                          onChange={handleChange}
                          className="w-full rounded-lg px-3 py-2 bg-[#232428] text-white border border-[#232526] focus:outline-none focus:ring-2 focus:ring-[#74CD25]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">Time Zone</label>
                        <input
                          type="text"
                          name="timeZone"
                          value={form.timeZone}
                          onChange={handleChange}
                          className="w-full rounded-lg px-3 py-2 bg-[#232428] text-white border border-[#232526] focus:outline-none focus:ring-2 focus:ring-[#74CD25]"
                        />
                      </div>
                    </div>
                    {/* Email List */}
                    <div className="mt-2">
                      <label className="block text-gray-300 text-sm mb-2">My email Address</label>
                      <div className="space-y-2 mb-2">
                        {form.emails.map((e, idx) => (
                          <div key={e.email} className="flex items-center gap-2 bg-[#232428] rounded-lg px-3 py-2">
                            <CheckCircle className="w-4 h-4 text-[#74CD25]" />
                            <span className="text-white text-sm font-semibold">{e.email}</span>
                            <span className="text-xs text-gray-400 ml-auto">{e.addedAgo}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <input
                          type="email"
                          placeholder="Add Email Address"
                          value={newEmail}
                          onChange={e => setNewEmail(e.target.value)}
                          className="flex-1 rounded-lg px-3 py-2 bg-[#232428] text-white border border-[#232526] focus:outline-none focus:ring-2 focus:ring-[#74CD25]"
                        />
                        <button
                          type="button"
                          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[#74CD25] text-white font-semibold hover:bg-[#5fa01c] transition text-sm"
                          onClick={handleAddEmail}
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="px-10 py-2 rounded-lg bg-[#74CD25] text-white font-semibold hover:bg-[#5fa01c] transition text-lg shadow"
                  >
                    Save
                  </button>
                </div>
              </form>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProfileScreen;