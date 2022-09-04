<template>
    <div class="overlay">
        <div class="modal container">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--dark-translucent);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    padding: 2rem;
    background: var(--dark);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    min-width: 50vw;
}
</style>