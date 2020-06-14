import Config from '../Config';
import axiosInstance from '../api.config';

export const userSignIn = (email, password) => {
  return new Promise((resolve, reject) => {
    const headers = {
      email: email,
      password: password,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    axiosInstance
      .get(Config.API_END_POINT + '/user', {
        headers: headers,
      })
      .then(response => {
        if (response != null && response.data != null) {
          console.log('response ####', response.data);
          resolve(1);
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        resolve(0);
      });
  });
};

export const getCities = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(Config.API_END_POINT + '/city/list')
      .then(response => {
        if (response != null && response.data != null) {
          console.log('response ####', response.data);
          resolve(response.data.data);
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        resolve(0);
      });
  });
};

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(Config.API_END_POINT + '/category/list')
      .then(response => {
        if (response != null && response.data != null) {
          console.log('response ####', response.data);
          resolve(response.data.data);
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        resolve(0);
      });
  });
};

export const getJobsByCategory = categoryId => {
  return new Promise((resolve, reject) => {
    console.log(
      Config.API_END_POINT + `/job/list/by/category?categoryId=${categoryId}`,
    );
    axiosInstance
      .get(
        Config.API_END_POINT + `/job/list/by/category?categoryId=${categoryId}`,
      )
      .then(response => {
        if (response != null && response.data != null) {
          console.log('response ####', response.data);
          resolve(response.data.data);
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        resolve(0);
      });
  });
};

export const getJobsByUserId = userId => {
  return new Promise((resolve, reject) => {
    console.log(
      Config.API_END_POINT +
      `/candidate-index?id=805102e0-4a00-4743-8f9b-0198091aff1d`,
    );
    axiosInstance
      .get(
        Config.API_END_POINT +
        `/candidate-index?id=805102e0-4a00-4743-8f9b-0198091aff1d`,
      )
      .then(response => {
        if (response != null && response.data != null) {
          console.log(
            'response ####',
            response.data.data.attributes.jobPreviews,
          );
          resolve(response.data.data.attributes.jobPreviews);
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        resolve(0);
      });
  });
};

export const getJobDetailById = jobId => {
  return new Promise((resolve, reject) => {
    console.log(Config.API_END_POINT + `/job?${jobId}`);
    axiosInstance
      .get(Config.API_END_POINT + `/job?id=${jobId}`)
      .then(response => {
        if (response != null && response.data != null) {
          console.log('response ####', response.data.data.attributes);
          resolve(response.data.data);
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        resolve(0);
      });
  });
};

export const getAllEmployers = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(Config.API_END_POINT + `/employer/list`)
      .then(response => {
        if (response != null && response.data != null) {
          console.log('response ####', response.data.data);
          resolve(response.data.data);
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        resolve(0);
      });
  });
};

export const getEmployerDetailById = employerId => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(
        Config.API_END_POINT +
        `/employer?id=${employerId}`,
      )
      .then(response => {
        if (response != null && response.data != null) {
          console.log(
            'response ####',
            response.data.data.attributes,
          );
          resolve(response.data.data.attributes);
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        resolve(0);
      });
  });
};