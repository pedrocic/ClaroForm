const state = {
    clients: {
        'id1': {
            name: "Pedro Henrique Ferreira de Oliveira",
            cpf: "04164465158",
            birthDate: "13/04/1999"
        }
    },
    search: ''
};

const mutations = {
    updateClient(state, payload) {
        Object.assign(state.clients[payload.id], payload.updates)
    },

    findCPF(state, value) {
        state.search = value
    }
};

const actions = {
    updateClient({commit}, payload) {
        commit('updateClient', payload)
    },

    findCPF({ commit }, cpf) {
        commit('findCPF', cpf)
    }
};

const getters = {
    findClient: (state) => {
        let clientFiltered = {};
        Object.keys(state.clients).forEach((key) => {
            let client = state.clients[key];
            if (client.cpf === state.search) {
                clientFiltered = client;
            }
        });
        if (!clientFiltered.cpf) return false;
        else return clientFiltered
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
