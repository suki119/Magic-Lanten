export let appURLs = {
    web: 'http://localhost:8000/',
  //web: 'https://smart-eye.onrender.com/'
}


export const webAPI = {

  /************************ Account API *********************************/

  postAccountData: 'api/account/addAcountDetails',
  getAccountData: 'api/account/getallAccountDetails',
  deleteAccountData: 'api/account/delete/',
  updateAccountData: 'api/account/update/',
  getAccountById: 'api/account/get/',

  /************************ Configaration API *********************************/
  addConfigarationDetails: 'api/configaration/addConfigarationDetails',
  getProductConfigarationByProductID :'api/configaration/getConfigDataByID/',

  
  /************************ Account API *********************************/
  addImage: 'api/image/addImage',
  getallImageByID:'api/image/getallImageByID/',
  deleteImageDetails:'api/image/deleteImageDetails/',
  updateImageDetails : 'api/image/updateImageDetails/'

}