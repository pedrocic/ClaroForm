<template>
    <q-page padding>
        <q-card class="auth-tabs">
            <q-tab-panel name="form" v-model="tab" animated>
                <form @submit.prevent="submitForm">
                    <div class="row q-mb-md">
                        <q-banner class="bg-grey-3 col">
                            <template v-slot:avatar>
                                <q-icon name="account_circle" color="primary"></q-icon>
                            </template>
                            Verifique a viablidade claro!
                        </q-banner>
                    </div>

                    <div class="row q-mb-md">
                        <q-input outlined
                                 v-model="formData.cpf"
                                 :rules="[ val => val.length >= 11 || 'Por favor ' +
                                    'informe um CPF válido' ]"
                                 mask="###.###.###-##"
                                 unmasked-value
                                 lazy-rules
                                 class="col"
                                 label="CPF"
                                 ref="cpf"
                                 value="">
                        </q-input>
                    </div>
                    <div class="row q-mb-md">
                        <q-input outlined
                                 class="col"
                                 label="Nome"
                                 ref="nome"
                                 v-if="completedForm !== 1"
                                 v-model="formData.name">
                        </q-input>
                    </div>
                    <div class="row q-mb-md">
                        <q-input outlined
                                 label="Data de Nascimento"
                                 v-if="formData.birthDate"
                                 v-model="formData.birthDate"
                                 class="col">
                            <template v-slot:append>
                                <q-icon v-if="formData.birthDate"
                                        name="close"
                                        class="cursor-pointer"
                                ></q-icon>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                        <q-date :locale="myLocale" today-btn mask="DD/MM/YYYY" v-model="formData.birthDate">
                                        </q-date>
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                    </div>
                </form>
            </q-tab-panel>
        </q-card>
        <q-footer class="bg-red">
            <q-tabs>
                <q-tab @click="submitForm" name="back" icon="cancel" label="Voltar" v-if="completedForm !== 1 " />
                <q-tab @click="checkForm" name="checar" icon="check" label="Checar" />
                <q-tab @click="submitForm" name="send" icon="send" label="Próximo" v-if="completedForm !== 1 " />
            </q-tabs>
        </q-footer>
    </q-page>
</template>

<script>
    import { mapActions, mapState, mapGetters } from 'vuex'

    export default {
        name: 'PageIndex',
        data() {
            return {
                tab: true,
                completedForm: 1,
                formData: {},
                myLocale: {
                    days: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado'.split('_'),
                    daysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
                    months: 'Jeneiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
                    monthsShort: 'Jan_Fev_Mar_Abr_Maio_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
                    firstDayOfWeek: 1
                }
            }
        },
        computed: {
            ...mapState('claroForm', ['search']),
        },
        methods: {
            ...mapGetters('claroForm', ['findClient']),
            ...mapActions('claroForm', ['findCPF', 'updateClient']),
            submitForm() {

            },
            checkForm() {
                this.completedForm = 2;
                this.$refs.cpf.validate();
                if (!this.$refs.cpf.hasError) {
                    this.findCPF(this.formData.cpf);
                    let filteredClient = this.findClient();
                    if (filteredClient) {
                        this.formData = Object.assign({}, filteredClient);
                        this.updateClient({
                            id: 'id1',
                            updates: this.formData
                        })
                    } else {
                        this.$q.notify({
                            message: '<p>Dados não encontrados!</p> <p>Por favor, insira os seus dados!</p>',
                            color: 'black',
                            position: 'right',
                            html: true
                        })
                    }
                }
            }
        },
    }
</script>

<style>
    .auth-tabs {
        max-width: 500px;
        margin: 0 auto;
    }
</style>
