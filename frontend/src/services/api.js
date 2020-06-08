import agent from './agent';

export const login = async (username, password) => {
  try {
    return await agent.post('/auth', { username, password });
  } catch (err) {
    throw err;
  }
};

export const getClients = async () => {
  try {
    return await agent.get('/clients');
  } catch (err) {
    throw err;
  }
};

export const getClient = async (id) => {
  try {
    return await agent.get(`/clients/${id}`);
  } catch (err) {
    throw err;
  }
};

export const createClient = async (client) => {
  try {
    return await agent.post('/clients', client);
  } catch (err) {
    throw err;
  }
};

export const updateClient = async (id, client) => {
  try {
    return await agent.put(`/clients/${id}`, client);
  } catch (err) {
    throw err;
  }
};
