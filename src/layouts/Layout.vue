<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-red">
            <q-toolbar>
                <q-toolbar-title class="absolute-center">
                    Formulário Claro
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
    export default {
        name: 'MainLayout',
    }
</script>

<style lang="scss">
    @media screen and (min-width: 768px) {
        .q-footer {
            display: none;
        }
    }
</style>
