import {api} from '../api';

const forgotPass = async body => {
  const user = await api(`/api/auth/forgot-password`, 'POST', body);
  return user;
};
const resetPass = async body => {
  const user = await api(`/api/auth/reset-password`, 'POST', body);
  return user;
};
const otpVerify = async body => {
  const user = await api(`/api/auth/verify-otp`, 'POST', body);
  return user;
};
const getUser = async id => {
  const user = await api(`/api/users/${id}`);
  return user;
};
const getChat = async id => {
  const chats = await api(`api/chat/${id}`);
  return chats;
};

const updatePassword = async body => {
  const user = await api(`/api/users/password`, 'PATCH', body);
  return user;
};
const updateUser = async (role, body) => {
  const user = await api(`/api/users?role=${role}`, 'PATCH', body);
  return user;
};

const createJob = async (method, body) => {
  console.log(body, 'inside createJob functions');
  const job = await api(`/api/jobs`, method, body);
  return job;
};
const getAllJobs = async (method, body) => {
  console.log(body, 'inside createJob functions');
  const job = await api(`/api/jobs`);
  return job;
};
const currentAndPreviousJobs = async param => {
  const job = await api(`/api/jobs/me?status=${param}`);
  return job;
};
const getJobById = async id => {
  const job = await api(`/api/jobs/${id}`);
  return job;
};
const getOtherUserById = async (id, role) => {
  const job = await api(`/api/users?userId=${id}`);
  return job;
};

const acceptjob = async id => {
  const accept = await api(`/api/jobs/accept/${id}`);
};
const startJob = async id => {
  const accept = await api(`/api/jobs/start/${id}`);
};
const endJob = async id => {
  const accept = await api(`/api/jobs/end/${id}`);
};
const giveReview = async (jobId, userId, body) => {
  const accept = await api(
    `/api/review/job/${jobId}/guard/${userId}`,
    'POST',
    body,
  );
};

const fcmTokenApi = async (token) => {
  const body ={
    deviceToken:token
  }
  const fcm = await api(`/api/users/device-token`,'PATCH',body);
};

const getHours = async () => {
  const hours = await api(`/api/jobs/hours`);
  return hours
};
export {
  forgotPass,
  otpVerify,
  resetPass,
  getUser,
  createJob,
  currentAndPreviousJobs,
  getJobById,
  updatePassword,
  updateUser,
  getOtherUserById,
  getChat,
  acceptjob,
  getAllJobs,
  startJob,
  endJob,
  giveReview,
  fcmTokenApi,
  getHours
};
