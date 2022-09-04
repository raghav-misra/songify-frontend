<script setup lang="ts">
const props = defineProps<{
    to: string;
}>();

const route = useRoute();

const isActive = computed(() => route.path === props.to);
</script>

<template>
    <NuxtLink :to="to" class="nav-item clickable" :class="[isActive && 'is-active']">
        <slot />
    </NuxtLink>
</template>