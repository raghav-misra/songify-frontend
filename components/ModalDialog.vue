<script setup lang="ts">
import { StyleValue } from 'vue';

const props = defineProps<{
    tag?: string;
    style?: StyleValue;
    customClass?: string;
}>();
</script>

<template>
    <component :is="tag || 'div'" class="overlay">
        <div class="modal container" :style="style" :class="customClass">
            <slot />
        </div>
    </component>
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
    margin: 0;
}

.modal {
    padding: 2rem;
    background: var(--dark-accent);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    min-width: 50vw;
    border: 1px var(--gray) solid;
    border-radius: 5px;
}
</style>