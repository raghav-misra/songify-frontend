<template>
    <section class="page">
        <slot />
    </section>
</template>

<style scoped>
.page {
    flex: 1;
    overflow-y: scroll;
    padding: 2rem;
    display: flex;
    flex-direction: column;
}
</style>