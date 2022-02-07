// import getConfig from './config'

// const nearConfig = getConfig(process.env.NODE_ENV || 'development')

// describe(() =>  {
//   beforeAll(async function () {
//     // NOTE: nearlib and nearConfig are made available by near-cli/test_environment
//     const near = await nearlib.connect(nearConfig)
//     window.accountId = nearConfig.contractName
//     window.contract = await near.loadContract(nearConfig.contractName, {
//       viewMethods: ['fetchJobs', 'getJobById', 'getApplicants'],
//       changeMethods: ['postNewJob', 'applyToJob'],
//       sender: window.accountId
//     })
//   })
  
//   test.skip('fetchJobs()', async () => {
//     const jobs = await window.contract.fetchJobs({ accountId: window.accountId })
//     expect(jobs).toEqual([])
//   })
// })
