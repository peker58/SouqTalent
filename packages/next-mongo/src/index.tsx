// import findPublicJob from service

import { getCategories } from './service/category.service'

import {
  createJob,
  getSingleJob,
  getJobs,
  getJobsPrivate,
  getSearchJobs,
  updateJobStatus,
  updateJob,
  deleteJob,
  getTotalCount,
} from './controller/job.controller'
import {
  createCompany,
  getSingleCompany,
  findCompanyPrivate,
  getSearchCompany,
  updateCompanyStatus,
  updateCompany,
  deleteCompany,
} from './controller/company.controller'
import { getFilters, createFilter } from './controller/admin/filter.controller'
import {
  createUser,
  loginUser,
  resendConfirmEmail,
  forgetPassword,
  forgetPassReset,
  getUser,
  updateUser,
  updatePassword,
  updateUserPackage,
} from './controller/user.controller'
import { getDashboardStat } from './service/user.service'

import {
  createResume,
  getSingleResume,
  getResumePrivate,
  getSearchResume,
  updateResumeStatus,
  updateResume,
  deleteResume,
} from './controller/resume.controller'

import { createEmail, findEmailByEmailType, sendContactEmail } from './service/admin/email.service'
import { getNotification } from './service/notification.service'
import { updateNotification } from './controller/notification.controller'
import {
  findMessageRoom,
  createMessageRoom,
  getMessageRoom,
  updateMessageRoom,
} from './service/message.service'
import {
  createBookmark,
  checkBookmark,
  getBookmarks,
  deleteBookmark,
} from './controller/bookmark.controller'
import {
  createJobApply,
  getUserApplication,
  getJobApplication,
  updateApplyStatus,
} from './controller/jobApply.controller'
import {
  createJobAlerts,
  getJobAlerts,
  getSingleJobAlert,
  updateJobAlert,
  updateJobAlertStatus,
  deleteJobAlert,
} from './controller/jobAlert.controller'
import {
  createCategory,
  deleteCategory,
  getSingleCategory,
  updateCategory,
} from './controller/category.controller'
import {
  createPackage,
  getPackages,
  getSinglePackage,
  updatePackage,
  deletePackage,
} from './controller/package.controller'
import {
  getEmailSettings,
  updateEmailSettings,
  createEmailSettings,
} from './controller/admin/email.controller'
import connectDB from './utils/connect'
import { requireCandidate, requireEmployer, requireUser } from './middleware/authenticate'

export const apiProvider = {
  connectDB,
  createJob,
  getJobs,
  getSingleJob,
  getJobsPrivate,
  updateJobStatus,
  getSearchJobs,
  updateJob,
  deleteJob,
  getTotalCount,

  createCompany,
  getSingleCompany,
  getSearchCompany,
  updateCompanyStatus,
  updateCompany,
  deleteCompany,

  createResume,
  getSingleResume,
  getSearchResume,
  getResumePrivate,
  updateResumeStatus,
  updateResume,
  deleteResume,

  createUser,
  getUser,
  loginUser,
  resendConfirmEmail,
  forgetPassword,
  forgetPassReset,
  updateUser,
  updatePassword,
  updateUserPackage,
  requireUser,
  requireCandidate,
  requireEmployer,


  createEmail,
  sendContactEmail,
  findEmailByEmailType,

  
  getDashboardStat,
  getNotification,
  updateNotification,
  findMessageRoom,
  updateMessageRoom,
  createMessageRoom,
  getMessageRoom,

  createBookmark,
  checkBookmark,
  getBookmarks,
  deleteBookmark,

  createJobApply,
  getUserApplication,
  getJobApplication,
  updateApplyStatus,

  getJobAlerts,
  getSingleJobAlert,
  updateJobAlert,
  updateJobAlertStatus,
  deleteJobAlert,
  createJobAlerts,

  createCategory,
  getCategories,
  deleteCategory,
  getSingleCategory,
  updateCategory,
  findCompanyPrivate,

  createPackage,
  getPackages,
  getSinglePackage,
  updatePackage,
  deletePackage,

  getEmailSettings,
  updateEmailSettings,
  createEmailSettings,

  createFilter,
  getFilters,
}
