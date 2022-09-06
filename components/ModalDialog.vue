<script setup lang="ts">
import { StyleValue } from 'vue';

const props = defineProps<{
    tag?: string;
    style?: StyleValue;
    maxHeight?: true;
    customClass?: string;
}>();
</script>

<template>
    <component :is="tag || 'div'" class="overlay">
        <div class="modal container" :style="style" :class="[customClass, maxHeight && 'max-height']">
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 1rem;
    z-index: 6;
}

.max-height {
    flex: 1;
    overflow-y: scroll;
}

.modal {
    padding: 2rem;
    background: var(--dark-accent);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    min-width: 50vw;
    border: 1px var(--gray) solid;
}

@media screen and (max-width: 768px) {
    .overlay {
        padding: 0;
        align-items: stretch;
    }

    .modal {
        flex: 1;
        overflow-y: scroll;
    }
} 
</style>